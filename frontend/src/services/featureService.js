import api from "@/lib/api";

const featureService = {
  getFeatures: async (limit = null, filters = {}) => {
    try {
      const params = { ...filters };
      if (limit) params.limit = limit;

      const response = await api.get("/features", { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch feature",
      };
    }
  },

  // Get announcement by ID
  getFeature: async (id) => {
    try {
      const response = await api.get(`/features/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch feature",
      };
    }
  },

  // Create new feature
  createFeature: async (featureData) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("name", featureData.name);
      formData.append("description", featureData.description);
      if (featureData.status) {
        formData.append("status", featureData.status);
      }

      // Append image file if exists
      if (featureData.image) {
        formData.append("image", featureData.image);
      }

      const response = await api.post("/features", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create feature",
      };
    }
  },

  // Update announcement
  updateFeature: async (id, featureData) => {
    try {
      const formData = new FormData();

      formData.append("name", featureData.name);
      formData.append("description", featureData.description);
      if (featureData.status) {
        formData.append("status", featureData.status);
      }

      // Only append image if a new one was selected
      if (featureData.image) {
        formData.append("image", featureData.image);
      }

      const response = await api.put(`/features/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update feature",
      };
    }
  },

  // Toggle anouncement status (active/inactive)
  toggleFeatureStatus: async (id, status) => {
    try {
      const response = await api.patch(`/features/${id}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Failed to update announcement status",
      };
    }
  },
};

export default featureService;
