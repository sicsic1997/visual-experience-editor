import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Workflow from "../../components/Workflow/Workflow";
import { ExperienceLoader } from "../../services/ExperienceLoader";

class EditableIframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: null
    };
  }

  async componentDidMount() {
    let {
      match: {
        params: { fileName }
      }
    } = this.props;
    const experience = await ExperienceLoader.getExperienceByFileName(fileName);
    console.log(experience);
    this.setState({ experience });
  }

    render() {
        const { experience } = this.state;
        return (
            <div>
                {experience && <Workflow experience={this.state.experience} />}
            </div>
        );
    }
};

export default withRouter(EditableIframe);
