import React from 'react';
import {Button, Card, Icon} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import DataManager from '../../../model/DataManager';

const Experience = ({ experience }) => {
    const { _metadata } = experience;
    const history = useHistory();
    return (
        <div className="experience">
            <Card>
                <Card.Content>
                    <Card.Header>{_metadata["file-name"]}</Card.Header>
                    <Card.Meta>{_metadata["url"]}</Card.Meta>
                    <Card.Description>
                        {_metadata["description"]}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra className="card__content">
                    <React.Fragment>
                        <a>
                            <Icon name='user' />
                            10 FEB
                        </a>
                        <div className="load__button">
                            <Button basic color='green' type="button" onClick={() => {
                                DataManager.getInstance()._currentExperience = experience;
                                DataManager.getInstance().updateDataManagerCachedData();
                                history.push(`/workspace/experience/edit/${_metadata["file-name"]}`);
                            }}>
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
