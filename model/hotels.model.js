const mongoose = require("mongoose");

const HotelsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
});

const HotelsModel = mongoose.model("hotels", HotelsSchema);

module.exports = HotelsModel;
