var express = require("express");
var router = express.Router();

const {
  findAll,
  findOne,
  create,
  update,
  delete: remove,
} = require("../controllers/product");
const authorization = require("../authorization");

/* GET users listing. */
router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.delete("/:id", remove);
router.put("/:id", update);

module.exports = router;
