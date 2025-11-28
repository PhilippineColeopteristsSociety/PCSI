import emailService from "./emailService.js";

const contactService = {
  // Send contact email
  sendContactEmail: async (userEmail, subject, body) => {
    try {
      const transporter = emailService.createTransporter();

      const emailTemplate = {
        subject: `Contact Form: ${subject}`,
        html: `
<p><strong>From:</strong> ${userEmail}</p>
<p><strong>Subject:</strong> ${subject}</p>
<hr>
<p><strong>Message:</strong></p>
<p>${body.replace(/\n/g, '<br>')}</p>
<hr>
<p><em>This email was sent from the PCSI website contact form.</em></p>
        `,
        text: `
From: ${userEmail}
Subject: ${subject}

Message:
${body}

---
This email was sent from the PCSI website contact form.
        `
      };

      const mailOptions = {
        from: userEmail,
        to: process.env.EMAIL_USER,//admin email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text
      };

      await transporter.sendMail(mailOptions);
      console.log(`Contact email sent from ${userEmail} to philcolsoc@gmail.com`);
      
      return {
        success: true,
        message: "Email sent successfully"
      };
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw new Error('Failed to send contact email');
    }
  }
};

export default contactService;
