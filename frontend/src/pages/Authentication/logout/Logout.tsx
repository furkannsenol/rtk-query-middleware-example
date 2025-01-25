import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authUser");
    navigate("/login");
  }, [navigate]);

  return <div>Exiting...</div>;
};

export default Logout;
