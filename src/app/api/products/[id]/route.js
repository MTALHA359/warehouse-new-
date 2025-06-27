import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const product = await Product.findById(params.id);
    if (!product)
      return Response.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    return Response.json({ success: true, product });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();
    await Product.findByIdAndUpdate(params.id, body);
    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(params.id);
    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
