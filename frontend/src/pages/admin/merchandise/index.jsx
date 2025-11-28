import Header from "@/components/common/Header";
import React, { useState } from "react";
import { useEffect } from "react";
import DataTable from "./table";
import { merchandiseColumns } from "./columns";
import { MerchandiseSchema } from "@/components/forms/merchandise/schema";
import merchandiseService from "@/services/merchandiseService";
import { toast } from "sonner";
import { formatDate } from "@/util/formatDate";
import MerchandiseForm from "@/components/forms/merchandise/MerchandiseForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const statusMap = {
  1: "Active",
  0: "Inactive",
};

const Merchandise = () => {
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [merchandise, setMerchandise] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(MerchandiseSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "1",
    },
  });

  const fetchMerchandise = async () => {
    setLoading(true);
    try {
      const result = await merchandiseService.getAllMerchandise();
      if (result.success) {
        const data = result?.data?.data?.map((merch) => ({
          ...merch,
          status: statusMap[merch.status],
          createdAt: formatDate(merch.createdAt),
        }));

        setMerchandise(data || []);
      } else {
        toast.error(result.error || "Failed to fetch merchandise");
      }
    } catch (error) {
      console.error("Error fetching merchandise:", error);
      toast.error("Failed to fetch merchandise");
    } finally {
      setLoading(false);
    }
  };

  // Fetch merchandise on component mount
  useEffect(() => {
    fetchMerchandise();
  }, []);

  const handleUpdateStatus = async ({ merchandiseId, newStatus }) => {
    const promise = async () => {
      setSubmitting(true);
      try {
        const result = await merchandiseService.toggleMerchandiseStatus(
          merchandiseId,
          newStatus
        );
        await fetchMerchandise();
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
      success: `Merchandise status updated`,
      error: (error) => error.message || "Failed to update merchandise status",
    });
  };

  const handleEdit = (merchandiseId) => {
    // Find the merchandise data by ID
    const merch = merchandise.find((merch) => merch._id === merchandiseId);
    if (!merch) return;

    setShowForm(true);
    setFormTitle("Edit Merchandise");
    setCurrentData(merch);

    // Populate form with existing data
    form.reset({
      name: merch.name || "",
      description: merch.description || "",
      status: merch.status === "Active" ? "1" : "0",
    });
  };

  const handleAdd = () => {
    setShowForm(true);
    setFormTitle("Add Merchandise");
    setCurrentData(null);
    // Reset form to default values
    form.reset({
      name: "",
      description: "",
      banner: "",
      status: "1",
    });
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      let result;

      if (currentData) {
        // Update existing merchandise
        const updateData = {
          name: data.name,
          description: data.description,
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

        result = await merchandiseService.updateMerchandise(
          currentData._id,
          updateData
        );
      } else {
        // Create new merchandise
        result = await merchandiseService.createMerchandise({
          name: data.name,
          description: data.description,
          status: data.status,
          image: data.image,
        });
      }

      if (result.success) {
        toast.success(
          currentData
            ? "Merchandise updated successfully!"
            : "Merchandise created successfully!"
        );

        // Close form and reset
        setShowForm(false);
        form.reset();

        // Refresh the data
        fetchMerchandise();
      } else {
        toast.error(result.error || "Failed to save merchandise");
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
      <Header>Merchandise</Header>
      <div>
        <DataTable
          data={merchandise}
          onAdd={() => handleAdd()}
          onEdit={(data) => handleEdit(data)}
          onUpdateStatus={handleUpdateStatus}
          submitting={submitting}
          loading={loading}
          filters={["name", "description", "createdAt", "status"]}
          tableColumn={merchandiseColumns}
        />
      </div>
      <MerchandiseForm
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

export default Merchandise;
