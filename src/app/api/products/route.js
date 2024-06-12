import { products } from "@/app/data/products";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const totalProducts = products.length;
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 5;
  const totalPages = Math.ceil(totalProducts / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedProducts = products.slice(start, end);

  const responseObj = {
    totalPages,
    products: paginatedProducts,
  };

  return new Response(JSON.stringify(responseObj), {
    headers: { "Content-Type": "application/json" },
  });
}
