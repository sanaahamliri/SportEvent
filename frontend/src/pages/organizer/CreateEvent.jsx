import React, { useState } from "react";
import { createEvent } from "../../services/eventService";
import useFetchEvents from "../../hooks/useFetchEvents";
import { useNavigate } from "react-router-dom";
import withAuth from "../../hooks/withAuth";

const EventFormModal = ({ isOpen, onClose }) => {
  const initialFormState = {
    event_name: "",
    date: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const { revalidate , setEvents } = useFetchEvents();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to create an event.");
      return;
    }

    try {
      const newEvent = await createEvent(formData, token);
      console.log(newEvent)
      setEvents((prev) => [newEvent , ...prev])
      console.log("New Event Created:", newEvent);

   
      setFormData(initialFormState);
      onClose();
      // revalidate();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="event_name"
            >
              Event Name
            </label>
            <input
              type="text"
              id="event_name"
              placeholder="Event Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              name="event_name"
              value={formData.event_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Location"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
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

export default withAuth(EventFormModal);
