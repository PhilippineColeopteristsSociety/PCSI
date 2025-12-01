import api from "@/lib/api";

const articleService = {
  // Get all articles
  getArticles: async (limit = null, filters = {}) => {
    try {
      const params = { ...filters };
      if (limit) params.limit = limit;

      const response = await api.get("/articles", { params });
      // Fix: return only the data property containing the volumes array, not the whole response
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch articles",
      };
    }
  },

  // Get volume by ID
  getArticle: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch article",
      };
    }
  },

  // Create new article
  createArticle: async (articleData) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("volumeNo", articleData.volumeNo);
      formData.append("seriesNo", articleData.seriesNo);
      formData.append("month", articleData.month);
      formData.append("year", articleData.year);
      formData.append("title", articleData.title);
      formData.append("doi", articleData.doi);
      formData.append("pageRange", articleData.pageRange || "");
      formData.append("abstract", articleData.abstract);
      formData.append("keywords", JSON.stringify(articleData.keywords));
      formData.append("authors", JSON.stringify(articleData.authors));
      if (articleData.status) {
        formData.append("status", articleData.status);
      }

      // Append image file if exists
      if (articleData.image) {
        formData.append("image", articleData.image);
      }

      // Append PDF file if exists
      if (articleData.pdfFile) {
        formData.append("pdfFile", articleData.pdfFile);
      }

      const response = await api.post("/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create article",
      };
    }
  },

  // Update article
  updateArticle: async (id, articleData) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("volumeNo", articleData.volumeNo);
      formData.append("seriesNo", articleData.seriesNo);
      formData.append("month", articleData.month);
      formData.append("year", articleData.year);
      formData.append("title", articleData.title);
      formData.append("doi", articleData.doi);
      formData.append("pageRange", articleData.pageRange || "");
      formData.append("abstract", articleData.abstract);
      formData.append("keywords", JSON.stringify(articleData.keywords));
      formData.append("authors", JSON.stringify(articleData.authors));
      if (articleData.status) {
        formData.append("status", articleData.status);
      }
      if (articleData.removeBanner) {
        formData.append("removeBanner", articleData.removeBanner);
      }
      if (articleData.removePdfFile) {
        formData.append("removePdfFile", articleData.removePdfFile);
      }

      // Only append image if a new one was selected
      if (articleData.image) {
        formData.append("image", articleData.image);
      }

      // Only append pdfFile if a new one was selected
      if (articleData.pdfFile) {
        formData.append("pdfFile", articleData.pdfFile);
      }

      const response = await api.put(`/articles/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update article",
      };
    }
  },

  // Toggle article status (active/inactive)
  toggleArticleStatus: async (id, status) => {
    try {
      const response = await api.patch(`/articles/${id}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Failed to update article status",
      };
    }
  },
};

export default articleService;
