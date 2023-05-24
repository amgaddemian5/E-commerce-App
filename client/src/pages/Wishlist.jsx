import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addProduct, deleteProduct } from "../redux/wishlistRedux";
import { FavoriteBorderOutlined, FavoriteSharp } from "@material-ui/icons";

const KEY = process.env.REACT_APP_STRIPE;
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover{
    background-color: black;
    color:white;
  }
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;

  margin: 0px 10px;

  ${mobile({ display: "none" })}
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px; ;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

function Wishlist() {
  const wishListproducts = useSelector((store) => store.wishlist.products);
  const dispatch = useDispatch();
  let isFav = (productId) => {
    return wishListproducts.some((product) => product._id === productId);
  };
  const addToFav = (product) => {
    dispatch(addProduct(product));
  };
  const removeFromFav = (product) => {
    dispatch(deleteProduct(product));
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR WISHLIST</Title>
        <Top>
          <Link to="/products/women">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          {/* <TopTexts>
            <Link to="/cart">
              <TopText>Shopping Cart</TopText>
            </Link>
          </TopTexts> */}
        </Top>
        <Bottom>
          <Info>
            {wishListproducts.length === 0 ? (
              <div style={{ height: "40vh", paddingTop: "2rem" }}>
                <h4 style={{ textAlign: "center" }}>Your Wishlist is Empty</h4>
              </div>
            ) : (
              wishListproducts.map((product) => (
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      {/* <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId> */}
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                      <ProductColor color={product.color} />
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice>$ {product.price}</ProductPrice>
                  </PriceDetail>
                  <PriceDetail>
                    <div>
                      {isFav(product._id) ? (
                        <FavoriteSharp
                          style={{ color: "red", fontSize: "30px" }}
                          onClick={() => removeFromFav(product)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </PriceDetail>
                </Product>
              ))
            )}
            <Hr />
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Wishlist;
