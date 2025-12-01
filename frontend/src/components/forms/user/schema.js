import { z } from "zod";

export const userSchema = z.object({
    firstName: z.string().min(1, {
        message: "First name is required"
    }),
    lastName: z.string().min(1, {
        message: "Last name is required"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    // Password fields are optional by default
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
}).refine((data) => {
    // If any password field is provided, all must be provided
    const hasPasswordFields = data.oldPassword || data.newPassword || data.confirmPassword;
    if (hasPasswordFields) {
        return data.oldPassword && data.newPassword && data.confirmPassword;
    }
    return true;
}, {
    message: "All password fields are required when changing password",
    path: ["oldPassword"]
}).refine((data) => {
    // If new password is provided, it must be at least 6 characters
    if (data.newPassword) {
        return data.newPassword.length >= 6;
    }
    return true;
}, {
    message: "New password must be at least 6 characters long",
    path: ["newPassword"]
}).refine((data) => {
    // New password and confirm password must match
    if (data.newPassword && data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
    }
    return true;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

// Separate schema for password change only
export const passwordChangeSchema = z.object({
    oldPassword: z.string().min(1, {
        message: "Old password is required"
    }),
    newPassword: z.string().min(6, {
        message: "New password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(1, {
        message: "Confirm password is required"
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
});