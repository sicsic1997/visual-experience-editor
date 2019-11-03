import React, { PureComponent } from "react";
import Iframe from "react-iframe";
import { extractUsefulAttributes } from "../IFrameParser/AttributeExtractor.js";
import AttributesPanel from "../Attributes/AttributesPanel.js";
import { Change } from "../../model/Change";

import "./workflow.css";
import { Button, Divider } from "semantic-ui-react";
import { loadExperienceInIFrame } from "../../utils/IFrameUtils";
import DataManager from "../../model/DataManager.js";
import SnippetModal from "../Snippets/SnippetModal.js";

const siteUrl = "http://localhost:3001/";

class Workflow extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      attributes: {},
      tag: "",
      modalOpen: false
    };
  }

  async componentDidMount() {
    const iframe = document.getElementById("id1");
    loadExperienceInIFrame(this.props.experience, iframe);
    window.addEventListener("message", this.getMessageFromIFrame);
    await DataManager.getInstance().fetchDataManagerCachedData();
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.getMessageFromIFrame);
  }

  getMessageFromIFrame = e => {
    if (e.data.path !== undefined) {
      const attributes = extractUsefulAttributes(e.data.tagName, e.data);
      this.setState({ attributes, path: e.data.path, tag: e.data.tagName });
    }
  };

  onChangeAttribute = (key, value, isStyle) => {
    const { attributes } = this.state;
    if (isStyle) {
      attributes.style[key] = value;
    } else {
      attributes[key] = value;
    }
    this.setState({ attributes });
  };

  sendChangeToTargetApp = change => {
    const iframe = document.getElementById("id1");
    iframe.contentWindow.postMessage({ change }, "*");

    if (change._change_type == "edit") {
      // clear attributes
      this.setState({
        attributes: {}
      });
    }
  };

  handleSave = async () => {
      const change = new Change(
          Change.CHANGE_TYPES.EDIT,
          this.state.path,
          { attributes: this.state.attributes }
      );
      console.log(this.state.attributes);
      this.sendChangeToTargetApp(change);
      try {
        await DataManager.getInstance().fetchDataManagerCachedData();
        DataManager.getInstance()._currentExperience.addChange(change);
        DataManager.getInstance().updateDataManagerCachedData();
      } catch(error) {}
  };

  handleRemove = async () => {
    const change = new Change(Change.CHANGE_TYPES.REMOVE, this.state.path, {});
    this.sendChangeToTargetApp(change);
    try {
      await DataManager.getInstance().fetchDataManagerCachedData();
      DataManager.getInstance()._currentExperience.addChange(change);
      DataManager.getInstance().updateDataManagerCachedData();
    } catch(error) {}
  };

  handleAdd = async () => {
    const innerHTML = document.getElementById("modal_obj").innerHTML;
    const change = new Change(Change.CHANGE_TYPES.ADD, this.state.path, {
      "inner-html": innerHTML
    });
    try {
      this.sendChangeToTargetApp(change);
      await DataManager.getInstance().fetchDataManagerCachedData();
      DataManager.getInstance()._currentExperience.addChange(change);
      DataManager.getInstance().updateDataManagerCachedData();
    } catch(error) {}
  };

  onModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { attributes } = this.state;
    return (
        <div className="workflow">
            <Iframe className="workflow__iframe" id="id1" url={siteUrl} height="1000" width="1000" />
            <AttributesPanel
                className="workflow__tools"
                attributes={this.state.attributes}
                onChangeAttribute={this.onChangeAttribute}
                onAttributeAdded={this.handleSave}
            >
                <div className="workflow__actions">
                    <Divider horizontal>Actions</Divider>
                    <div className="workflow__actions-group">
                        <Button
                            className="workflow__actions--save"
                            icon="save outline"
                            type="button"
                            onClick={this.handleSave}
                            disabled={!attributes || !Object.keys(attributes).length}
                        />
                        <SnippetModal
                            onHandleSave={this.handleAdd}
                            modalButton={
                                <Button
                                    className="workflow__actions--add"
                                    icon="plus"
                                    type="button"
                                    onClick={() => this.setState({ modalOpen: true })}
                                    disabled={this.state.tag !== "DIV"}
                                />
                            }
                            open={this.state.modalOpen}
                            onModalClose={this.onModalClose}
                        />
                        <Button
                            className="workflow__actions--remove"
                            icon="trash alternate outline"
                            type="button"
                            onClick={this.handleRemove}
                            disabled={!attributes || !Object.keys(attributes).length}
                        />
                    </div>
                </div>
            </AttributesPanel>
        </div>
    );
  }
}

export default Workflow;
