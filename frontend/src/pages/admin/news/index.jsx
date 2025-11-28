import Header from "@/components/common/Header";
import React, { useState, useEffect } from "react";
import DataTable from "./table";
import { newsColumns } from "./columns";
import NewsForm from "@/components/forms/news/NewsForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSchema } from "@/components/forms/news/schema";
import newsService from "@/services/newsService";
import { toast } from "sonner";
import { formatDate } from "@/util/formatDate";

const statusMap = {
  1: "Active",
  0: "Inactive",
};

const News = () => {
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [news, setNews] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "1",
    },
  });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const result = await newsService.getAllNews();
      if (result.success) {
        const data = result?.data?.data?.map((news) => ({
          ...news,
          status: statusMap[news.status],
          createdAt: formatDate(news.createdAt)
        }));

        setNews(data || []);
      } else {
        toast.error(result.error || "Failed to fetch news");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  const handleUpdateStatus = async ({ newsId, newStatus }) => {
    const promise = async () => {
      setSubmitting(true);
      try {
        const result = await newsService.toggleNewsStatus(
          newsId,
          newStatus
        );
        await fetchNews();
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
      success: `News status updated`,
      error: (error) => error.message || "Failed to update news status",
    });
  };

  const handleEdit = (newsId) => {
    // Find the news data by ID
    const newsItem = news.find((item) => item._id === newsId);
    if (!newsItem) return;

    setShowForm(true);
    setFormTitle("Edit News");
    setCurrentData(newsItem);
  
    // Populate form with existing data
    form.reset({
      title: newsItem.title || "",
      description: newsItem.description || "",
      status: newsItem.status === "Active" ? "1" : "0",
    });
  };

  const handleAdd = () => {
    setShowForm(true);
    setFormTitle("Add News");
    setCurrentData(null);
    // Reset form to default values
    form.reset({
      title: "",
      description: "",
      status: "1",
    });
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      let result;

      if (currentData) {
        // Update existing news
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

        result = await newsService.updateNews(currentData._id, updateData);
  
      } else {
        // Create new news
        result = await newsService.createNews({
          title: data.title,
          description: data.description,
          status: data.status,
          image: data.image,
        });
      }

      if (result.success) {
        toast.success(
          currentData
            ? "News updated successfully!"
            : "News created successfully!"
        );

        // Close form and reset
        setShowForm(false);
        form.reset();

        // Refresh the data
        fetchNews();
      } else {
        toast.error(result.error || "Failed to save news");
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
      <Header>News & Features</Header>
      <div>
        <DataTable
          data={news}
          onAdd={() => handleAdd()}
          onEdit={(data) => handleEdit(data)}
          onUpdateStatus={handleUpdateStatus}
          submitting={submitting}
          loading={loading}
          filters={["title", "description", "createdAt", "status"]}
          tableColumn={newsColumns}
        />
      </div>
      <NewsForm
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

export default News;
