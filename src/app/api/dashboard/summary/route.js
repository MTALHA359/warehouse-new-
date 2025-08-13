// src/app/api/dashboard/summary/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();
    // Example: Fetch some data from Product model
    const products = await Product.find();
    const summary = {
      success: true,
      data: {
        totalSales: products.reduce(
          (sum, p) => sum + (p.price * p.quantitySold || 0),
          0
        ), // Adjust logic as needed
        totalPurchases: 0, // Update with actual logic
        totalExpenses: 12000, // Example value
        profit: 0, // Calculate based on sales and expenses
        lowStockCount: products.filter((p) => p.stock < 10).length, // Example threshold
      },
    };
    return NextResponse.json(summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard summary" },
      { status: 500 }
    );
  }
}
