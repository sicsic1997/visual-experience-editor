import React, { Component } from "react";
import {Button, Divider, Header, Input} from "semantic-ui-react";
let idx = 1;
const AttributesList = ({ attributes, onChange, isStyle }) => (
    Object.keys(attributes).map(key => (
        <Input
            key={++idx}
            label={`${key}:`}
            defaultValue={attributes[key]}
            name={key}
            onChange={(_, data) => onChange(_, data, key, isStyle)}
        />
    )));

const AttributesLists = ({ attributes: { style, ...rest }, onChange }) => (
    <div className="workflow__panel-tools">
        <div className="workflow__panel-tools--main">
            <Divider horizontal>Basic Attributes</Divider>
            <AttributesList attributes={rest}   onChange={onChange} />
        </div>
        <div className="workflow__panel-tools--style">
            <Divider horizontal>Styles</Divider>
            <AttributesList attributes={style} onChange={onChange} isStyle={true} />
        </div>
    </div>
);

class AttributesPanel extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (_, data, key, isStyle) => {
    this.props.onChangeAttribute(key, data.value, isStyle);
  };

  render() {
    const { attributes, className, children } = this.props;
    return (
      <div className={className}>
        {children}
        {attributes && Object.keys(attributes).length
          ? <AttributesLists attributes={attributes} onChange={this.onChange} />
          : null}
        <div className="workflow__actions workflow__actions-bottom">
            <Button
                className="workflow__actions--publish"
                type="button"
                onClick={() => {}}
            >
                Publish
            </Button>
        </div>
      </div>
    );
  }
}

export default AttributesPanel;
