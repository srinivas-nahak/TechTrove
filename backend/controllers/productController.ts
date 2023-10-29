import asyncHandler from "../middleware/asyncHandler.js";
import Products from "../models/productModel.js";

//@desc     Fetch all products
//@route    GET /api/products
//@access   Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});

  if (!products) {
    res.status(400);

    throw new Error("Products Not Found!!");
  }

  res.json(products);
});

//@desc     Fetch products by category
//@route    GET /api/products/categories/:category
//@access   Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Products.find({ category: req.params.category });

  if (!products) {
    res.status(400);

    throw new Error("Products Not Found!!");
  }

  res.json(products);
});

//@desc     Fetch product by id
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await Products.findById(id);

  if (!product) {
    //const error = new Error("Products not found!");
    res.status(400);

    throw new Error("Product Not Found!!");
  }

  res.json(product);
});

export { getProductById, getAllProducts, getProductsByCategory };
