import api from "@/lib/api";

const contactService = {
  sendContactEmail: async (data) => {
   
    const response = await api.post("/contact", data);
    return response.data;
  }
};

export default contactService;
