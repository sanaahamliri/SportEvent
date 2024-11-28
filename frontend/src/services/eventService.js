import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, eventData, config);
  return response.data;
};

export const getAllEvents = async (token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const updateEvent = async (id, eventData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, eventData, config);
  return response.data;
};

export const deleteEvent = async (id, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const eventService = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};

export default eventService;
