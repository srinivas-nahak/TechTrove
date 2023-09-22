import express from "express";
import products from "../data/products.js";
import productsPage from "./productsPage.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

// Enable CORS for all routes
app.use(cors());

//Redirecting pages
app.use("/api/products", productsPage);
app.get("/", (req, res) => {
  res.send("Hell Naa D!");
});

app.listen(port, () => console.log(`Server listening of ${port}`));
