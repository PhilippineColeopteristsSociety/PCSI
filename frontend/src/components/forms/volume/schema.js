import { z } from "zod";

export const VolumeSchema = z.object({
  volumeNo: z
    .string()
    .min(1, "Volume number is required")
    .max(10, "Volume number must be less than 10 characters"),
  seriesNo: z
    .string()
    .min(1, "Series number is required")
    .max(10, "Series number must be less than 10 characters"),
  month: z.string().min(1, "Month is required"),
  year: z
    .string()
    .min(4, "Year must be 4 digits")
    .max(4, "Year must be 4 digits")
    .regex(/^\d{4}$/, "Year must be a valid 4-digit number"),
  doiLink: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "DOI link must be a valid URL"
    ),
  status: z.enum(["0", "1"], {
    required_error: "Status is required",
  }),
});
