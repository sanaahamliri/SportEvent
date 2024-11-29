import React, { useState } from "react";
import swal from "sweetalert";
import participantService from "../../../services/ParticipantService";
import ParticipantUpdate from "./UpdateParticipants";
import useFetchParticipants from "../../../hooks/useFetchParticipants";
import withAuth from "../../../hooks/withAuth";

const ParticipantList = () => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const { participants, loading, error, revalidate } = useFetchParticipants();

  const handleDelete = async (participantId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, this action cannot be undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const token = localStorage.getItem("token");
          await participantService.deleteParticipant(participantId, token);
          revalidate();
          swal("Participant deleted successfully!", { icon: "success" });
        } catch (error) {
          console.error("Error deleting participant:", error);
          swal("Failed to delete participant. Please try again.", { icon: "error" });
        }
      }
    });
  };

  const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Event", accessor: "event.event_name" },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];

  if (loading) return <p>Loading participants...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6 flex flex-col">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <div className="my-4 ml-4 text-lg font-bold text-gray-800">
              Participants Data
            </div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.Header}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase"
                    >
                      {column.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {participants.map((participant) => (
                  <tr key={participant._id}>
                    <td className="p-3">{participant._id}</td>
                    <td className="p-3">{participant.name}</td>
                    <td className="p-3">{participant.email}</td>
                    <td className="p-3">{participant.event.event_name}</td>
                    <td className="p-3 flex justify-center items-center gap-3">
                      <button
                        onClick={() => setSelectedParticipant(participant._id)}
                        className="px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(participant._id)}
                        className="px-2 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedParticipant && (
        <ParticipantUpdate
          participantId={selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
          onUpdate={() => {
            revalidate();
          }}
        />
      )}
    </div>
  );
};

export default withAuth(ParticipantList);
