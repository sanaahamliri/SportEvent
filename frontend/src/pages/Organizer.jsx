import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Organizer = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        } else {
          const response = await axios.get("http://localhost:5000/api/organizer", {
            headers: {
              "x-auth-token": token,
            },
          });
          setMessage(response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-5">
        <h1 className="text-3xl font-bold text-white">Organizer Dashboard</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Organizer;
