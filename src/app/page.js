"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Hero from "./Components/Hero/Hero.jsx";
import ProductContainer from "./Components/ProductContainer/ProductContainer.jsx";

const CatalogContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [responseObj, setResponseObj] = useState({
    totalPages: 0,
    products: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 6;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(`/api/products?page=${page}&limit=${limit}`);
      setResponseObj(res.data);
      setIsLoading(false);
    };

    fetchData();
  }, [page, limit]);

  const handlePageChange = (event, value) => {
    router.push(`/?page=${value}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Hero />
      <ProductContainer
        products={responseObj.products}
        totalPages={responseObj.totalPages}
        page={page}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

const Catalog = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
};

export default Catalog;
