import * as z from "zod";

export const MerchandiseSchema = z.object({
    name:z.string().min(1, {
        message:"Name is required"
    }),
    description:z.string().min(1, {message:"Description is required"}),
    status:z.enum(["0","1"]).optional()
})
