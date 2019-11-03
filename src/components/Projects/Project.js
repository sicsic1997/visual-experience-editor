import React from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Project = ({ project }) => {
  const history = useHistory();
  return (
    <div className="project">
      <Card>
        <Card.Content>
          <Card.Header>Project name</Card.Header>
          <Card.Meta>{`Url:` + project}</Card.Meta>
          <Card.Description>
            Daniel is a comedian living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra className="card__content">
          <React.Fragment>
            <a>
              <Icon name="user" />
              10 FEB
            </a>
            <div className="load__button">
              <Button
                basic
                color="green"
                type="button"
                onClick={() => history.push("/workspace/numeee")}
              >
                Load
              </Button>
            </div>
          </React.Fragment>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Project;
