import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {ExperienceLoader} from "../../services/ExperienceLoader";
import Workflow from "../../components/Workflow/Workflow";

class EditableIframe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: null
        };
    }

    async componentDidMount() {
        let { match: { params: { fileName }}} = this.props;
        const experience = await ExperienceLoader.getExperienceByFileName(fileName);
        console.log(experience);
        this.setState({ experience });
    }

    render() {
        const { experience } = this.state;
        return (
            <div>
                {experience && <Workflow />}
            </div>
        );
    }
};

export default withRouter(EditableIframe);
