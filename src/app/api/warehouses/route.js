// import { dbConnect } from "@/lib/dbConnect";
// import Warehouse from "@/models/Warehouse";

// export async function GET() {
//   await dbConnect();
//   const warehouses = await Warehouse.find().sort({ createdAt: -1 });
//   return Response.json({ success: true, warehouses });
// }

// export async function POST(req) {
//   await dbConnect();
//   const body = await req.json();

//   const existing = await Warehouse.findOne({ name: body.name });
//   if (existing) {
//     return Response.json(
//       { success: false, message: "Warehouse already exists" },
//       { status: 400 }
//     );
//   }

//   const warehouse = await Warehouse.create(body);
//   return Response.json({ success: true, warehouse });
// }

import { dbConnect } from "@/lib/dbConnect";
import Warehouse from "@/models/Warehouse";

export async function GET() {
  await dbConnect();
  const warehouses = await Warehouse.find().sort({ createdAt: -1 });
  return Response.json({ success: true, warehouses });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const warehouse = await Warehouse.create(body);
  return Response.json({ success: true, warehouse });
}
