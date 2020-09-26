import api from "../utils/api";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
} from "./types";

// 회원가입
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/user/register", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(err.msg, "danger"));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
