// // ✅ src/app/api/purchases/route.js
// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/dbConnect";
// import Purchase from "@/models/Purchase";
// import Product from "@/models/Product";

// export async function GET() {
//   await dbConnect();

//   try {
//     const purchases = await Purchase.find().sort({ date: -1 });
//     return NextResponse.json({ success: true, purchases });
//   } catch (err) {
//     console.error("GET /api/purchases error:", err);
//     return NextResponse.json(
//       { success: false, message: "Failed to load purchases" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   await dbConnect();

//   try {
//     const body = await req.json();
//     const { productName, quantity, purchasePrice, purchasedBy } = body;

//     if (!productName || !quantity || !purchasePrice) {
//       return NextResponse.json(
//         { success: false, message: "Missing fields" },
//         { status: 400 }
//       );
//     }

//     const product = await Product.findOne({ name: productName });
//     if (!product) {
//       return NextResponse.json(
//         { success: false, message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     const totalCost = Number(quantity) * Number(purchasePrice);

//     const purchase = await Purchase.create({
//       productId: product._id,
//       productName,
//       quantity,
//       purchasePrice,
//       totalCost,
//       purchasedBy,
//       date: new Date(),
//     });

//     // Update product stock
//     product.quantity += Number(quantity);
//     await product.save();

//     return NextResponse.json({ success: true, purchase });
//   } catch (err) {
//     console.error("POST /api/purchases error:", err);
//     return NextResponse.json(
//       { success: false, message: "Failed to create purchase" },
//       { status: 500 }
//     );
//   }
// }


// src/app/api/purchases/route.js

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Purchase from "@/models/Purchase";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();

  try {
    const purchases = await Purchase.find().sort({ date: -1 });
    return NextResponse.json({ success: true, purchases });
  } catch (err) {
    console.error("GET /api/purchases error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { productName, quantity, purchasePrice, purchasedBy } = body;

    if (!productName || !quantity || !purchasePrice) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const product = await Product.findOne({ name: productName });
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const totalCost = Number(quantity) * Number(purchasePrice);

    const purchase = await Purchase.create({
      productId: product._id,
      productName,
      quantity,
      purchasePrice,
      totalCost,
      purchasedBy,
      date: new Date(),
    });

    product.quantity += Number(quantity);
    await product.save();

    return NextResponse.json({ success: true, purchase });
  } catch (err) {
    console.error("POST /api/purchases error:", err);
    return NextResponse.json({ success: false, message: "Error creating purchase" }, { status: 500 });
  }
}
