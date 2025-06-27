import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    sku: String,
    category: String,
    quantity: Number,
    purchasePrice: Number,
    salePrice: Number,
    warehouse: String,
    lowStockLimit: Number,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
