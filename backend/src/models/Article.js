import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    volumeNo: {
      type: Number,
      required: [true, "Volume No. is required"],
      max: [999, "Volume No. cannot exceed 3 digits"],
    },

    seriesNo: {
      type: Number,
      required: [true, "Series No. is required"],
      max: [999, "Series No. cannot exceed 3 digits"],
    },

    month: {
      type: String,
      required: [true, "Month is required"],
      trim: true,
      maxlength: [15, "Month cannot exceed 15 characters"],
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
      validate: {
        validator: (value) => /^\d{4}$/.test(String(value)),
        message: "Year must be in YYYY format",
      },
    },

    doi: {
      type: String,
      required: [true, "DOI is required"],
      trim: true,
      unique: true,
    },

    banner: {
      type: String,
      default: null,
      trim: true,
    },

    status: {
      type: String,
      enum: ["1", "0"],
      default: "1",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
articleSchema.index({ volumeNo: 1 });
articleSchema.index({ seriesNo: 1 });
articleSchema.index({ month: "text" });
articleSchema.index({ year: 1 });
articleSchema.index({ doi: 1 }, { unique: true });
articleSchema.index({ status: 1 });

export default mongoose.model("Article", articleSchema);
