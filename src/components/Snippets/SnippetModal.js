import React, { PureComponent } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

class SnippetModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Modal trigger={this.props.modalButton}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
          />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SnippetModal;
