import React, { PureComponent } from "react";
import {Button, Divider, Header, Input} from "semantic-ui-react";
import DataManager from "../../model/DataManager";

const AttributesList = ({ attributes, onChange }) => (
    Object.keys(attributes).map(key => (
        <Input
            key={key}
            label={`${key}:`}
            defaultValue={attributes[key]}
            onChange={(_, data) => onChange(_, data, key)}
        />
    ))
);

const AttributesLists = ({ attributes: { style, ...rest }, onChange }) => (
    <div className="workflow__panel-tools">
        <div className="workflow__panel-tools--main">
            <Divider horizontal>Basic Attributes</Divider>
            <AttributesList attributes={rest}   onChange={onChange} />
        </div>
        <div className="workflow__panel-tools--style">
            <Divider horizontal>Styles</Divider>
            <AttributesList attributes={style} onChange={onChange}  />
        </div>
    </div>
);

class AttributesPanel extends PureComponent {
  constructor(props) {
    super(props);
  }

  onChange = (_, data, key) => {
    this.props.onChangeAttribute(key, data.value);
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
                onClick={() => {DataManager.getInstance().publishExperience()}}
            >
                Publish
            </Button>
        </div>
      </div>
    );
  }
}

export default AttributesPanel;
