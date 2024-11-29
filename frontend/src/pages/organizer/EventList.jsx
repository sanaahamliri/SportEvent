import React, { useState, useMemo } from "react";
import swal from "sweetalert";
import eventService from "../../services/eventService";
import EventUpdate from "../organizer/UpdateEvent";
import useFetchEvents from "../../hooks/useFetchEvents";
import PrintParticipantsModal from "../organizer/Participants/PrintParticipants";

const EventList = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printEventId, setPrintEventId] = useState(null);
  const [printEventName, setPrintEventName] = useState("");
  const { events, loading, error, revalidate } = useFetchEvents();

  const handleDelete = async (eventId) => {
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
          await eventService.deleteEvent(eventId, token);
          revalidate();
          swal("Event deleted successfully!", { icon: "success" });
        } catch (error) {
          console.error("Error deleting event:", error);
          swal("Failed to delete event. Please try again.", { icon: "error" });
        }
      }
    });
  };

  const handlePrintParticipants = (eventId, eventName) => {
    setPrintEventId(eventId);
    setPrintEventName(eventName);
    setShowPrintModal(true);
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Event Name", accessor: "event_name" },
      { Header: "Date", accessor: "date" },
      { Header: "Location", accessor: "location" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => {
          const eventId = row.original._id;
          const eventName = row.original.event_name;
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedEvent(eventId)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(eventId)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handlePrintParticipants(eventId, eventName)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Print Participants
              </button>
            </div>
          );
        },
      },
    ],
    [events]
  );

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6 flex flex-col">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <div className="my-4 ml-4 text-lg font-bold text-gray-800">
              Events Data
            </div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                {columns.map((column) => (
                  <th
                    key={column.Header}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase"
                  >
                    {column.Header}
                  </th>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event._id}>
                    <td className=" p-3">{event._id}</td>
                    <td className=" p-3">{event.event_name}</td>
                    <td className=" p-3">{event.date}</td>
                    <td className=" p-3">{event.location}</td>
                    <td className=" p-3 flex justify-center items-center gap-3">
                      <button
                        onClick={() => setSelectedEvent(event._id)}
                        className="px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="px-2 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handlePrintParticipants(event._id, event.event_name)}
                        className="px-2 py-1 bg-green-600 text-white rounded"
                      >
                        Print Participants
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedEvent && (
        <EventUpdate
          eventId={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={() => {
            revalidate();
          }}
        />
      )}
      {showPrintModal && (
        <PrintParticipantsModal
          isOpen={showPrintModal}
          onClose={() => setShowPrintModal(false)}
          eventId={printEventId}
          eventName={printEventName}
        />
      )}
    </div>
  );
};

export default EventList;
