import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController";

import { productValidation } from "../validators/productValidator";
import { validateRequest } from "../middleware/validate";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

// GET ALL PRODUCTS
router.get(
  "/",
  asyncHandler(getProducts)
);

// GET PRODUCT BY ID
router.get(
  "/:id",
  asyncHandler(getProductById)
);

// CREATE PRODUCT
router.post(
  "/",
  productValidation,
  validateRequest,
  asyncHandler(createProduct)
);

// UPDATE PRODUCT
router.put(
  "/:id",
  productValidation,
  validateRequest,
  asyncHandler(updateProduct)
);

// DELETE PRODUCT
router.delete(
  "/:id",
  asyncHandler(deleteProduct)
);

export default router;