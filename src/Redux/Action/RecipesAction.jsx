import axios from "axios";
import { toast } from "react-toastify";

export const addRecipe = (data, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: "POST_RECIPE_PENDING" });
    const result = await axios.post(
      import.meta.env.VITE_REACT_BACKEND_URL + `/postRecipe`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ payload: result.data, type: "POST_RECIPE_SUCCESS" });
    toast.success("Add Recipe Succcesfully");
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response.data.message,
      type: "POST_RECIPE_FAILED",
    });
    toast.error(error.response.data.message);
  }
};

export const updateRecipe = (data, id, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: "UPDATE_RECIPE_PENDING" });
    const result = await axios.put(
      import.meta.env.VITE_REACT_BACKEND_URL + `/updateRecipe/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(result);
    dispatch({ payload: result.data, type: "UPDATE_RECIPE_SUCCESS" });
    toast.success("Update Recipe Successfully");
    setTimeout(() => {
      navigate("/detail_profile");
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response.data.message,
      type: "UPDATE_RECIPE_FAILED",
    });
    toast.error(error.response.data.message);
  }
};

export const detailRecipe = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: "GET_DETAIL_PENDING" });
    const result = await axios.get(
      import.meta.env.VITE_REACT_BACKEND_URL + `/recipe/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    dispatch({ payload: result.data, type: "GET_DETAIL_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response.data.message,
      type: "GET_DETAIL_FAILED",
    });
    toast.error(error.response.data.message);
  }
};

export const getMyRecipe = (page) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: "GET_MYRECIPE_PENDING" });
    const result = await axios.get(
      import.meta.env.VITE_REACT_BACKEND_URL + `/myRecipe`,
      {
        params: {
          limit: 5,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "GET_MYRECIPE_SUCCESS",
      payload: {
        recipe: result.data,
      },
    });
    toast.success("Get My Recipe Successfully");
    return result;
  } catch (error) {
    dispatch({
      payload: error.response.data.message,
      type: "GET_MYRECIPE_FAILED",
    });
    toast.error(error.response.data.message);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_PENDING" });
    const token = localStorage.getItem("token");
    await axios.delete(
      import.meta.env.VITE_REACT_BACKEND_URL + `/deleterecipe/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await dispatch(getMyRecipe());
    dispatch({ type: "DELETE_RECIPE_SUCCESS" });
    toast.success("Delete Recipe Successfully");
  } catch (error) {
    dispatch({
      payload: error.response.data.message,
      type: "DELETE_RECIPE_FAILED",
    });
    toast.error(error.response.data.message);
  }
};
