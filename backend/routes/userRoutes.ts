import {
  loginUser,
  signUpUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.route("/").post(signUpUser).get(protect, admin, getUsers); //Here user will not only be authenticated and but also be an admin
router.post("/login", loginUser);
router.post("/logout", logoutUser);

//Protect Middleware
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
