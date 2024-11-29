import React, { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../../../hooks/withAuth";

const PrintParticipantsModal = ({ isOpen, onClose, eventId, eventName }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/participants/event/${eventId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants", error);
      }
    };
    fetchParticipants();
  }, [eventId, isOpen]);

  const handlePrint = () => {
    window.print();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Participants List for Event {eventName}</h2>
        <table className="min-w-full divide-y divide-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {participants.map((participant) => (
              <tr key={participant._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            onClick={handlePrint}
            className="mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print List
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(PrintParticipantsModal);
