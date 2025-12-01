import Header from "@/components/common/Header";
import React, { useState } from "react";
import { useEffect } from "react";
import DataTable from "./table";
import { featureColumns } from "./columns";
import { FeatureSchema } from "@/components/forms/feature/schema";
import featureService from "@/services/featureService";
import { toast } from "sonner";
import { formatDate } from "@/util/formatDate";
import FeatureForm from "@/components/forms/feature/FeatureForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const statusMap = {
  1: "Active",
  0: "Inactive",
};

const Feature = () => {
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FeatureSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "1",
    },
  });

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const result = await featureService.getFeatures();
      if (result.success) {
        const data = result?.data?.data?.map((feature) => ({
          ...feature,
          status: statusMap[feature.status],
          createdAt: formatDate(feature.createdAt),
        }));

        setFeatures(data || []);
      } else {
          toast.error(result.error || "Failed to fetch features");
      }
    } catch (error) {
      console.error("Error fetching features:", error);
      toast.error("Failed to fetch features");
    } finally {
      setLoading(false);
    }
  };

  // Fetch publications on component mount
  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleUpdateStatus = async ({ featureId, newStatus }) => {
    const promise = async () => {
      setSubmitting(true);
      try {
        const result = await featureService.toggleFeatureStatus(
          featureId,
          newStatus
        );
        await fetchFeatures();
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
      success: `Feature status updated`,
      error: (error) => error.message || "Failed to update feature status",
    });
  };

  const handleEdit = (featureId) => {
    // Find the feature data by ID
    const feature = features.find((feature) => feature._id === featureId);
    if (!feature) return;

    setShowForm(true);
    setFormTitle("Edit Feature");
    setCurrentData(feature);
  
    // Populate form with existing data
    form.reset({
      name: feature.name || "",
      description: feature.description || "",
      status: feature.status === "Active" ? "1" : "0",
    });
  };

  const handleAdd = () => {
    setShowForm(true);
    setFormTitle("Add Feature");
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
        // Update existing feature
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
        
        result = await featureService.updateFeature(currentData._id, updateData);
      } else {
        // Create new feature
          result = await featureService.createFeature({
          name: data.name,
          description: data.description,
          status: data.status,
          image: data.image,
        });
      }

      if (result.success) {
        toast.success(
          currentData
            ? "Feature updated successfully!"
            : "Feature created successfully!"
        );

        // Close form and reset
        setShowForm(false);
        form.reset();

        // Refresh the data
        fetchFeatures();
      } else {
        toast.error(result.error || "Failed to save feature");
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
      <Header>Feature</Header>
      <div>
      <DataTable
          data={features}
          onAdd={() => handleAdd()}
          onEdit={(data) => handleEdit(data)}
          onUpdateStatus={handleUpdateStatus}
          submitting={submitting}
          loading={loading}
          filters={["name", "description", "createdAt", "status"]}
          tableColumn={featureColumns}
        />
      </div>
      <FeatureForm
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

export default Feature;
