import axios from "axios";

const API_URL = "http://localhost:5000/api/participants";

const createParticipant = async (participantData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, participantData, config);
  return response.data;
};

const getAllParticipants = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const getParticipantById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const getParticipantsByEventId = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/event/${eventId}`, config);
  return response.data;
};

const updateParticipant = async (id, participantData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${id}`, participantData, config);
    return response.data;
  } catch (error) {
    console.error("Error updating participant", error);
    throw error;
  }
};

const deleteParticipant = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const participantService = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  getParticipantsByEventId,
  updateParticipant,
  deleteParticipant,
};

export default participantService;
