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

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    doi: {
      type: String,
      default: "",
      trim: true,
    },

    pageRange: {
      type: String,
      default: "",
      trim: true,
    },

    abstract: {
      type: String,
      default: "",
      trim: true,
    },

    keywords: {
      type: [String],
      default: [],
    },

    banner: {
      type: String,
      default: null,
      trim: true,
    },

    pdfFile: {
      type: String,
      default: null,
      trim: true,
    },

    authors: [
      {
        firstname: {
          type: String,
          required: [true, "First name is required"],
          trim: true,
          maxlength: [50, "First name cannot exceed 50 characters"],
        },
        middlename: {
          type: String,
          default: "",
          trim: true,
          maxlength: [50, "Middle name cannot exceed 50 characters"],
        },
        lastname: {
          type: String,
          required: [true, "Last name is required"],
          trim: true,
          maxlength: [50, "Last name cannot exceed 50 characters"],
        },
        department: {
          type: String,
          default: "",
          trim: true,
          maxlength: [100, "Department cannot exceed 100 characters"],
        },
        school: {
          type: String,
          default: "",
          trim: true,
          maxlength: [100, "School cannot exceed 100 characters"],
        },
        city: {
          type: String,
          default: "",
          trim: true,
          maxlength: [50, "City cannot exceed 50 characters"],
        },
        country: {
          type: String,
          default: "",
          trim: true,
          maxlength: [50, "Country cannot exceed 50 characters"],
        },
      },
    ],

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
articleSchema.index({ title: 1 });
articleSchema.index({ status: 1 });

export default mongoose.model("Article", articleSchema);
