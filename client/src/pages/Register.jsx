import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 40px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 28px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #B71C1C;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  &:hover{
    background-color: white;
    color: #B71C1C;
    border: 0.5px solid #B71C1C;
  }
`;

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault()
    register(dispatch, { username,email, password });
    if (username && password && email !== ""){

      navigate("/");
    }

  };
  return (
    <Container>
      <Wrapper>
        <Title>CEATE AN ACCOUNT</Title>
        <Form action="/" onSubmit={handleClick}>
         
          <Input
          type="string"
            placeholder="username" required 

            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
          type="email"
            placeholder="email" required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password" required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
         
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance within the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button disabled={isFetching}>
            Register
          </Button>
         
        </Form>
      </Wrapper>
    </Container>
  );
}
export default Register;
