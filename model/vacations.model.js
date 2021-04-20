const mongoose = require("mongoose");

const VacationsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const VacationsModel = mongoose.model("vacations", VacationsSchema);

module.exports = VacationsModel;
