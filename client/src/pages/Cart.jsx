import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { removeProduct, increaseProduct } from "../redux/cartRedux";

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
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
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
  margin: 3em 2em;
  box-shadow: 0px 0px 13px 4px #f0e8e8bc;
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
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 1em;
  ${mobile({ margin: "5px 15px" })}
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
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "Total" && "500"};
  font-size: ${(props) => props.type === "Total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover{
    background-color: white;
    color: black;
  }
`;

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const increaseProductmethod = (product) => {
    dispatch(increaseProduct(product));
  };
  const wishlist = useSelector((store) => store.wishlist.products);
  const removeFromCart = (product) => {
    dispatch(removeProduct(product));
  };
  let navigate = useNavigate()

const handleClickCheckout = ()=>{
  
   navigate("/login")
}
  return (
    <Container>
      <Announcement />
      <Navbar search={false} />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <Link to="/products/women">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          {/* <TopTexts>
            <Link style={{textDecoration:"none", color:"black",cursor:"pointer"}} to={"/wishlist"}>
              <TopText>Your Wishlist ({wishlist.length})</TopText>
            </Link>
          </TopTexts> */}
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductColor color={product.color} />
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add style={{cursor:"pointer", fontWeight:"bolder"}} onClick={() => increaseProductmethod(product)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove style={{cursor:"pointer", fontWeight:"bolder"}} onClick={() => removeFromCart(product)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="Total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

            { JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  .currentUser === null ? <Button onClick={handleClickCheckout}>
                CHECKOUT NOW
              </Button> :
              
              
               <StripeCheckout
              name="Shopify"
              image="https://cdn.shopify.com/app-store/listing_images/14a542f82760ad675a4bc9bfb5cb4696/icon/CJzWsPTq_PMCEAE=.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button disabled={cart.products.length === 0}>
                CHECKOUT NOW
              </Button>
            </StripeCheckout>  }
            
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
