import React, { PureComponent } from "react";
import Iframe from "react-iframe";
import { extractUsefulAttributes } from "./components/IFrameParser/Parser.js";
import AttributesPanel from "./AttributesPanel.js";
import "./App.css";

const siteUrl = "http://localhost:3001/";

class Attributes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      attributes: {},
      tag: ""
    };
  }

  componentDidMount() {
    window.addEventListener("message", e => {
      if (e.data.path !== undefined) {
        const attributes = extractUsefulAttributes(e.data.tagName, e.data);
        this.setState({ attributes, path: e.data.path, tag: e.data.tagName });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("message");
  }

  onChangeAttribute = (key, value) => {
    const { attributes } = this.state;
    attributes[key] = value;
    this.setState({ attributes });
  };

  editElement = () => {
    const { path, attributes } = this.state;
    const iframe = document.getElementById("id1");
    const action = "edit";
    iframe.contentWindow.postMessage({ path, attributes, action }, "*");

    // clear attributes
    this.setState({
      attributes: {}
    });
  };

  addNewElement = innerHTML => {
    const iframe = document.getElementById("id1");
    const action = "add";
    iframe.contentWindow.postMessage({ action, innerHTML }, "*");
  };

  removeElement = () => {
    const { path } = this.state;
    const iframe = document.getElementById("id1");
    const action = "remove";
    iframe.contentWindow.postMessage({ action, path }, "*");
  };

  render() {
    const innerHTML = "<p>Test</p>";
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ display: "inline-block" }}>
            <div>
              <AttributesPanel
                attributes={this.state.attributes}
                onChangeAttribute={this.onChangeAttribute}
              />
              <button type="button" onClick={this.editElement}>
                Save
              </button>
              <button type="button" onClick={this.removeElement}>
                Remove
              </button>
              {this.state.tag === "DIV" ? (
                <div>
                  <button
                    type="button"
                    onClick={() => this.addNewElement(innerHTML)}
                  >
                    Add
                  </button>
                </div>
              ) : null}
              <Iframe id="id1" url={siteUrl} height="1000" width="1000" />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Attributes;
