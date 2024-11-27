import { React, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import swal from "sweetalert";

const EventList = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fakeEvents = [
      { id: 1, event_name: "Football Tournament", organizer: "John Doe", date: "2023-10-12", location: "Stadium A" },
      { id: 2, event_name: "Basketball Championship", organizer: "Jane Smith", date: "2023-11-20", location: "Arena B" },
      { id: 3, event_name: "Marathon", organizer: "Michael Johnson", date: "2023-09-15", location: "City Park" },
    ];
    setEvents(fakeEvents);
  }, []);

  const updateEvent = async (eventId) => {
    navigate("/update/" + eventId);
  };

  const deleteEvent = async (eventId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, this action cannot be undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setEvents(events.filter(event => event.id !== eventId));
        swal("Event deleted successfully!", {
          icon: "success",
        });
      } else {
        swal("Your event is safe!");
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Event Name",
        accessor: "event_name",
      },
      {
        Header: "Organizer",
        accessor: "organizer",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
          const eventId = row.original.id;
          return (
            <div>
              <button
                type="button"
                className="mr-2 px-3 py-2.5 bg-blue-400 text-white font-medium text-xs uppercase rounded-full hover:bg-blue-500 hover:shadow-lg active:bg-blue-600 active:shadow-lg"
                onClick={() => updateEvent(eventId)}
              >
                Edit
              </button>
              <button
                type="button"
                className="px-3 py-2.5 bg-red-600 text-white font-medium text-xs uppercase rounded-full hover:bg-red-700 hover:shadow-lg active:bg-red-700 active:shadow-lg"
                onClick={() => deleteEvent(eventId)}
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: events,
  });

  return (
    <>
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="my-4 ml-4 text-medium font-bold text-slate-800 uppercase ">
                Events Data
              </div>
              <table
                className="min-w-full divide-y divide-gray-300"
                {...getTableProps()}
              >
                <thead className="bg-gray-50">
                  {
                    headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                          headerGroup.headers.map((column) => (
                            <th
                              className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase "
                              {...column.getHeaderProps()}
                            >
                              {column.render("Header")}
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {
                    rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className="divide-x divide-gray-100"
                        >
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventList;
