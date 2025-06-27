import { dbConnect } from "@/lib/dbConnect";
import Purchase from "@/models/Purchase";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const purchases = await Purchase.find().sort({ date: -1 });
  return NextResponse.json({ success: true, purchases });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const totalCost = body.quantity * body.purchasePrice;

  const purchase = await Purchase.create({
    productName: body.productName,
    quantity: body.quantity,
    purchasePrice: body.purchasePrice,
    totalCost,
    purchasedBy: body.purchasedBy || "Admin",
  });

  return NextResponse.json({ success: true, purchase });
}
