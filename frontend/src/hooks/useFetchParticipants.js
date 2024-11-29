import { useEffect, useState } from 'react';
import participantService from '../services/ParticipantService';

const useFetchParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const revalidate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await participantService.getAllParticipants(token);
      setParticipants(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching participants", error);
      setError("Failed to fetch participants");
      setLoading(false);
    }
  };

  useEffect(() => {
    revalidate();
  }, []);

  return {
    participants,
    loading,
    error,
    revalidate,
  };
};

export default useFetchParticipants;
