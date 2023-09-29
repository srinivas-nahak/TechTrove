import productsData from "../data/products.js";
import express from "express";
import {
  getProductById,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("", getAllProducts);

router.get("/:id", getProductById);

export default router;

//res.status(400).json({ error: error.message });
