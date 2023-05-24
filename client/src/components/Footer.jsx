import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  font-family: "Staatliches", cursive;
`;

const Desc = styled.p`
  margin: 20px 0px;
  ${mobile({ display: "none" })}
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ flexDirection: "column" })}
`;

const ListItem = styled.a`
  width: 50%;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>SHOPIFY</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon
            onClick={() => (window.location = "https://facebook.com")}
            color="3B5999"
          >
            <Facebook />
          </SocialIcon>

          <SocialIcon
            color="E4405F"
            onClick={() => (window.location = "https://instagram.com")}
          >
            <Instagram />
          </SocialIcon>
          <SocialIcon
            color="55ACEE"
            onClick={() => (window.location = "https://twitter.com")}
          >
            <Twitter />
          </SocialIcon>
          <SocialIcon
            color="E60023"
            onClick={() => (window.location = "https://pinterest.com")}
          >
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem href="/">Home</ListItem>
          <ListItem href="/cart">Cart</ListItem>
          <ListItem href="/products/women">Woman Fashion</ListItem>
          <ListItem href="/wishlist">Wishlist</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 3 ismalia , Egypt
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +02 011 288 248
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> ismaia@ITI.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
