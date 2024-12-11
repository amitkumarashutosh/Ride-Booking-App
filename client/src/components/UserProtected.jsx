import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtected = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate, setUser]);

  if (isLoading) return <div>Loading...</div>;

  return children;
};

export default UserProtected;
