import { NextResponse } from "next/server";
import Purchase from "@/models/Purchase";
import { dbConnect } from "@/lib/dbConnect";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const body = await req.json();

  const updatedPurchase = await Purchase.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json(updatedPurchases);
}
