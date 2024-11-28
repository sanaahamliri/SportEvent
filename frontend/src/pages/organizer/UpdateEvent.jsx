import React, { useState, useEffect } from "react"; 
import { useNavigate, useParams } from "react-router-dom"; 
import { updateEvent } from "../../services/eventService";
import { getEventById } from "../../services/eventService";  

const EventUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    event_name: "",
    date: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await getEventById(id, token); 
        setFormData(response);
      } catch (error) {
        console.error("Error fetching event", error);
        setMessage("Failed to fetch event details");
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await updateEvent(id, formData, token);
      setMessage("Event updated successfully!");
      navigate("/organizer/Home");
    } catch (error) {
      console.error("Error updating event", error);
      setMessage("Failed to update event");
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full w-full bg-cover bg-center bg-gray-700">
        <div className="flex flex-col items-center px-6 py-4 mx-auto lg:py-0">
          <div className="lg:mt-10 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white">
                Update Event
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="event_name"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="event_name"
                    placeholder="Event Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    name="event_name"
                    value={formData.event_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-8 md:ml-16 w-60 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600"
                >
                  Update
                </button>
              </form>
              {message && <p className="mt-4 text-green-600 font-bold">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventUpdate;
