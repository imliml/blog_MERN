import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// user Register
export const register = ({ name, email, password, password2 }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, password2 });

  try {
    const res = await axios.post("/user/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
      // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    console.log(err.response);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// user Login
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/user/login", body, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      dispatch(setAlert(errors.email, "danger"));
      // errors.forEach((error) => dispatch(setAlert(errors, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/user/current");
    console.log("dafsadsfsdasdasdaffdsaasdf", res);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// export const loadUser = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get("/user/current");
//     console.log(res.data);
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };
