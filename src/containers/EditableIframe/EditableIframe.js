import React, { Component } from 'react';
import Attributes from "../../components/Attributes/Attributes";
import { withRouter } from 'react-router-dom';
import {ExperienceLoader} from "../../services/ExperienceLoader";
import DataManager from '../../model/DataManager';

class EditableIframe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: null
        };
    }

    async componentDidMount() {
        let { match: { params: { fileName }}} = this.props;
        const experience = DataManager.getInstance()._currentExperience;
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
