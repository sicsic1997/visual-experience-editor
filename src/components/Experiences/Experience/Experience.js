import React from 'react';
import {Button, Card, Icon} from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Experience = ({ experience }) => {
    const history = useHistory();
    return (
        <div className="experience">
            <Card>
                <Card.Content>
                    <Card.Header>Experience name</Card.Header>
                    <Card.Meta>{`Url: www.google.ro`}</Card.Meta>
                    <Card.Description>
                        Daniel is a comedian living in Nashville.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra className="card__content">
                    <React.Fragment>
                        <a>
                            <Icon name='user' />
                            10 FEB
                        </a>
                        <div className="load__button">
                            <Button basic color='green' type="button" onClick={() => history.push('/workspace/numeee')}>
                                Load
                            </Button>
                        </div>
                    </React.Fragment>
                </Card.Content>
            </Card>
        </div>
    );
}

export default Experience;
