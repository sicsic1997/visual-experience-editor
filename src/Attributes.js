import React, { PureComponent } from "react";
import Iframe from "react-iframe";
import { extractUsefulAttributes } from "./components/IFrameParser/Parser.js";
import AttributesPanel from "./AttributesPanel.js";
import "./App.css";
import { Change } from "./model/Change.js";

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

  sendChangeToTargetApp = (change) => {
    console.log(change)
    const iframe = document.getElementById("id1");
    iframe.contentWindow.postMessage({ change }, "*");

    if(change._change_type == "edit") {
      // clear attributes
      this.setState({
        attributes: {}
      });
    }
  }

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
              <button type="button" onClick={()=>{
                var change = new Change(Change.CHANGE_TYPES.EDIT, this.state.path, { "attributes": this.state.attributes })
                this.sendChangeToTargetApp(change);
              }}>
                Save
              </button>
              <button type="button" onClick={()=>{
                var change = new Change(Change.CHANGE_TYPES.REMOVE, this.state.path, {})
                this.sendChangeToTargetApp(change);
              }}>
                Remove
              </button>
              {this.state.tag === "DIV" ? (
                <div>
                  <button
                    type="button"
                    onClick={()=>{
                      var change = new Change(Change.CHANGE_TYPES.ADD, this.state.path, { "inner-html": innerHTML })
                      this.sendChangeToTargetApp(change);
                    }}
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
