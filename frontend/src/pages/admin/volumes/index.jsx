import Header from "@/components/common/Header";
import React, { useState, useEffect } from "react";
import DataTable from "./table";
import { volumeColumns } from "./columns";
import VolumeForm from "@/components/forms/volume/VolumeForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VolumeSchema } from "@/components/forms/volume/schema";
import volumeService from "@/services/volumeService";
import { toast } from "sonner";
import { formatDate } from "@/util/formatDate";

const statusMap = {
  1: "Active",
  0: "Inactive",
};

const Volumes = () => {
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState({});

  const form = useForm({
    resolver: zodResolver(VolumeSchema),
    defaultValues: {
      volumeNo: "",
      seriesNo: "",
      month: "",
      year: "",
      doiLink: "",
      status: "1",
    },
  });

  const fetchVolumes = async () => {
    setLoading(true);
    try {
      const result = await volumeService.getVolumes();
      if (result.success) {
        const data = result?.data?.data?.map((volume) => ({
          ...volume,
          status: statusMap[volume.status],
          createdAt: formatDate(volume.createdAt),
          publishedDate: volume.publishedDate
            ? formatDate(volume.publishedDate)
            : null,
        }));

        setVolumes(data || []);
      } else {
        toast.error(result.error || "Failed to fetch volumes");
      }
    } catch (error) {
      console.error("Error fetching volumes:", error);
      toast.error("Failed to fetch volumes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch volumes on component mount
  useEffect(() => {
    fetchVolumes();
  }, []);

  const handleUpdateStatus = async ({ volumeId, newStatus }) => {
    const promise = async () => {
      setSubmitting(true);
      try {
        const result = await volumeService.toggleVolumeStatus(
          volumeId,
          newStatus
        );
        await fetchVolumes();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    };

    toast.promise(promise(), {
      loading: "Updating Status...",
      success: "Volume status updated successfully",
      error: (error) => error.message || "Failed to update volume status",
    });
  };

  const handleEdit = (volume) => {
    setShowForm(true);
    setFormTitle("Edit Volume");
    setCurrentData(volume);
    // Populate form with existing data
    form.reset({
      volumeNo: volume.volumeNo || "",
      seriesNo: volume.seriesNo || "",
      month: volume.month || "",
      year: volume.year?.toString() || "",
      doiLink: volume.doiLink || "",
      status: volume.status === "Active" ? "1" : "0",
    });
  };

  const handleAdd = () => {
    setShowForm(true);
    setFormTitle("Add Volume");
    setCurrentData(null);
    // Reset form to default values
    form.reset({
      volumeNo: "",
      seriesNo: "",
      month: "",
      year: "",
      doiLink: "",
      status: "1",
    });
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      let result;

      if (currentData) {
        // Update existing volume
        result = await volumeService.updateVolume(currentData._id, {
          volumeNo: data.volumeNo,
          seriesNo: data.seriesNo,
          month: data.month,
          year: parseInt(data.year),
          doiLink: data.doiLink || null,
          status: data.status,
        });
      } else {
        // Create new volume
        result = await volumeService.createVolume({
          volumeNo: data.volumeNo,
          seriesNo: data.seriesNo,
          month: data.month,
          year: parseInt(data.year),
          doiLink: data.doiLink || null,
          status: data.status,
        });
      }

      if (result.success) {
        toast.success(
          currentData
            ? "Volume updated successfully!"
            : "Volume created successfully!"
        );

        // Close form and reset
        setShowForm(false);
        form.reset();

        // Refresh the data
        fetchVolumes();
      } else {
        toast.error(result.error || "Failed to save volume");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <Header>Volumes</Header>
      <div>
        <DataTable
          data={volumes}
          onAdd={() => handleAdd()}
          onEdit={(volume) => handleEdit(volume)}
          onUpdateStatus={handleUpdateStatus}
          submitting={submitting}
          loading={loading}
          filters={[
            "volumeNo",
            "seriesNo",
            "month",
            "year",
            "createdAt",
            "status",
          ]}
          tableColumn={volumeColumns}
        />
      </div>
      <VolumeForm
        open={showForm}
        onOpenChange={setShowForm}
        data={currentData}
        submitting={submitting}
        title={formTitle}
        form={form}
        onUpdateStatus={handleUpdateStatus}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Volumes;
