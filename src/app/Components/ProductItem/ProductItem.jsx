import React from "react";
import Link from "next/link";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const ProductItem = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Link href={`/products/${product.id}`} passHref>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
