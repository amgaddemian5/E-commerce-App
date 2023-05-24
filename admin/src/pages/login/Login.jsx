import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { Link, useHistory, withRouter } from "react-router-dom";

import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(http://www.gvntmc.com/wp-content/uploads/2016/07/Savin-NY-Website-Background-Web.jpg)
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 40px;
  background-color: white;
`;

const Login = () => {
  const history = useHistory();

  const Button = withRouter(({ history }) => (
    <button
      type='button'
      style={{ marginLeft: 70, marginTop: 20 }}
      onClick={() => { history.push('/login') }}
    >
      Go TO Login Page
    </button>
  ))
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const admin = useSelector((state) => state.user?.currentUser?.isAdmin);


  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    history.push("/");
  };

  return (
    <Container>
      <Wrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent"
          }}
        >
          <input
            style={{ padding: 10, marginBottom: 20 }}
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={{ padding: 10, marginBottom: 20 }}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />


          <button
            onClick={handleClick}
            disabled={isFetching}
            style={{ padding: 10, width: 100 }}
          >
            Login
          </button>

        </div>
      </Wrapper>
    </Container>
  );
};

export default Login;
