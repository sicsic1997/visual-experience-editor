import React, { Component } from "react";
import { Button, Card, Icon, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import Project from "./Project";

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ""
    };
  }

  onChange = (_, data) => {
    this.setState({ url: data.value });
  };

  render() {
    const { projects, onAddNewProject } = this.props;
    return (
      <div className="projects">
        <div className="projects__header">
          <h1>Your projects</h1>
        </div>
        <Card.Group className="projects__list">
          {projects.map(project => (
            <Project key={project} project={project} />
          ))}
          <Card className="projects__dummy">
            <Card.Content>
              <Input
                placeholder="https://yourwebsitehere_please.com"
                onChange={this.onChange}
              />
              <Button
                type="button"
                animated
                onClick={() => {
                  if (this.state.url) {
                    onAddNewProject(this.state.url);
                    this.setState({ url: "" });
                  }
                }}
              >
                <Button.Content visible>Load project</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default Projects;
