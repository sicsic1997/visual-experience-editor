import React, { PureComponent } from "react";
import { Input } from "semantic-ui-react";

const AttributesList = ({ attributes }) => (
    Object.keys(attributes).map(key => (
        <Input
            key={key}
            label={key}
            defaultValue={attributes[key]}
            onChange={(_, data) => this.onChange(_, data, key)}
        />
    ))
);

const AttributesLists = ({ attributes: { style, ...rest }}) => (
    <div>
      <AttributesList attributes={rest} />
      <AttributesList attributes={style} />
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
    const { attributes } = this.props;
    return (
      <div>
        {attributes && Object.keys(attributes).length
          ? <AttributesLists attributes={attributes} />
          : null}
      </div>
    );
  }
}

export default AttributesPanel;
