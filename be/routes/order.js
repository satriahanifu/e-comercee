var express = require("express");
var router = express.Router();

const {
  findAll,
  findOne,
  create,
  updateStatus,
  uploadBuktiBayar,
} = require("../controllers/order");
const authorization = require("../authorization");

/* GET users listing. */
router.get("/", authorization, findAll);
router.get("/:id", authorization, findOne);
router.post("/", authorization, create);
router.put("/:id/status", authorization, updateStatus);
router.put("/:id/buktiBayar", authorization, uploadBuktiBayar);

module.exports = router;
