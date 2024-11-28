import { useEffect, useState, useCallback } from "react";
import eventService from "../services/eventService";

export default function useFetchEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const eventsData = await eventService.getAllEvents(token);
      setEvents(eventsData);
      console.log("refrech");
    } catch (err) {
      setError("Failed to fetch events. Please try again later.");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const revalidate = () => {
    fetchEvents();
  };

  return {
    events,
    loading,
    error,
    revalidate,
  };
}
