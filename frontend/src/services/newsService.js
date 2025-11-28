import api from '@/lib/api';

const newsService = {
  // Get all news
  getAllNews: async (limit = null, filters = {}) => {
    try {
      const params = { ...filters };
      if (limit) params.limit = limit;
      
      const response = await api.get('/news', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch news' 
      };
    }
  },

  // Get news by ID
  getNews: async (id) => {
    try {
      const response = await api.get(`/news/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch news' 
      };
    }
  },

  // Create new news
  createNews: async (newsData) => {
    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append('title', newsData.title);
      formData.append('description', newsData.description);
      if (newsData.status) {
        formData.append('status', newsData.status);
      }
      
      // Append image file if exists
      if (newsData.image) {
        formData.append('image', newsData.image);
      }
      
      const response = await api.post('/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create news' 
      };
    }
  },

  // Update news
  updateNews: async (id, newsData) => {
    try {
      const formData = new FormData();
      
      formData.append('title', newsData.title);
      formData.append('description', newsData.description);
      if (newsData.status) {
        formData.append('status', newsData.status);
      }
      if (newsData.removeBanner) {
        formData.append('removeBanner', newsData.removeBanner);
      }

      // Only append image if a new one was selected
      if (newsData.image) {
        formData.append('image', newsData.image);
      }
      
      const response = await api.put(`/news/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update news' 
      };
    }
  },

  // Toggle news status (active/inactive)
  toggleNewsStatus: async (id, status) => {
    try {
      const response = await api.patch(`/news/${id}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update news status' 
      };
    }
  }
};

export default newsService;
