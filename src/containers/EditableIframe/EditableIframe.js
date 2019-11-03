import React, { Component } from 'react';
import Attributes from "../../Attributes";
import { withRouter } from 'react-router-dom';
import {ExperienceLoader} from "../../services/ExperienceLoader";

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
                {experience && <Attributes/>}
            </div>
        );
    }
};

export default withRouter(EditableIframe);
