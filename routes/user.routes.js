const express = require("express");
const router = express.Router();
// Controllers
const { getAll, getById } = require("../controller/user.controller");

router.get("/", getAll);

router.get("/:id", getById);

module.exports = router;
