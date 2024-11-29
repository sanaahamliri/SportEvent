import React, { useState, useEffect } from "react";
import axios from "axios";
import participantService from "../../../services/ParticipantService";

const ParticipantUpdate = ({ participantId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
  });
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchParticipant = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User not authenticated.");
        return;
      }

      try {
        const response = await participantService.getParticipantById(participantId, token);
        setFormData(response);
      } catch (error) {
        console.error("Error fetching participant", error);
        setMessage("Failed to fetch participant details");
      }
    };

    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/events", {
          headers: {
            "x-auth-token": token,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchParticipant();
    fetchEvents();
  }, [participantId]);

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
      await participantService.updateParticipant(participantId, formData, token);
      setMessage("Participant updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating participant", error);
      setMessage("Failed to update participant");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Participant</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded-lg p-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded-lg p-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="event" className="block text-sm font-medium">
              Event
            </label>
            <select
              id="event"
              name="event"
              value={formData.event}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded-lg p-2"
            >
              <option value="">Select Event</option>
              {events.map(event => (
                <option key={event._id} value={event._id}>
                  {event.event_name}
                </option>
              ))}
            </select>
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

export default ParticipantUpdate;
