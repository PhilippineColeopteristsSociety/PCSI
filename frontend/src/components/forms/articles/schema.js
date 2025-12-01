import * as z from "zod";

const AuthorSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  middlename: z.string().optional(),
  lastname: z.string().min(1, { message: "Last name is required" }),
  department: z.string().optional(),
  school: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

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
    .string()
    .min(1, { message: "Year is required" })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && /^\d{4}$/.test(val);
      },
      { message: "Year must be a 4-digit number" }
    ),
  title: z.string().min(1, { message: "Title is required" }),
  abstract: z.string().optional(),
  keywords: z
    .string()
    .min(1, { message: "Keywords are required" })
    .refine((val) => val.includes(","), {
      message: "Keywords must be comma separated",
    }),
  doi: z.string().url({ message: "DOI must be a valid URL" }).optional(),
  pageRange: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Allow empty values
        return /^\d+-\d+$/.test(val);
      },
      {
        message:
          "Page range must be in format like '6-16' (numbers separated by hyphen)",
      }
    ),
  authors: z
    .array(AuthorSchema)
    .min(1, { message: "At least one author is required" }),
  status: z.enum(["0", "1"]).optional(),
});
