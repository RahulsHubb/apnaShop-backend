import { Router } from "express";
import { addVariant, deleteProduct, deleteVariant, getProductById, getProducts, getProductVariants, postProduct, updateProduct, updateVariant } from "../controllers/product.controller.js";

const router = Router();
router.get("/:productId/variants", getProductVariants);
router.post("/:productId/variants", addVariant);
router.put("/:productId/variants/:sku", updateVariant );
router.delete("/:productId/variants/:sku", deleteVariant);


router.post("/add", postProduct)
router.get("/", getProducts);
router.put("/:productId", updateProduct);
router.get("/:productId", getProductById);
router.delete("/:productId", deleteProduct);




export default router;
