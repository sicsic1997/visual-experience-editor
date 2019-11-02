import React, { PureComponent } from "react";
import Iframe from "react-iframe";
import { extractUsefulAttributes } from "./IFrameParser/Parser.js";
import AttributesPanel from "./AttributesPanel.js";
import "./App.css";

const siteUrl = "http://localhost:3001/";

class Attributes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      attributes: {}
    };
  }

  componentDidMount() {
    window.addEventListener("message", e => {
      console.log("From cient: ", e.data);
      if (e.data)
      const attributes = extractUsefulAttributes(e.data.tagName, e.data);
      this.setState({ attributes });
    });
  }

  onChangeAttribute = (key, value) => {
    const { attributes } = this.state;
    attributes[key] = value;
    this.setState({ attributes });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ display: "inline-block" }}>
            <div>
              <button
                type="button"
                onClick={() => {
                  console.log(this.state.attributes);
                }}
              />
              <AttributesPanel
                attributes={this.state.attributes}
                onChangeAttribute={this.onChangeAttribute}
              />
              <Iframe id="id1" url={siteUrl} height="1000" width="1000" />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Attributes;
