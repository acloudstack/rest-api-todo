const express = require("express");
const todosRoutes = require("./routes/todos.routes");
const vacationsRoutes = require("./routes/vacations.routes");
const hotelsRoutes = require("./routes/hotels.routes");
const mongodb = require("./mongodb/mongodb.connect");

const app = express();
mongodb.connect();
app.use(express.json());
app.get("/", (req, res) => {
    res.json({"data": "Hello World - REST API demo"})
});
app.use("/todos", todosRoutes);
app.use("/vacations", vacationsRoutes);
app.use("/hotels", hotelsRoutes);

// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({"message": error.message});
});

module.exports = app;
