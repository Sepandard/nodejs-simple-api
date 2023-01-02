const express = require("express");
const router = express.Router();
// Controllers
const {
  create,
  getAll,
  getById,
  update,
} = require("../controller/category.controller");

// GET
router.get("/", getAll);
router.get("/:id", getById);

// POST
router.post("/", create);

// PUT
router.put("/:id", update);
module.exports = router;
