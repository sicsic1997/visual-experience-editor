import React, { Component } from "react";
import { Button, Card, Icon, Input } from "semantic-ui-react";
import './projects.css'

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
    const { onLoadProject } = this.props;
    return (
      <div className="projects">
        <Card.Group className="projects__list">
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
                    onLoadProject(this.state.url);
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
