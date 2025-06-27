import { dbConnect } from "@/lib/dbConnect";
import Sale from "@/models/Sale";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const sale = await Sale.findById(id);
      if (!sale)
        return res.status(404).json({ success: false, message: "Not found" });

      return res.status(200).json({ success: true, sale });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error", error: err.message });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
