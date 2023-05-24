import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

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

function App() {
  

  const Button = withRouter(({ history }) => (
    <button
      type='button'
      style={{ marginLeft: 70 ,marginTop:20}}
      onClick={() => { history.push('/login') }}
    >
      Go TO Login Page
    </button>
  ))

  const admin = useSelector((state) => state.user?.currentUser?.isAdmin);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {admin == null ? (
          <>
            <Container>
              <Wrapper>
                <div >
                  <h1 >Shopify Dashboard</h1>
                  <Button />
                </div>
              </Wrapper>
            </Container>
          </>
        ) : (
          admin && (
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
              </div>
            </>
          )
        )}
      </Switch>
    </Router >
  );
}

export default App;
