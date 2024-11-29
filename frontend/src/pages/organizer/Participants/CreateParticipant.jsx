import React, { useState, useEffect } from "react";
import axios from "axios";
import participantService from "../../../services/ParticipantService";

const ParticipantFormModal = ({ isOpen, onClose }) => {
  const initialFormState = {
    name: "",
    email: "",
    event: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("http://localhost:5000/api/events", config);
        console.log("Events data:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to create a participant.");
      return;
    }

    try {
      const newParticipant = await participantService.createParticipant(formData, token);
      console.log("New Participant Created:", newParticipant);
      setFormData(initialFormState);
      onClose();
    } catch (error) {
      console.error("Error creating participant:", error);
      alert("Failed to create participant.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Participant</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="event"
            >
              Event
            </label>
            <select
              id="event"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              name="event"
              value={formData.event}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Event</option>
              {events.map(event => (
                <option key={event._id} value={event._id}>
                  {event.event_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantFormModal;
