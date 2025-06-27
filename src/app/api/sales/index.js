import { dbConnect } from "@/lib/dbConnect";
import Sale from "@/models/Sale";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { products, totalAmount, customerName, staffName, warehouse } =
        req.body;

      if (!products || !customerName || !staffName) {
        return res
          .status(400)
          .json({ success: false, message: "Missing fields" });
      }

      // Reduce product stock
      for (let item of products) {
        const product = await Product.findById(item.productId);
        if (!product) continue;
        product.quantity -= item.quantity;
        await product.save();
      }

      // Save the sale
      const newSale = new Sale({
        products,
        totalAmount,
        customerName,
        staffName,
        warehouse,
        date: new Date(),
      });

      await newSale.save();

      return res.status(201).json({ success: true, sale: newSale });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
}
