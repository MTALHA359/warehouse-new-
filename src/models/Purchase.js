// import mongoose from "mongoose";

// const PurchaseSchema = new mongoose.Schema({
//   productName: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   purchasePrice: { type: Number, required: true },
//   totalCost: { type: Number },
//   purchasedBy: { type: String, default: "Admin" },
//   date: { type: Date, default: Date.now },
// });

// export default mongoose.models.Purchase ||
//   mongoose.model("Purchase", PurchaseSchema);


import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    supplier: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", purchaseSchema);
