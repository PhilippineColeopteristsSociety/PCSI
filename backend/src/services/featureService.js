import Feature from "../models/Feature.js";

const featureService = {
    createFeature: async (name, description, banner) => {
        const feature = await Feature.create({ name, description, banner });
        return feature;
    },
    getFeatures: async (limit = null, filters = {}) => {
        let query = Feature.find(filters).sort({ createdAt: -1 });
        
        if (limit && limit > 0) {
            query = query.limit(parseInt(limit));
        }
        
        const features = await query;
        return features;
    },
    getFeature: async (id) => {
        const feature = await Feature.findById(id);
        return feature;
    },
    updateFeature: async (id, data) => {
        const feature = await Feature.findByIdAndUpdate(id, data, { new: true });
        return feature;
    },
    toggleFeatureStatus: async (id, status) => {
        const feature = await Feature.findByIdAndUpdate(id, { status: status.toLowerCase() }, { new: true });
        return feature;
    },
}

export default featureService;