const initialState = {
    data: null,
    message: "",
    isLoading: false,
    isError: false,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case "POST_RECIPE_PENDING":
      case "UPDATE_RECIPE_PENDING":
      case "GET_DETAIL_PENDING":
      case "DELETE_PRODUCT_PENDING":
        return {
          ...state,
          isLoading: true,
        };
      case "POST_RECIPE_SUCCESS":
      case "UPDATE_RECIPE_SUCCESS":
      case "GET_DETAIL_SUCCESS":
      case "DELETE_PRODUCT_SUCCESS":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          message: "",
          isError: false,
        };
      case "POST_RECIPE_FAILED":
      case "UPDATE_RECIPE_FAILED":
      case "GET_DETAIL_FAILED":
      case "DELETE_PRODUCT_FAILED":
        return {
          ...state,
          data: null,
          message: action.payload,
          isLoading: false,
          isError: true,
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  