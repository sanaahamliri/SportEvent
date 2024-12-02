import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ParticipantList from "../Participants/ParticipantsList";
import Sidebar from "../Sidebar";
import ParticipantFormModal from "../Participants/CreateParticipant";
import withAuth from "../../../hooks/withAuth";
import swal from "sweetalert";
import participantService from "../../../services/ParticipantService";
import ParticipantUpdate from "./UpdateParticipants";
import useFetchParticipants from "../../../hooks/useFetchParticipants";

const Organizer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

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
          swal("Failed to delete participant. Please try again.", {
            icon: "error",
          });
        }
      }
    });
  };

  const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];

  if (loading) return <p>Loading participants...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="flex justify-start items-center">
        <Sidebar />
        <div className="bg-gray-100 min-h-screen w-full">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Welcome to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                  Sport Event Manager
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:text-2xl">
                Manage your sports events effectively!
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => navigate("/organizer/Home")}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 md:py-4 md:text-lg md:px-10"
                  >
                    Add Event
                  </button>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 md:py-4 md:text-lg md:px-10"
                  >
                    Add Participant
                  </button>
                </div>
              </div>
            </div>
            <div>
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
                              <td className="p-3 flex justify-center items-center gap-3">
                                <button
                                  onClick={() =>
                                    setSelectedParticipant(participant._id)
                                  }
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
              </div>{" "}
            </div>
          </main>
        </div>
      </div>
      <ParticipantFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={() => {
          revalidate();
        }}
      />
    </>
  );
};

export default withAuth(Organizer);
