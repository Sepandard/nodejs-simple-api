const express = require("express");
const router = express.Router();
// Controllers
const { signup, login } = require("../controller/auth.controller");

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
