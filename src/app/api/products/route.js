import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

// GET all products
export async function GET() {
  await dbConnect();
  try {
    const products = await Product.find(); // get all fields
    return NextResponse.json({ success: true, products });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to load products" },
      { status: 500 }
    );
  }
}

// CREATE new product
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();

    // Validate
    if (!body.name || !body.salePrice) {
      return NextResponse.json(
        { success: false, message: "Name and Price are required" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}
