import { products } from "@/app/data/products";

export async function GET(req, { params }) {
  const { id } = params;
  const product = products.find((p) => p.id === parseInt(id));
  if (product) {
    return new Response(JSON.stringify(product), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
