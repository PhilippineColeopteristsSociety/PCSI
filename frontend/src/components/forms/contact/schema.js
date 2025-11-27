import * as z from "zod";

export const contactSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required"
    }).email("Please enter a valid email address"),
    subject: z.string().min(1, {
        message: "Subject is required"
    }),
    body: z.string().min(1, {
        message: "Message is required"
    }),
});