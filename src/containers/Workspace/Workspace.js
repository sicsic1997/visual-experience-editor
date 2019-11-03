import React, { Component } from 'react';
import {ExperienceLoader} from "../../services/ExperienceLoader";
import Experience from "../../components/Experiences/Experience/Experience";
import Experiences from "../../components/Experiences/Experiences";
import DataManager from '../../model/DataManager';

class Workspace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            experiences: []
        }
    }

    async componentDidMount() {
        await DataManager.getInstance().fetchDataManagerCachedData();
        var experiences = DataManager.getInstance()._experiences;
        if(experiences == null) {
            experiences = [];
        }

        this.setState({
            experiences
        })
    }

    render() {
        const { experiences } = this.state;
        console.log(experiences);
        return <Experiences experiences={experiences} />;
    }
}

export default Workspace;
