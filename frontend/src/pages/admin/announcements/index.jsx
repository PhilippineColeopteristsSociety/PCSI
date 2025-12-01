import Header from "@/components/common/Header";
import React, { useState, useEffect } from "react";
import DataTable from "./table";
import { announcementColumns } from "./columns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnouncementSchema } from "@/components/forms/announcement/schema";
import announcementService from "@/services/announcementService";
import { toast } from "sonner";
import { formatDate } from "@/util/formatDate";
import AnnouncementForm from "@/components/forms/announcement/AnnouncementForm";

const statusMap = {
  1: "Active",
  0: "Inactive",
};

const Announcements = () => {
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [announcements, setAnnouncements] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "1",
    },
  });

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const result = await announcementService.getAnnouncements();
      if (result.success) {
          const data = result?.data?.data?.map((announcement) => ({
          ...announcement,
          status: statusMap[announcement.status],
          createdAt: formatDate(announcement.createdAt),
        }));

        setAnnouncements(data || []);
      } else {
        toast.error(result.error || "Failed to fetch announcements");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  // Fetch publications on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleUpdateStatus = async ({ announcementId, newStatus }) => {
    const promise = async () => {
      setSubmitting(true);
      try {
        const result = await announcementService.toggleAnnouncementStatus(
          announcementId,
          newStatus
        );
        await fetchAnnouncements();
        // return result;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    };

    toast.promise(promise(), {
      loading: "Updating Status...",
      success: `Announcement status updated`,
      error: (error) => error.message || "Failed to update announcement status",
    });
  };

  const handleEdit = (announcementId) => {
    // Find the announcement data by ID
    const announcement = announcements.find((announcement) => announcement._id === announcementId);
    if (!announcement) return;

    setShowForm(true);
    setFormTitle("Edit Announcement");
    setCurrentData(announcement);
  
    // Populate form with existing data
    form.reset({
      title: announcement.title || "",
      description: announcement.description || "",
      status: announcement.status === "Active" ? "1" : "0",
    });
  };

  const handleAdd = () => {
    setShowForm(true);
    setFormTitle("Add Announcement");
    setCurrentData(null);
    // Reset form to default values
    form.reset({
      title: "",
      description: "",
      date: "",
      status: "1",
    });
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      let result;

      if (currentData) {
        // Update existing announcement
        const updateData = {
          title: data.title,
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
        
        result = await announcementService.updateAnnouncement(currentData._id, updateData);
      } else {
        // Create new announcement
        result = await announcementService.createAnnouncement({
          title: data.title,
          description: data.description,
          status: data.status,
          image: data.image,
        });
      }

      if (result.success) {
        toast.success(
          currentData
            ? "Announcement updated successfully!"
            : "Announcement created successfully!"
        );

        // Close form and reset
        setShowForm(false);
        form.reset();

        // Refresh the data
        fetchAnnouncements();
      } else {
        toast.error(result.error || "Failed to save announcement");
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
      <Header>Announcements</Header>
      <div>
        <DataTable
          data={announcements}
          onAdd={() => handleAdd()}
          onEdit={(data) => handleEdit(data)}
          onUpdateStatus={handleUpdateStatus}
          submitting={submitting}
          loading={loading}
          filters={["title", "description", "createdAt", "status"]}
          tableColumn={announcementColumns}
        />
      </div>
      <AnnouncementForm
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

export default Announcements;
