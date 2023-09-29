import express from "express";
import productRoutes from "../routes/productRoutes.js";
import cors from "cors";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";

//Connecting to the database
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

dotenv.config();

const port = process.env.PORT || 4000;

//Redirecting pages
app.use("/api/products", productRoutes);
app.use(express.json()); //Activating json parsing in body

//Error Handlers
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hell Naa D!");
});

//DB operations

app.listen(port, () => console.log(`Server listening of ${port}`));
