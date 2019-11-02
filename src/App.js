import React from "react";
import "./App.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Experience from "./containers/Experience/Experience";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/experience">About</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/experience">
              <Experience />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
