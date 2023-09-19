import express from "express";
import products from "../data/products.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hell Naa D!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  const product = products.find((product, index) => index + 1 === id);

  if (!product) {
    const error = new Error("Product not found!");
    return res.status(400).json({ error: error.message });

    //throw new Error("Product Not Found!!");
  }

  res.json(product);
});

app.listen(port, () => console.log(`Server listening of ${port}`));
