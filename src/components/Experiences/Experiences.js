import React from 'react';
import {Button, Card} from 'semantic-ui-react';
import Experience from "./Experience/Experience";
import './experiences.css';

const Experiences = ({ experiences }) => (
    <div className="experiences">
        <div className="experiences__header">
            <h1>Your experiences</h1>
        </div>
        <Card.Group className="experiences__list">
            {experiences.map(experience => <Experience experience={experience} />)}
            <Card className="experiences__dummy">
                <Card.Content>
                    <Button type="button" content='Add new' icon='plus' />
                </Card.Content>
            </Card>
        </Card.Group>
    </div>
);

export default Experiences;
