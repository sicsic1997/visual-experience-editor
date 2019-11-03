import React, { Component } from "react";
import Projects from "../../components/Projects/Projects";
import DataManager from "../../model/DataManager";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import SnippetModal from "../../components/Snippets/SnippetModal";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };
  }

  onLoadProject = async project => {
    await DataManager.getInstance().getExperiencesAsync(project);
    this.props.history.push("/workspace");
  };

  render() {
    const { projects } = this.state;
    return (
      <div>
        <Projects projects={projects} onLoadProject={this.onLoadProject} />
      </div>
    );
  }
}

export default withRouter(Home);
