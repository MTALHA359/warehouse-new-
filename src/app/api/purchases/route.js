
// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/dbConnect";
// import Purchase from "@/models/Purchase";

// // GET all purchases
// export async function GET() {
//   await dbConnect();

//   try {
//     const purchases = await Purchase.find().sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, data: purchases });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }

// // POST new purchase
// export async function POST(req) {
//   await dbConnect();

//   try {
//     const body = await req.json();
//     const newPurchase = await Purchase.create(body);
//     return NextResponse.json({ success: true, data: newPurchase });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }


// ✅ src/app/api/purchases/route.js
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Purchase from '@/models/Purchase';

export async function GET() {
  await dbConnect();

  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, purchases });
  } catch (err) {
    console.error('GET /api/purchases error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { productName, quantity, purchasePrice, purchasedBy } = body;

    const totalCost = quantity * purchasePrice;

    const newPurchase = await Purchase.create({
      productName,
      quantity,
      purchasePrice,
      totalCost,
      purchasedBy,
      date: new Date(),
    });

    return NextResponse.json({ success: true, purchase: newPurchase });
  } catch (err) {
    console.error('POST /api/purchases error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
