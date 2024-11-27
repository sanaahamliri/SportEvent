import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Bg from "../../images/sports.jpg";

const EventUpdate = () => {
  // Initialiser la valeur de l'événement
  const initialEventState = {
    event_name: "",
    organizer: "",
    date: "",
    location: "",
  };

  // Définir les états pour l'événement et le message
  const [event, setEvent] = useState(initialEventState);
  const [message, setMessage] = useState("");

  // Récupérer l'ID depuis l'URL
  const { id } = useParams();

  // Données factices pour l'événement à mettre à jour
  useEffect(() => {
    const fakeEvent = {
      id,
      event_name: "Football Tournament",
      organizer: "John Doe",
      date: "2023-10-12",
      location: "Stadium A",
    };
    setEvent(fakeEvent);
  }, [id]);

  // Gestionnaire de changement pour les champs de saisie
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEvent({ ...event, [name]: value });
  };

  // Mettre à jour l'événement (pour l'instant, cette fonction affiche un message de succès)
  const updateEvent = () => {
    setMessage("Updated successfully!");
  };

  return (
    <>
      <div className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${Bg})` }}>
        <div className="flex flex-col items-center px-6 py-4 mx-auto md:h-screen lg:py-0">
          <div className="m-10 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-4 md:space-y-6 sm:p-8">
              {event ? (
                <div>
                  <div className="mb-4 text-xl font-bold text-black-600 md:text-2xl">
                    <h4>{event.event_name}</h4>
                  </div>
                  <form>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="event_name">
                        Event Name
                      </label>
                      <input
                        type="text"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="event_name"
                        name="event_name"
                        value={event.event_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="organizer">
                        Organizer
                      </label>
                      <input
                        type="text"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="organizer"
                        name="organizer"
                        value={event.organizer}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="date">
                        Date
                      </label>
                      <input
                        type="date"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="date"
                        name="date"
                        value={event.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="location">
                        Location
                      </label>
                      <input
                        type="text"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="location"
                        name="location"
                        value={event.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="md:ml-16 mt-8 w-60 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={updateEvent}
                  >
                    Update
                  </button>
                  <p className="mt-4 text-green-600 font-bold">{message}</p>

                  <Link to="/events" className="mt-4 font-md text-blue-600">
                    Back to Events Data
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventUpdate;
