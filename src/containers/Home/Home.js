import React, { Component } from "react";
import Projects from "../../components/Projects/Projects";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };
  }

  async componentDidMount() {
    // TODO;
    const projects = [];

    this.setState({
      projects
    });
  }

  onAddNewProject = project => {
    this.setState({ projects: [...this.state.projects, project] });
  };

  render() {
    const { projects } = this.state;
    return (
      <Projects projects={projects} onAddNewProject={this.onAddNewProject} />
    );
  }
}

export default Home;
