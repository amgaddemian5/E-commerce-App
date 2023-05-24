import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { registerFailure, registerStart, registerSuccess } from "./registerRedux";
import { publicRequest } from "../requestMethods";
import { setAllProducts } from "./productRedux";

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch, products) => {
  if (products.length === 0) {
    try {
      const res = await publicRequest.get("/products");
      dispatch(setAllProducts(res.data));
    } catch (err) {
      console.log("error");
    }
  }
  return products;
};
