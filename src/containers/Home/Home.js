import React, { Component } from "react";
import Projects from "../../components/Projects/Projects";
import DataManager from "../../model/DataManager";
import { useHistory } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };
  }

  onLoadProject = async project => {
    await DataManager.getInstance().getExperiencesAsync(project);
    // const history = useHistory();
    // history.push("/workspace/experiences");
  };

  render() {
    const { projects } = this.state;
    return <Projects projects={projects} onLoadProject={this.onLoadProject} />;
  }
}

export default Home;
