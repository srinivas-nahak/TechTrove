import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Orders from "../models/orderModel.js";

//@desc     Place an order
//@route    POST /api/orders
//@access   Public
const placeOrder = asyncHandler(async (req, res) => {
  const user = req.user;

  const receivedOrder = req.body;

  try {
    const createdOrder = await Orders.create({
      user: user._id,
      orderedItems: receivedOrder.orderedItems,
      shippingAddress: receivedOrder.shippingAddress,
      paymentMethod: receivedOrder.paymentMethod,
      paymentResult: receivedOrder.paymentResult,
      itemsPrice: receivedOrder.itemsPrice,
      taxPrice: receivedOrder.taxPrice,
      shippingPrice: receivedOrder.shippingPrice,
      totalPrice: receivedOrder.totalPrice,
      isPaid: receivedOrder.isPaid,
      paidAt: Date.now(),
      isDelivered: false,
      deliveredAt: null,
    });

    res.json({ message: "Order placed successfully!" });
  } catch (error) {
    console.log(error);

    res.status(400);
    throw new Error(error.message);
  }
});

//@desc     Get Placed Orders
//@route    GET /api/orders/
//@access   Public
const getPlacedOrders = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    const placedOrders = await Orders.find({ user: user._id });
    res.json(placedOrders);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@desc     Cancel an order
//@route    DELETE /api/orders/:orderId
//@access   Public
const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await Orders.findByIdAndRemove(orderId);
    res.json({ message: "Order deleted successfully!" });
  } catch (error) {}
});

//@desc     Get Placed Orders
//@route    GET /api/orders/
//@access   Private/Admin
const getOrdersAdmin = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    const allOrders = await Orders.find();
    res.json(allOrders);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@desc     Update order status
//@route    PATCH /api/orders/:orderId
//@access   Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const updateOrder = await Orders.findByIdAndUpdate(
      orderId,
      {
        $set: {
          isDelivered: true,
          deliveredAt: Date.now(),
        },
      },
      { new: true }
    );

    res.json({ message: "Order updated successfully!" });
  } catch (error) {
    console.log(error);

    res.status(400);
    throw new Error(error.message);
  }
});

export {
  placeOrder,
  getPlacedOrders,
  cancelOrder,
  getOrdersAdmin,
  updateOrderStatus,
};
