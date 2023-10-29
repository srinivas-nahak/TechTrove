import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    userDisplayPicture: String,
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      default: "", //Adding default text so that even if the user hasn't added anything we wouldn't have any error
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["smart_phones", "game_consoles", "earphones", "cameras"],
      lowercase: true,
    },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

export default Products;
