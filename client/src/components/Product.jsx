import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  FavoriteSharp,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../redux/wishlistRedux";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishlist.products);
  let isFav = (productId) => {
    console.log("in func");
    return products.some((product) => product._id === productId);
  };
  const addToFav = (product) => {
    dispatch(addProduct(product));
  };
  const removeFromFav = (product) => {
    dispatch(deleteProduct(product));
  };

  useEffect(() => {}, [dispatch]);

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          {isFav(item._id) ? (
            <FavoriteSharp
              style={{ color: "red" }}
              onClick={() => removeFromFav(item)}
            />
          ) : (
            <FavoriteBorderOutlined onClick={() => addToFav(item)} />
          )}
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
