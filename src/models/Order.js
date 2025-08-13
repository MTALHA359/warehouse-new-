// src/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  // Add other fields as needed
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
