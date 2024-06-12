import axios from "axios";

export async function GET() {
  const baseUrl = "https://anyhr.vercel.app";
  const resProducts = await axios.get(`${baseUrl}/api/products`);
  const products = resProducts.data;

  //   const staticPages = ["", "about", "contact"];

  const dynamicPages = products.map((product) => `products/${product.id}`);
  console.log(dynamicPages);
  const allPages = [...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map((url) => {
        return `
          <url>
            <loc>${baseUrl}/${url}</loc>
          </url>
        `;
      })
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
