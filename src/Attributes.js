import React, { PureComponent } from "react";
import Iframe from "react-iframe";
import { extractUsefulAttributes } from "./IFrameParser/AttributeExtractor.js";
import AttributesPanel from "./AttributesPanel.js";
import "./App.css";

const siteUrl = "http://localhost:3001/";

class Attributes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      attributes: {}
    };
  }

  componentDidMount() {
    window.addEventListener("message", e => {
      if (e.data.path !== undefined) {
        const attributes = extractUsefulAttributes(e.data.tagName, e.data);
        this.setState({ attributes, path: e.data.path });
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

  postAttributes = () => {
    const { path, attributes } = this.state;
    const iframe = document.getElementById("id1");
    console.log(path, attributes);
    iframe.contentWindow.postMessage({ path, attributes }, "*");
    this.setState({
      attributes: {}
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ display: "inline-block" }}>
            <div>
              <AttributesPanel
                attributes={this.state.attributes}
                onChangeAttribute={this.onChangeAttribute}
              />
              <button type="button" onClick={this.postAttributes}>
                Save
              </button>
              <Iframe id="id1" url={siteUrl} height="1000" width="1000" />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Attributes;
