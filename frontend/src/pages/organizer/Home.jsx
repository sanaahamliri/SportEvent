import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Sport Event Manager
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:text-2xl">
            Manage your sports events effectively!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={() => navigate("/events")}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 md:py-4 md:text-lg md:px-10"
              >
                View Events
              </button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <button
                onClick={() => navigate("/events/add")}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 md:py-4 md:text-lg md:px-10"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t-2 border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-gray-500">
            &copy; 2023 Sport Event Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Organizer;