import React, { PureComponent } from "react";
import {Divider, Header, Input} from "semantic-ui-react";

const AttributesList = ({ attributes }) => (
    Object.keys(attributes).map(key => (
        <Input
            key={key}
            label={`${key}:`}
            defaultValue={attributes[key]}
            onChange={(_, data) => this.onChange(_, data, key)}
        />
    ))
);

const AttributesLists = ({ attributes: { style, ...rest }}) => (
    <div className="workflow__panel-tools">
        <div className="workflow__panel-tools--main">
            <Divider horizontal>Basic Attributes</Divider>
            <AttributesList attributes={rest} />
        </div>
        <div className="workflow__panel-tools--style">
            <Divider horizontal>Styles</Divider>
            <AttributesList attributes={style} />
        </div>
    </div>
);

class AttributesPanel extends PureComponent {
  constructor(props) {
    super(props);
  }

  onChange = (_, data, key) => {
    console.log("onChange", data, key);
    this.props.onChangeAttribute(key, data.value);
  };

  render() {
    const { attributes, className, children } = this.props;
    return (
      <div className={className}>
        {children}
        {attributes && Object.keys(attributes).length
          ? <AttributesLists attributes={attributes} />
          : null}
      </div>
    );
  }
}

export default AttributesPanel;
