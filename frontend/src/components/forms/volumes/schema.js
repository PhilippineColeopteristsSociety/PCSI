import * as z from "zod";

export const VolumeSchema = z.object({
  volumeNo: z.string().min(1, {
    message: "Volume No. is required",
  }),
  seriesNo: z.string().min(1, { message: "Series No. is required" }),
  month: z.string().min(1, { message: "Month is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  doi: z.string().min(1, { message: "DOI is required" }),
  status: z.enum(["0", "1"]).optional(),
});
