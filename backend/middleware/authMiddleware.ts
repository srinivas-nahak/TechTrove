import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import Users from "../models/userModel.js";

//Protect Routes
const protect = asyncHandler(async (req, res, next) => {
  //Read the JWT from cookie
  //We're passing a custom name "jwt" it can be anything
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await Users.findById(decoded.userId).select("-password"); //This req.user can be accessed in our controller methods

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token!");
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin!");
  }
};

export { protect, admin };
