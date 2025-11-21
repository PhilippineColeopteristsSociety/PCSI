import mongoose from "mongoose";

const volumeSchema = new mongoose.Schema(
  {
    volumeNo: {
      type: String,
      required: [true, "Volume No. is required"],
      trim: true,
      maxlength: [3, "Volume No. cannot exceed 3 characters"],
    },

    seriesNo: {
      type: String,
      required: [true, "Series No. is required"],
      trim: true,
      maxlength: [3, "Series No. cannot exceed 3 characters"],
    },

    month: {
      type: String,
      required: [true, "Month is required"],
      trim: true,
      maxlength: [15, "Month cannot exceed 15 characters"],
    },

    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
      maxlength: [4, "Year must be 4 digits"],
      validate: {
        validator: (value) => /^\d{4}$/.test(value),
        message: "Year must be in YYYY format",
      },
    },

    doi: {
      type: String,
      required: [true, "DOI is required"],
      trim: true,
      unique: true, // DOIs are usually unique
    },

    banner: {
      type: String, // URL or file path
      default: null,
      trim: true,
    },

    status: {
      type: String,
      enum: ["1", "0"], // 1 = active, 0 = inactive
      default: "1",
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
volumeSchema.index({
  volumeNo: "text",
  seriesNo: "text",
  month: "text",
  year: "text",
});
volumeSchema.index({ doi: 1 }, { unique: true });
volumeSchema.index({ status: 1 });

export default mongoose.model("Volume", volumeSchema);
