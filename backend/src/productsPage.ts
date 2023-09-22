import products from "../data/products.js";
import express from "express";

const router = express.Router();

router.get("", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  const product = products.find((product, index) => index + 1 === id);

  if (!product) {
    const error = new Error("Product not found!");
    return res.status(400).json({ error: error.message });

    //throw new Error("Product Not Found!!");
  }

  res.json(product);
});

export default router;
