import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    customerName: String,
    staffName: String,
    warehouse: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
