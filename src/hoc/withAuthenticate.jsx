import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const withAuthenticate = (WrappedComponent) => {
  const authHOC = (props) => {
    const isAuth = useSelector((store) => store.authenticated.isAuthenticated);

    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    return <WrappedComponent {...props} />;
  };

  return authHOC;
};

export default withAuthenticate;
