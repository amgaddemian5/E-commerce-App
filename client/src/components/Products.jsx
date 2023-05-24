import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  font-family: "Staatliches", cursive;
  font-size: 40px;
  letter-spacing: 3px;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const numberOfProdInPage = 2;

  const getDataOfPage = (page) => {
    if (filteredProducts.length > 0) {
      const startIndex = (page - 1) * numberOfProdInPage;
      setPaginatedData(
        filteredProducts.slice(startIndex, startIndex + numberOfProdInPage)
      );
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    getDataOfPage(1);
  }, [filteredProducts]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <Title>FEATURED PRODUCTS</Title>
      <Container>
        {cat
          ? paginatedData.map((item) => <Product item={item} key={item.id} />)
          : products
              .slice(0, 8)
              .map((item) => <Product item={item} key={item.id} />)}
      </Container>
      <Pagination
        count={
          filteredProducts.length > numberOfProdInPage
            ? Math.round(filteredProducts.length / numberOfProdInPage)
            : 1
        }
        onChange={(event, data) => getDataOfPage(data)}
      />
    </>
  );
};

export default Products;
