import * as z from "zod";

export const AnnouncementSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    }),
    status: z.enum(["0","1"]).optional()
});