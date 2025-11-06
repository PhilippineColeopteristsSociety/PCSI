import Volume from "../models/Volume.js";

const volumeService = {
  createVolume: async (
    image,
    volumeNo,
    seriesNo,
    month,
    year,
    doiLink,
    publishedDate
  ) => {
    const volume = await Volume.create({
      image,
      volumeNo,
      seriesNo,
      month,
      doiLink,
      publishedDate,
    });
    return volume;
  },
  getVolumes: async (limit = null, filters = {}) => {
    let query = Volume.find(filters).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }

    const volumes = await query;
    return volumes;
  },
  getVolume: async (id) => {
    const volume = await Volume.findById(id);
    return volume;
  },
  updateVolume: async (id, data) => {
    const volume = await Volume.findByIdAndUpdate(id, data, { new: true });
    return volume;
  },
  toggleVolumeStatus: async (id, status) => {
    const volume = await Volume.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );
    return volume;
  },
};

export default volumeService;
