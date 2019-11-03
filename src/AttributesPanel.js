import React, { PureComponent } from "react";
import { Input } from "semantic-ui-react";

const AttributesList = ({ attributes, onChange }) =>
  Object.keys(attributes).map(key => (
    <Input
      key={key}
      label={key}
      defaultValue={attributes[key]}
      onChange={(_, data) => onChange(_, data, key)}
    />
  ));

const AttributesLists = ({ attributes: { style, ...rest }, onChange }) => (
  <div>
    <AttributesList attributes={rest} onChange={onChange} />
    <AttributesList attributes={style} onChange={onChange} />
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
    const { attributes } = this.props;
    return (
      <div>
        {attributes && Object.keys(attributes).length ? (
          <AttributesLists attributes={attributes} onChange={this.onChange} />
        ) : null}
      </div>
    );
  }
}

export default AttributesPanel;
