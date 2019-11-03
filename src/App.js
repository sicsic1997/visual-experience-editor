import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Attributes from "./components/Attributes/Attributes";
import { Container } from "semantic-ui-react";
import AppMenu from "./components/AppMenu/AppMenu";
import Workspace from "./containers/Workspace/Workspace";
import EditableIframe from "./containers/EditableIframe/EditableIframe";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "" || window.location.pathname.substr(1)
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div className="App">
        <Container fluid>
          <Router>
            <div>
              <AppMenu
                activeItem={activeItem}
                handleItemClick={this.handleItemClick}
              />
              <Switch>
                <Route path="/workspace/experience/create">
                  <Attributes />
                </Route>
                <Route path="/workspace/experience/edit/:fileName">
                  <EditableIframe />
                </Route>
                <Route exact path="/workspace">
                  <Workspace />
                </Route>
                <Route path="/attributes">
                  <Attributes />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
