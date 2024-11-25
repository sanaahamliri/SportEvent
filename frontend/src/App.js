import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/events" component={Events} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
