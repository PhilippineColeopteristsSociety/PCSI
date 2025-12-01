import Header from "@/components/common/Header";
import React, { useState, useEffect } from "react";
import DataTable from "./table";
import { articleColumns } from "./columns";
import ArticleForm from "@/components/forms/articles/ArticleForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleSchema } from "@/components/forms/articles/schema";
import articleService from "@/services/articleService";
import { toast } from "sonner";
import { formatDate } from "@/util/formatDate";

const statusMap = {
  1: "Active",
  0: "Inactive",
};

const Articles = () => {
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState({});

  const form = useForm({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      volumeNo: "",
      seriesNo: "",
      month: "",
      year: "",
      title: "",
      abstract: "",
      doi: "",
      pageRange: "",
      status: "1",
      authors: [
        {
          firstname: "",
          middlename: "",
          lastname: "",
          department: "",
          school: "",
          city: "",
          country: "",
        },
      ],
    },
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const result = await articleService.getArticles();
      if (result.success) {
        const data = result?.data?.map((article) => ({
          ...article,
          status: statusMap[Number(article.status)],
          createdAt: formatDate(article.createdAt),
        }));

        setArticles(data || []);
      } else {
        toast.error(result.error || "Failed to fetch articles");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const handleUpdateStatus = async ({ volumeId, newStatus }) => {
    const promise = async () => {
      setSubmitting(true);
      // console.log(publicationId);
      try {
        const result = await articleService.toggleArticleStatus(
          volumeId,
          newStatus
        );
        await fetchArticles();
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
      success: `Article status updated`,
      error: (error) => error.message || "Failed to update article status",
    });
  };

  const handleEdit = (volumeId) => {
    // Find the article data by ID
    const article = articles.find((article) => article._id === volumeId);
    if (!article) return;

    setShowForm(true);
    setFormTitle("Edit Article");
    setCurrentData(article);

    // Populate form with existing data
    form.reset({
      volumeNo: article.volumeNo || "",
      seriesNo: article.seriesNo || "",
      month: article.month || "",
      year: article.year ? article.year.toString() : "",
      title: article.title || "",
      abstract: article.abstract || "",
      keywords: article.keywords ? article.keywords.join(", ") : "",
      doi: article.doi || "",
      pageRange: article.pageRange || "",
      authors: article.authors || [
        {
          firstname: "",
          middlename: "",
          lastname: "",
          department: "",
          school: "",
          city: "",
          country: "",
        },
      ],
      status: article.status === "Active" ? "1" : "0",
    });
  };

  const handleAdd = () => {
    setShowForm(true);
    setFormTitle("Add Article");
    setCurrentData(null);
    // Reset form to default values
    form.reset({
      volumeNo: "",
      seriesNo: "",
      month: "",
      year: "",
      title: "",
      abstract: "",
      doi: "",
      pageRange: "",
      status: "1",
      authors: [
        {
          firstname: "",
          middlename: "",
          lastname: "",
          department: "",
          school: "",
          city: "",
          country: "",
        },
      ],
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
          title: data.title,
          abstract: data.abstract,
          keywords: data.keywords
            ? data.keywords.split(",").map((k) => k.trim())
            : [],
          doi: data.doi,
          pageRange: data.pageRange,
          authors: data.authors,
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

        // Handle PDF file based on user action
        if (data.pdfFile) {
          // User uploaded a new PDF file - replace old one
          updateData.pdfFile = data.pdfFile;
        } else if (data.removePdfFile) {
          // User clicked X to remove PDF file - set to null
          updateData.removePdfFile = true;
        }
        // If neither, keep existing PDF file (don't send pdfFile field)

        result = await articleService.updateArticle(
          currentData._id,
          updateData
        );
      } else {
        // Create new article
        result = await articleService.createArticle({
          volumeNo: data.volumeNo,
          seriesNo: data.seriesNo,
          month: data.month,
          year: data.year,
          title: data.title,
          abstract: data.abstract,
          keywords: data.keywords
            ? data.keywords.split(",").map((k) => k.trim())
            : [],
          doi: data.doi,
          pageRange: data.pageRange,
          authors: data.authors,
          status: data.status,
          image: data.image,
          pdfFile: data.pdfFile,
        });
      }

      if (result.success) {
        toast.success(
          currentData
            ? "Article updated successfully!"
            : "Article created successfully!"
        );

        // Close form and reset
        setShowForm(false);
        form.reset();

        // Refresh the data
        fetchArticles();
      } else {
        toast.error(result.error || "Failed to save article");
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
      <Header>Articles</Header>
      <div>
        <DataTable
          data={articles}
          onAdd={() => handleAdd()}
          onEdit={(data) => handleEdit(data)}
          onUpdateStatus={handleUpdateStatus}
          submitting={submitting}
          loading={loading}
          filters={["volumeNo", "seriesNo", "createdAt", "status"]}
          tableColumn={articleColumns}
        />
      </div>
      <ArticleForm
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

export default Articles;
