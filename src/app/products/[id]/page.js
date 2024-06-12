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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Typography>{product.description}</Typography>
    </Container>
  );
};

export default Product;
