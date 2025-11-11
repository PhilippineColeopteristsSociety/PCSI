import nodemailer from 'nodemailer';
import { getVerificationEmailTemplate, getPasswordResetEmailTemplate } from '../utils/email.js';
import dotenv from "dotenv";
dotenv.config();
const emailService = {
  // Create email transporter
  createTransporter: () => {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  },

  // Send verification email
  sendVerificationEmail: async (email, firstName, verificationToken) => {
    try {
      const transporter = emailService.createTransporter();
      
      const { subject, html, text } = getVerificationEmailTemplate(
        firstName,
        `${process.env.CLIENT_URL}/verify-email/${verificationToken}`
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html,
        text
      };

      await transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}`);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  },

  // Send password reset email
  sendPasswordResetEmail: async (email, firstName, resetToken) => {
    try {
      const transporter = emailService.createTransporter();
      
      const { subject, html, text } = getPasswordResetEmailTemplate(
        firstName,
        resetToken
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html,
        text
      };

      await transporter.sendMail(mailOptions);
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  },

  // Test email configuration
  testEmailConfiguration: async () => {
    try {
      const transporter = emailService.createTransporter();
      await transporter.verify();
      console.log('Email configuration is valid');
      return true;
    } catch (error) {
      console.error('Email configuration error:', error);
      return false;
    }
  }
};

export default emailService;