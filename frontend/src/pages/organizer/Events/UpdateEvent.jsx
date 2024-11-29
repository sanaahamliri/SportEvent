import React, { useState, useEffect } from "react"; 
import { updateEvent, getEventById } from "../../services/eventService";  

const EventUpdate = ({ eventId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    event_name: "",
    date: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User not authenticated.");
        return;
      }

      try {
        const response = await getEventById(eventId, token); 
        setFormData(response);
      } catch (error) {
        console.error("Error fetching event", error);
        setMessage("Failed to fetch event details");
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated.");
      return;
    }

    try {
      await updateEvent(eventId, formData, token);
      setMessage("Event updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating event", error);
      setMessage("Failed to update event");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="event_name" className="block text-sm font-medium">
              Event Name
            </label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              value={formData.event_name}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded-lg p-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="date" className="block text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded-lg p-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded-lg p-2"
            />
          </div>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EventUpdate;
