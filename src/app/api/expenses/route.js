// /app/api/expenses/route.js
import { dbConnect } from "@/lib/dbConnect";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const expenses = await Expense.find().sort({ date: -1 });
  return NextResponse.json({ success: true, expenses });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const expense = await Expense.create({
    type: body.type,
    amount: body.amount,
    addedBy: body.addedBy || "Admin",
  });

  return NextResponse.json({ success: true, expense });
}
