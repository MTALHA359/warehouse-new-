import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  totalCost: { type: Number },
  purchasedBy: { type: String, default: "Admin" },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", PurchaseSchema);
