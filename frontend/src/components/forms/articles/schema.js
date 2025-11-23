import * as z from "zod";

export const ArticleSchema = z.object({
  volumeNo: z
    .number({
      required_error: "Volume No. is required",
      invalid_type_error: "Volume No. must be a number",
    })
    .min(1, { message: "Volume No. must be at least 1" }),
  seriesNo: z
    .number({
      required_error: "Series No. is required",
      invalid_type_error: "Series No. must be a number",
    })
    .min(1, { message: "Series No. must be at least 1" }),
  month: z.string().min(1, { message: "Month is required" }),
  year: z
    .number({
      required_error: "Year is required",
      invalid_type_error: "Year must be a number",
    })
    .refine((val) => /^\d{4}$/.test(String(val)), {
      message: "Year must be a 4-digit number",
    }),
  doi: z.string().min(1, { message: "DOI is required" }),
  status: z.enum(["0", "1"]).optional(),
});
