import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Organizer from "./pages/organizer/Home";
import Add from './pages/organizer/CreateEvent';
import Edit from "./pages/organizer/UpdateEvent";
import List from "./pages/organizer/EventList";
import OrHome from "./pages/organizer/Home";
import ParticipantsHome from "./pages/organizer/Participants/Home";
import PrintParticipants from "./pages/organizer/Participants/PrintParticipants";



const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/organizer" element={<Organizer />} />
      <Route path="/organizer/Home" element={<OrHome/>} />
      <Route path="/organizer/Add" element={<Add/>} />
      <Route path="/organizer/update/:id" element={<Edit />} />
      <Route path="/organizer/List" element={<List />} />
      <Route path="/organizer/Partcipants" element={<ParticipantsHome />} />
      <Route path="/print-participants/:eventId" element={<PrintParticipants />} />



    </Routes>
  </Router>
  
  );
};

export default App;
