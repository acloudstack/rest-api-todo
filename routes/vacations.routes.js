const express = require("express");
const controller = require("../controllers/vacations.controller");
const router = express.Router();

router.get("/", controller.getVacations);

module.exports = router;
