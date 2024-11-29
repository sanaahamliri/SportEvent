import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // here we check if token exists in localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // if there is no token redirect tologic page
        navigate("/login");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
