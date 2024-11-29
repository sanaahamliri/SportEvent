import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const PrintParticipants = () => {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/participants/event/${eventId}`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants", error);
      }
    };
    fetchParticipants();
  }, [eventId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-5">
        <h1 className="text-3xl font-bold">Participants List for Event {eventId}</h1>
        <table className="min-w-full divide-y divide-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Event</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {participants.map((participant) => (
              <tr key={participant._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.event.event_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handlePrint}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Print List
        </button>
      </div>
    </div>
  );
};

export default PrintParticipants;
