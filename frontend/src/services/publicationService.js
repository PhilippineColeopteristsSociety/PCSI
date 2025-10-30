import api from '@/lib/api';

const publicationService = {
  // Get all publications
  getPublications: async (limit = null, filters = {}) => {
    try {
      const params = { ...filters };
      if (limit) params.limit = limit;
      
      const response = await api.get('/publications', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch publications' 
      };
    }
  },

  // Get publication by ID
  getPublication: async (id) => {
    try {
      const response = await api.get(`/publications/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch publication' 
      };
    }
  },

  // Create new publication
  createPublication: async (publicationData) => {
    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append('title', publicationData.title);
      formData.append('description', publicationData.description);
      if (publicationData.status) {
        formData.append('status', publicationData.status);
      }
      
      // Append image file if exists
      if (publicationData.image) {
        formData.append('image', publicationData.image);
      }
      
      const response = await api.post('/publications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create publication' 
      };
    }
  },

  // Update publication
  updatePublication: async (id, publicationData) => {
    try {
      const formData = new FormData();
      
      formData.append('title', publicationData.title);
      formData.append('description', publicationData.description);
      if (publicationData.status) {
        formData.append('status', publicationData.status);
      }
      
      // Only append image if a new one was selected
      if (publicationData.image) {
        formData.append('image', publicationData.image);
      }
      
      const response = await api.put(`/publications/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update publication' 
      };
    }
  },

  // Toggle publication status (active/inactive)
  togglePublicationStatus: async (id, status) => {
    try {
      const response = await api.patch(`/publications/${id}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update publication status' 
      };
    }
  }
};

export default publicationService;
