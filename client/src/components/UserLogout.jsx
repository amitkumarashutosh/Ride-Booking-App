import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }, [navigate]);

  return <div>User logout</div>;
};

export default UserLogout;
