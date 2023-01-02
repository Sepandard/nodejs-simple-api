const express = require("express");
const router = express.Router();
// Controllers
const {
  remove,
  create,
  getAll,
  getById,
  update,
  count,
} = require("../controller/product.controller");

// GET
router.get("/", getAll);
router.get("/count", count);
router.get("/:id", getById);

// POST
router.post("/", create);
// PUT
router.put("/:id", update);

// DELETE
router.delete("/:id", remove);

module.exports = router;
