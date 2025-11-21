import api from "@/lib/api";

const volumeService = {
  // Get all volumes
  getVolumes: async (limit = null, filters = {}) => {
    try {
      const params = { ...filters };
      if (limit) params.limit = limit;

      const response = await api.get("/volumes", { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch volumes",
      };
    }
  },

  // Get volume by ID
  getVolume: async (id) => {
    try {
      const response = await api.get(`/volumes/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch volume",
      };
    }
  },

  // Create new volume
  createVolume: async (volumeData) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("volumeNo", volumeData.volumeNo);
      formData.append("seriesNo", volumeData.seriesNo);
      formData.append("month", volumeData.month);
      formData.append("year", volumeData.year);
      formData.append("doi", volumeData.doi);
      if (volumeData.status) {
        formData.append("status", volumeData.status);
      }

      // Append image file if exists
      if (volumeData.image) {
        formData.append("image", volumeData.image);
      }

      const response = await api.post("/volumes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create volume",
      };
    }
  },

  // Update volume
  updateVolume: async (id, volumeData) => {
    try {
      const formData = new FormData();

      formData.append("volumeNo", volumeData.volumeNo);
      formData.append("seriesNo", volumeData.seriesNo);
      formData.append("month", volumeData.month);
      formData.append("year", volumeData.year);
      formData.append("doi", volumeData.doi);
      if (volumeData.status) {
        formData.append("status", volumeData.status);
      }
      if (volumeData.removeBanner) {
        formData.append("removeBanner", volumeData.removeBanner);
      }

      // Only append image if a new one was selected
      if (volumeData.image) {
        formData.append("image", volumeData.image);
      }

      const response = await api.put(`/volumes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update volume",
      };
    }
  },

  // Toggle volume status (active/inactive)
  toggleVolumeStatus: async (id, status) => {
    try {
      const response = await api.patch(`/volumes/${id}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Failed to update volume status",
      };
    }
  },
};

export default volumeService;
