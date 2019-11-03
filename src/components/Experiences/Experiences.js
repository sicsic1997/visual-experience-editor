import React from 'react';
import {Button, Card} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

import Experience from "./Experience/Experience";
import './experiences.css';
import DataManager from '../../model/DataManager';
import ExperienceChangeSet from '../../model/ExperienceChangeSet';

const Experiences = ({ experiences }) => {
    const history = useHistory();
    return (
        <div className="experiences">
            <div className="experiences__header">
                <h1>Your experiences</h1>
            </div>
            <Card.Group className="experiences__list">
                {experiences.map(experience => <Experience experience={experience} />)}
                <Card className="experiences__dummy">
                    <Card.Content>
                        <Button type="button" content='Add new' icon='plus' onClick={() =>{ 
                            var newExperience = new ExperienceChangeSet({
                                url: DataManager.getInstance()._url,
                                description: "Dummy generated description"
                            });
                            DataManager.getInstance()._currentExperience = newExperience;
                            history.push('/workspace/experience/create')}}/>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
};

export default Experiences;
