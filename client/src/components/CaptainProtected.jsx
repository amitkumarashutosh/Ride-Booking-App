import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtected = ({ children }) => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/captain-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [navigate, setCaptain]);

  if (isLoading) return <div>Loading...</div>;

  return children;
};

export default CaptainProtected;
