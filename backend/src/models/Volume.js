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

// Drop unique index on doi field if it exists (for migration purposes)
volumeSchema.pre("save", async function () {
  try {
    const collection = this.constructor.collection;
    const indexes = await collection.indexes();
    const doiUniqueIndex = indexes.find(
      (index) => index.name === "doi_1" && index.unique === true
    );
    if (doiUniqueIndex) {
      await collection.dropIndex("doi_1");
      console.log("Dropped unique index on doi field");
    }
  } catch (error) {
    // Index might not exist, ignore error
    console.log("No unique index to drop on doi field");
  }
});

export default mongoose.model("Volume", volumeSchema);
