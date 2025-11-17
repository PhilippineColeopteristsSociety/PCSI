import mongoose from "mongoose";

const volumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Volume title is required"],
      trim: true,
      maxlength: [200, "Volume title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    volumeNumber: {
      type: Number,
      required: [true, "Volume number is required"],
      min: [1, "Volume number must be at least 1"],
    },
    year: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1900, "Year must be at least 1900"],
      max: [
        new Date().getFullYear() + 10,
        "Year cannot be more than 10 years in the future",
      ],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
      default: null,
    },
    pdfUrl: {
      type: String,
      default: null,
    },
    issueCount: {
      type: Number,
      default: 0,
      min: [0, "Issue count cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique volume numbers per year
volumeSchema.index({ volumeNumber: 1, year: 1 }, { unique: true });

// Virtual for full volume name
volumeSchema.virtual("fullName").get(function () {
  return `Volume ${this.volumeNumber} (${this.year})`;
});

// Ensure virtual fields are serialized
volumeSchema.set("toJSON", { virtuals: true });
volumeSchema.set("toObject", { virtuals: true });

export default mongoose.model("Volume", volumeSchema);
