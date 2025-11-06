import mongoose from "mongoose";

const volumeSchema = new mongoose.Schema(
  {
    volumeCoverImage: {
      type: String, // URL or file path to volume cover image
      default: null,
      trim: true,
    },
    volumeNo: {
      type: String,
      required: [true, "Volume number is required"],
      trim: true,
    },
    seriesNo: {
      type: String,
      required: [true, "Series number is required"],
      trim: true,
    },
    month: {
      type: String,
      required: [true, "Month is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1900, "Year must be at least 1900"],
      max: [
        new Date().getFullYear() + 10,
        "Year cannot be too far in the future",
      ],
    },
    doiLink: {
      type: String,
      trim: true,
      default: null,
    },
    publishedDate: {
      type: Date,
      default: null,
    },
    // Volume status (active, inactive)
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

// Index for better performance
volumeSchema.index({ volumeNo: 1, seriesNo: 1 });
volumeSchema.index({ year: 1 });
volumeSchema.index({ status: 1 });

export default mongoose.model("Volume", volumeSchema);
