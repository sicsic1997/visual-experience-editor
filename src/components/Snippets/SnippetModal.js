import React, { PureComponent } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Dropdown,
  Input
} from "semantic-ui-react";
import { createSnippetWithAttributes } from "./createSnippet";
const stateOptions = [
  {
    key: "p",
    text: "p",
    value: "p"
  },
  {
    key: "img",
    text: "img",
    value: "img"
  },
  {
    key: "div",
    text: "div",
    value: "div"
  }
];

class SnippetPreview extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { attributes, tag, children } = this.props;
    const element = createSnippetWithAttributes(attributes, tag, children);
    return (
      <div
        style={{
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderStyle: "solid",
          borderWidth: "1px",
          marginRight: "8px"
        }}
      >
        {tag ? element : "Preview object"}
      </div>
    );
  }
}

class SnippetModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      attributes: {},
      children: null,
      open: false
    };
  }

  onChangeOption = (_, data) => {
    const attributes = {};
    let children = null;
    switch (data.value) {
      case "p":
        children = "";
        break;
      case "img":
        attributes["src"] = "";
        break;
      default:
        attributes["innerHTML"] = "";
        break;
    }

    this.setState({
      value: data.value,
      attributes,
      children
    });
  };

  onChangeInput = (key, value) => {
    this.setState(prevState => {
      const attributes = prevState.attributes;
      attributes[key] = value;
      return {
        attributes: { ...prevState.attributes, ...attributes }
      };
    });
  };

  onChangeChildren = value => {
    this.setState({ children: value });
  };

  onHandleSave = () => {
    this.props.onHandleSave(
      createSnippetWithAttributes(
        this.state.attributes,
        this.state.tag,
        this.state.children
      )
    );
  };

  close = () => this.setState({ open: false });

  render() {
    return (
      <Modal
        trigger={this.props.modalButton}
        open={this.props.open}
        onClose={this.props.onModalClose}
      >
        <Modal.Header>Create your snippet</Modal.Header>

        <Modal.Content>
          <div style={{ display: "flex" }}>
            <SnippetPreview
              attributes={this.state.attributes}
              tag={this.state.value}
              children={this.state.children}
            />
            <Modal.Description>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Dropdown
                  placeholder="State"
                  search
                  selection
                  options={stateOptions}
                  onChange={this.onChangeOption}
                />
                {Object.keys(this.state.attributes).map(key => {
                  return (
                    <Input
                      key={key}
                      label={key}
                      onChange={(_, data) =>
                        this.onChangeInput(key, data.value)
                      }
                      style={{ marginTop: "10px" }}
                    />
                  );
                })}
                {this.state.children !== null ? (
                  <Input
                    label={"children"}
                    onChange={(_, data) => this.onChangeChildren(data.value)}
                    style={{ marginTop: "10px" }}
                  />
                ) : null}
              </div>
              {this.state.value ? (
                <Button.Group style={{ marginTop: "35px" }}>
                  <Button
                    onClick={() => {
                      this.props.onModalClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button.Or />
                  <Button
                    positive
                    type="submit"
                    onClick={() => {
                      this.onHandleSave();
                      this.props.onModalClose();
                    }}
                  >
                    Save
                  </Button>
                </Button.Group>
              ) : null}
            </Modal.Description>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SnippetModal;
