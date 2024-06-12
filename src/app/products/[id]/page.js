import React from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { products } from "@/app/data/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const res = await axios.get(`https://anyhr.vercel.app/api/products/${id}`);
  const product = res.data;

  return {
    title: product.name,
    description: product.description,
  };
}

const Product = async ({ params }) => {
  const { id } = params;
  const res = await axios.get(`https://anyhr.vercel.app/api/products/${id}`);
  const product = res.data;

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": `https://anyhr.vercel.app/products/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
    },
  };

  return (
    <Container>
      <Typography variant="h3" color="secondary" sx={{ mt: "10vh" }} gutterBottom>
        {product.name}
      </Typography>
      <Typography><span style={{fontWeight:700}}>Price:</span>{product.price}$</Typography>
      <Typography><span style={{fontWeight:700}}>Our Brand:</span>{product.brand}</Typography>
      <Typography>{product.description}</Typography>
      <script type="application/ld+json">
        {JSON.stringify(productJsonLd)}
      </script>
    </Container>
  );
};

export default Product;
