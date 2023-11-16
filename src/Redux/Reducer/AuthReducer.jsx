const initialState = {
    data: null,
    message: "",
    isLoading: false,
    isError: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "AUTH_LOGIN_PENDING":
      case "AUTH_REGISTER_PENDING":
      case "AUTH_UPDATE_PENDING":
      case "GET_PROFILE_PENDING":
        return {
          ...state,
          isLoading: true,
        };
      case "AUTH_LOGIN_SUCCESS":
      case "AUTH_REGISTER_SUCCESS":
      case "AUTH_UPDATE_SUCCESS":
      case "GET_PROFILE_SUCCESS":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          message: "",
          isError: false,
        };
      case "AUTH_LOGIN_FAILED":
      case "AUTH_REGISTER_FAILED":
      case "AUTH_UPDATE_FAILED":
      case "GET_PROFILE_FAILED":
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
  
  export default authReducer;
  