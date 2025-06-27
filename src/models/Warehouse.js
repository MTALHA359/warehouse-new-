// import mongoose from "mongoose";

// const WarehouseSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     location: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Warehouse ||
//   mongoose.model("Warehouse", WarehouseSchema);

import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: String,
  },
  { timestamps: true }
);

export default mongoose.models.Warehouse ||
  mongoose.model("Warehouse", WarehouseSchema);
