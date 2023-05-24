import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<ProductList />} path="/products/:category" />
          <Route element={<Product />} path="/product/:id" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<Success />} path="/success" />
          <Route element={<Wishlist />} path="/wishlist" />
          <Route
            element={user ? <Navigate to="/" replace="true" /> : <Login />}
            path="/login"
          />
          <Route
            element={user ? <Navigate to="/" replace="true" /> : <Register />}
            path="/register"
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
