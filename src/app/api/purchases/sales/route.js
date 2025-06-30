import { dbConnect } from "@/lib/dbConnect";
import Sale from "@/models/Sale";
import Product from "@/models/Product";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const sale = await Sale.create(body);

  // Reduce stock for each product
  for (const item of body.products) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { quantity: -item.quantity },
    });
  }

  return Response.json({ success: true, sale });
}
