import React, { Component } from 'react';
import {ExperienceLoader} from "../../services/ExperienceLoader";
import Experience from "../../components/Experiences/Experience/Experience";
import Experiences from "../../components/Experiences/Experiences";

class Workspace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            experiences: []
        }
    }

    async componentDidMount() {
        // TODO;
        const experiences = await ExperienceLoader.loadExperiences();

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


