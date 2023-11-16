const initialState = {
    isLoading: false,
    isError: false,
    message: "",
    recipe: null,
  };
  
  const myProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_MYRECIPE_PENDING":
        return { ...state, isLoading: true, isError: false, message: "" };
      case "GET_MYRECIPE_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          message: "",
          recipe: action.payload.recipe,
        };
      case "GET_MYRECIPE_FAILED":
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: action.payload,
          recipe: null,
        };
      default:
        return state;
    }
  };
  
  export default myProductReducer;
  