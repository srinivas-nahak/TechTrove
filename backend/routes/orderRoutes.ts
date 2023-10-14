import {
  cancelOrder,
  getOrdersAdmin,
  getPlacedOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.route("/").get(protect, getPlacedOrders).post(protect, placeOrder);
router
  .route("/:orderId")
  .delete(protect, cancelOrder)
  .patch(protect, admin, updateOrderStatus);

router.route("/admin").get(protect, admin, getOrdersAdmin);

export default router;
