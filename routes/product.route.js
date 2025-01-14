const express = require("express");
const router = express.Router();
const { validationSchema } = require("../middleware/validationSchema");
const productController = require("../controllers/product.controller");
const verifyToken = require("../middleware/verifyToken");

router.route("/").get(productController.getAllProducts);
router.route("/post").post(productController.addProduct);
router.route("/:productId").get(productController.getProduct);
router.route("/:productId/delete").delete(productController.deleteProduct);
router.route("/:productId/edit").patch(productController.updateProduct);

module.exports = router;
