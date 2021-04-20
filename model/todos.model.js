const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const TodosModel = mongoose.model("todos", TodosSchema);

module.exports = TodosModel;
