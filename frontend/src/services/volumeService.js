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

  // Get a single volume by ID
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

  // Create a new volume
  createVolume: async (volumeData) => {
    try {
      const response = await api.post("/volumes", volumeData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create volume",
      };
    }
  },

  // Update an existing volume
  updateVolume: async (id, volumeData) => {
    try {
      const response = await api.put(`/volumes/${id}`, volumeData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update volume",
      };
    }
  },

  // Toggle volume status
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

  // Delete a volume
  deleteVolume: async (id) => {
    try {
      const response = await api.delete(`/volumes/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to delete volume",
      };
    }
  },
};

export default volumeService;
