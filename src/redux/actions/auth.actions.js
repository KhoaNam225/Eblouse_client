import * as types from "../constants/auth.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("accessToken", res.data.data.accessToken);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    toast.success(`Welcom ${res.data.data.user.name}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const loginFacebook = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_FACEBOOK_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/facebook", { access_token });
    dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: res.data.data });
    const name = res.data.data.user.name;
    localStorage.setItem("accessToken", res.data.data.accessToken);
    toast.success(`Welcome ${name}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FACEBOOK_FAILURE, payload: error });
  }
};

const loginGoogle = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_GOOGLE_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/google", { access_token });
    dispatch({ type: types.LOGIN_GOOGLE_SUCCESS, payload: res.data.data });
    const name = res.data.data.user.name;
    localStorage.setItem("accessToken", res.data.data.accessToken);
    toast.success(`Welcome ${name}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_GOOGLE_FAILURE, payload: error });
  }
};

const register = ({ name, email, password }) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    toast.success(`Thank you for your registration, ${name}!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    api.defaults.headers.common["authorization"] = accessToken;
    const res = await api.get("/users/me");
    const test = { user: res.data.data, accessToken: accessToken };
    console.log("Expected a string", test);
    dispatch({
      type: types.GET_CURRENT_USER_SUCCESS,
      payload: test,
    });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.removeItem("accessToken");
  dispatch({ type: types.LOGOUT, payload: null });
};

const authActions = {
  loginRequest,
  register,
  loginFacebook,
  loginGoogle,
  getCurrentUser,
  logout,
};
export default authActions;
