const express = require("express");
const controller = require("../controllers/hotels.controller");
const router = express.Router();

router.get("/", controller.getHotels);

module.exports = router;
