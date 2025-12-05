import mongoose from "mongoose";

const volumeSchema = new mongoose.Schema(
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
      required: false,
      trim: true,
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
volumeSchema.index({ volumeNo: 1 });
volumeSchema.index({ seriesNo: 1 });
volumeSchema.index({ month: "text" });
volumeSchema.index({ year: 1 });
volumeSchema.index({ doi: 1 });
volumeSchema.index({ status: 1 });

// Migration logic for dropping unique index on doi field should be handled via a migration script, not in a pre-save hook.

export default mongoose.model("Volume", volumeSchema);
