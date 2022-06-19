var express = require("express");
var router = express.Router();

const categoryController = require("../controllers/category");
// const auth = require("../authorization");

/* GET users listing. */
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findOne);
router.post("/", categoryController.create);
router.delete("/:id", categoryController.delete);
router.put("/:id", categoryController.update);

module.exports = router;
