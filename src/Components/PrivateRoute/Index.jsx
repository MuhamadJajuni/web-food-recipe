import propTypes from "prop-types";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.warning("You have to login first!", {
        position: "top-center",
        toastId: "1",
      });
    }
  }, [token]);
  if (token) {
    return children;
  } else {
    return <Navigate to="/register" />;
  }
};
PrivateRoute.propTypes = {
  children: propTypes.element,
};

export default PrivateRoute;
