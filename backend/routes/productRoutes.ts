import express from "express";
import {
  getProductById,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById);

export default router;

//res.status(400).json({ error: error.message });
