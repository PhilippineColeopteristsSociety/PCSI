import Header from "@/components/common/Header";
import React, { useState, useEffect } from "react";
import DataTable from "./table";
import { volumeColumns } from "./columns";
import VolumeForm from "@/components/forms/volumes/VolumeForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VolumeSchema } from "@/components/forms/volumes/schema";
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
  const [currentData, setCurrentData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [volumes, setVolumes] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState({});

  const form = useForm({
    resolver: zodResolver(VolumeSchema),
    defaultValues: {
      volumeNo: "",
      seriesNo: "",
      month: "",
      year: "",
      doi: "",
      status: "1",
    },
  });

  const fetchVolumes = async () => {
    setLoading(true);
    try {
      const result = await volumeService.getVolumes();
      if (result.success) {
        const data = result?.data?.map((volume) => ({
          ...volume,
          status: statusMap[Number(volume.status)],
          createdAt: formatDate(volume.createdAt),
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

  // Fetch publications on component mount
  useEffect(() => {
    fetchVolumes();
  }, []);

  const handleUpdateStatus = async ({ volumeId, newStatus }) => {
    const promise = async () => {
      setSubmitting(true);
      // console.log(publicationId);
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
      success: `Volume status updated`,
      error: (error) => error.message || "Failed to update volume status",
    });
  };

  const handleEdit = (volumeId) => {
    // Find the publication data by ID
    const volume = volumes.find((volume) => volume._id === volumeId);
    if (!volume) return;

    setShowForm(true);
    setFormTitle("Edit Volume");
    setCurrentData(volume);

    // Populate form with existing data
    form.reset({
      volumeNo: volume.volumeNo || "",
      seriesNo: volume.seriesNo || "",
      month: volume.month || "",
      year: volume.year || "",
      doi: volume.doi || "",
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
      date: "",
      month: "",
      year: "",
      doi: "",
      status: "1",
    });
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      let result;

      if (currentData) {
        // Update existing publication
        const updateData = {
          volumeNo: data.volumeNo,
          seriesNo: data.seriesNo,
          month: data.month,
          year: data.year,
          doi: data.doi,
          status: data.status,
        };

        // Handle banner based on user action
        if (data.image) {
          // User uploaded a new banner - replace old one
          updateData.image = data.image;
        } else if (data.removeBanner) {
          // User clicked X to remove banner - set to null
          updateData.removeBanner = true;
        }
        // If neither, keep existing banner (don't send banner field)

        result = await volumeService.updateVolume(currentData._id, updateData);
      } else {
        // Create new publication
        result = await volumeService.createVolume({
          volumeNo: data.volumeNo,
          seriesNo: data.seriesNo,
          month: data.month,
          year: data.year,
          doi: data.doi,
          status: data.status,
          image: data.image,
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
          onEdit={(data) => handleEdit(data)}
          onUpdateStatus={handleUpdateStatus}
          submitting={submitting}
          loading={loading}
          filters={["volumeNo", "seriesNo", "createdAt", "status"]}
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
