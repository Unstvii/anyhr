import React from "react";
import { Container, Grid, Pagination } from "@mui/material";
import ProductItem from "../ProductItem/ProductItem";

const ProductContainer = ({ products, totalPages, page, handlePageChange }) => (
  <Container sx={{ minHeight: "380px", position: "relative" }}>
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
    <Pagination
      count={totalPages}
      page={page}
      onChange={handlePageChange}
      sx={{
        position: "absolute",
        bottom: "-60px",
        transform: "translateX(-12px)",
        pb: "10px",
      }}
    />
  </Container>
);

export default ProductContainer;
