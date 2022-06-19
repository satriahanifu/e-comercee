var express = require("express");
var router = express.Router();

const detailOrderController = require("../controllers/detailorder");

router.get("/", detailOrderController.findAll);
router.get("/:id", detailOrderController.findOne);
router.post("/", detailOrderController.create);
router.delete("/:id", detailOrderController.delete);
router.put("/:id", detailOrderController.update);

module.exports = router;
