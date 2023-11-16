import axios from "axios";
import { toast } from "react-toastify";

export const actionLogin = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_LOGIN_PENDING" });
    const result = await axios.post(
      import.meta.env.VITE_REACT_BACKEND_URL + `/login`,
      data
    );
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("id", result.data.dataUser.id);
    dispatch({ payload: result.data, type: "AUTH_LOGIN_SUCCESS" });
    toast.success("Login Successfully");
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response.data.message,
      type: "AUTH_LOGIN_FAILED",
    });
    toast.error(error.response.data.message);
  }
};

export const actionRegister = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REGISTER_PENDING" });
    const result = await axios.post(
      import.meta.env.VITE_REACT_BACKEND_URL + `/register`,
      data
    );
    console.log(result);
    dispatch({ payload: result.data, type: "AUTH_REGISTER_SUCCESS" });
    toast.success("Register Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response.data.message,
      type: "AUTH_LOGIN_FAILED",
    });
    toast.error(error.response.data.message);
  }
};

export const actionUpdate = (data, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: "AUTH_UPDATE_PENDING" });
    const result = await axios.put(
      import.meta.env.VITE_REACT_BACKEND_URL + `/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(result);
    dispatch({ payload: result.data, type: "AUTH_UPDATE_SUCCESS" });
    toast.success("Update Successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response?.data?.message,
      type: "AUTH_UPDATE_FAILED",
    });
    toast.error(error.response?.data?.message);
  }
};

export const getProfile = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: "GET_PROFILE_PENDING" });
    const result = await axios.get(
      import.meta.env.VITE_REACT_BACKEND_URL + `/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    dispatch({ payload: result.data, type: "GET_PROFILE_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response?.data?.message,
      type: "GET_PROFILE_FAILED",
    });
    toast.error(error.response?.data?.message);
  }
};
