import contactService from "../services/contactService.js";

const contactController = {
  // Send contact email
  sendContactEmail: async (req, res, next) => {
    try {
      const { email, subject, body } = req.body;

      // Validate required fields
      if (!email || !subject || !body) {
        return res.status(400).json({
          success: false,
          message: "Email, subject, and body are required"
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format"
        });
      }

      // Send contact email
      const result = await contactService.sendContactEmail(email, subject, body);

      res.status(200).json({
        success: true,
        message: "Contact email sent successfully"
      });
    } catch (error) {
      next(error);
    }
  }
};

export default contactController;
