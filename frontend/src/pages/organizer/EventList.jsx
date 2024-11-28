import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import swal from "sweetalert";
import eventService from "../../services/eventService";

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }
      try {
        const eventsData = await eventService.getAllEvents(token);
        setEvents(eventsData);
      } catch (error) {
        setError("Failed to fetch events. Please try again later.");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleUpdate = (eventId) => {
    navigate("/organizer/update/" + eventId);
  };

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
          setEvents(events.filter((event) => event._id !== eventId));
          swal("Event deleted successfully!", { icon: "success" });
        } catch (error) {
          console.error("Error deleting event:", error);
          swal("Failed to delete event. Please try again.", { icon: "error" });
        }
      }
    });
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
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdate(eventId)}
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
            </div>
          );
        },
      },
    ],
    [events]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: events });

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
            <table
              className="min-w-full divide-y divide-gray-300"
              {...getTableProps()}
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EventList;
