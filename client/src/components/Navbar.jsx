import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/apiCalls";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ Padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.a`
  font-weight: bold;
  font-size: 35px;
  text-decoration: none;
  color: black;
  font-family: "Staatliches", cursive;
  letter-spacing: 3px;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ setQuery, search }) => {
  const navigate = useNavigate();
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    const initGetProducts = async () => {
      await getProducts(dispatch, allProducts);
      console.log(allProducts);
    };
    initGetProducts();
  }, []);
  
  const getSearchResults = async (e) => {
    console.log(e);
    let res = allProducts.filter((prod) => prod.title === e);
    if (res.length > 0) navigate("/product/" + res[0]._id);
  };
  
  function logOut(){
    localStorage.removeItem("persist:root",JSON.stringify("persist:root"));
    navigate("/", { replace: true });
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <div style={{ position: "relative", width: "100%" }}>
            <Autocomplete
              onInputChange={(e, x) => getSearchResults(x)}
              id="free-solo-demo"
              freeSolo
              disableClearable
              style={{
                width: "50%",
                minWidth: "75px",
                padding: "0px",
                marign: "0px",
                position: "absolute",
                top: -30,
              }}
              options={allProducts.map((product) => product.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search ..."
                  margin="dense"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </div>
        </Left>
        <Center>
          <Logo href="/">SHOPIFY</Logo>
        </Center>
        <Right>
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/register"
          >
            <MenuItem>REGISTER</MenuItem>
          </Link>

          <Link style={{ color: "black", textDecoration: "none" }} to="/login">
            <MenuItem>SIGN IN</MenuItem>
          </Link>

          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/wishlist"
          >
            <MenuItem>WISHLIST</MenuItem>
          </Link>

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
