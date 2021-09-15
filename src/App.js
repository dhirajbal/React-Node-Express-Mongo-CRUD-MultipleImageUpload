import React from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./Table.css";
import {BrowserRouter as Router ,Switch,Route } from 'react-router-dom';
import Home from "./Home";
import NotFound from "./NotFound";
import Create from "./Create";
import Edit from "./Edit";
import View from "./View";

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
        { <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/create-user" component={Create} />
            <Route exact path="/edit-user/:id" component={Edit} />
            <Route exact path="/student-view/:id" component={View} />
            <Route component={NotFound} />
        </Switch> }
      </div>
  </Router>
    );
}


export default App;
