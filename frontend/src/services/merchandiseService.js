import api from "@/lib/api";

const merchandiseService = {
  getAllMerchandise: async (limit = null, filters = {}) => {
    try {
      const params = { ...filters };
      if (limit) params.limit = limit;

      const response = await api.get("/merchandise", { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch merchandise",
      };
    }
  },

  getMerchandise: async (id) => {
    try {
      const response = await api.get(`/merchandise/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch merchandise",
      };
    }
  },

  createMerchandise: async (merchandiseData) => {
    try {
      const formData = new FormData();

      formData.append("name", merchandiseData.name);
      formData.append("description", merchandiseData.description);
      if (merchandiseData.status) {
        formData.append("status", merchandiseData.status);
      }

      if (merchandiseData.image) {
        formData.append("image", merchandiseData.image);
      }

      const response = await api.post("/merchandise", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create merchandise",
      };
    }
  },

  updateMerchandise: async (id, merchandiseData) => {
    try {
      const formData = new FormData();

      formData.append("name", merchandiseData.name);
      formData.append("description", merchandiseData.description);
      if (merchandiseData.status) {
        formData.append("status", merchandiseData.status);
      }

      if(merchandiseData.removeBanner) {
        formData.append("removeBanner", "true");
      }

      if (merchandiseData.image) {
        formData.append("image", merchandiseData.image);
      }

      const response = await api.put(`/merchandise/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update merchandise",
      };
    }
  },

  toggleMerchandiseStatus: async (id, status) => {
    try {
      const response = await api.patch(`/merchandise/${id}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Failed to update merchandise status",
      };
    }
  },
};

export default merchandiseService;
