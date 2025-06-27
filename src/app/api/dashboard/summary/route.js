
// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/dbConnect";
// import Sale from "@/models/Sale";
// import Expense from "@/models/Expense";
// import Product from "@/models/Product";
// import Purchase from "@/models/Purchase"; // ✅ Make sure this model exists

// export async function GET() {
//   await dbConnect();

//   try {
//     const sales = await Sale.find({});
//     const expenses = await Expense.find({});
//     const purchases = await Purchase.find({});
//     const products = await Product.find({});

//     const totalSales = sales.reduce(
//       (acc, sale) => acc + (sale.totalAmount || 0),
//       0
//     );
//     const totalExpenses = expenses.reduce(
//       (acc, ex) => acc + (ex.amount || 0),
//       0
//     );
//     const totalPurchases = purchases.reduce(
//       (sum, p) => sum + (p.totalPrice || 0),
//       0
//     ); // ✅ Updated

//     const profit = totalSales - totalExpenses - totalPurchases;

//     const lowStock = products.filter((p) => p.quantity <= p.lowStockLimit);

//     // Top products logic
//     const topProductsMap = {};
//     sales.forEach((sale) => {
//       sale.products.forEach((item) => {
//         if (!topProductsMap[item.name])
//           topProductsMap[item.name] = item.quantity;
//         else topProductsMap[item.name] += item.quantity;
//       });
//     });

//     const topProducts = Object.entries(topProductsMap)
//       .map(([name, qty]) => ({ name, qty }))
//       .sort((a, b) => b.qty - a.qty)
//       .slice(0, 5);

//     return NextResponse.json({
//       success: true,
//       data: {
//         totalSales,
//         totalExpenses,
//         totalPurchases, // ✅ Send to frontend
//         profit,
//         lowStockCount: lowStock.length,
//         topSelling: topProducts,
//       },
//     });
//   } catch (err) {
//     console.error("Dashboard summary error:", err);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Sale from "@/models/Sale";
import Expense from "@/models/Expense";
import Product from "@/models/Product";
import Purchase from "@/models/Purchase"; // ✅

export async function GET() {
  await dbConnect();

  try {
    // Fetch data from all models
    const sales = await Sale.find({});
    const expenses = await Expense.find({});
    const purchases = await Purchase.find({});
    const products = await Product.find({});

    // Totals
    const totalSales = sales.reduce(
      (acc, sale) => acc + (sale.totalAmount || 0),
      0
    );
    const totalExpenses = expenses.reduce(
      (acc, ex) => acc + (ex.amount || 0),
      0
    );
    const totalPurchases = purchases.reduce(
      (sum, p) => sum + (p.totalPrice || 0),
      0
    );

    const profit = totalSales - totalExpenses - totalPurchases;

    // Low stock check
    const lowStock = products.filter((p) => p.quantity <= p.lowStockLimit);

    // Top selling products
    const topProductsMap = {};
    sales.forEach((sale) => {
      sale.products.forEach((item) => {
        if (!topProductsMap[item.name]) {
          topProductsMap[item.name] = item.quantity;
        } else {
          topProductsMap[item.name] += item.quantity;
        }
      });
    });

    const topProducts = Object.entries(topProductsMap)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    // Send response
    return NextResponse.json({
      success: true,
      data: {
        totalSales,
        totalExpenses,
        totalPurchases,
        profit,
        lowStockCount: lowStock.length,
        topSelling: topProducts,
      },
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
