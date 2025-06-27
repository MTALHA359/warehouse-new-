// import { dbConnect } from "@/lib/dbConnect";
// import Warehouse from "@/models/Warehouse";

// export async function DELETE(req, { params }) {
//   await dbConnect();
//   await Warehouse.findByIdAndDelete(params.id);
//   return Response.json({ success: true });
// }

import { dbConnect } from "@/lib/dbConnect";
import Warehouse from "@/models/Warehouse";

export async function DELETE(req, { params }) {
  await dbConnect();
  const deleted = await Warehouse.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
