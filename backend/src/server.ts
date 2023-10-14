import express from "express";
import productRoutes from "../routes/productRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../config/db.js";

import dotenv from "dotenv";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";

//Connecting to the database
connectDB();

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

dotenv.config();

const port = process.env.PORT || 4000;

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie Parser middleware
app.use(cookieParser());

//Redirecting pages
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//Error Handlers
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hell Naa D!");
});

//DB operations

app.listen(port, () => console.log(`Server listening of ${port}`));
