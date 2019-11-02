import React, { PureComponent } from "react";
import { Input } from "semantic-ui-react";

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
        {attributes
          ? Object.keys(attributes).map(key => (
              <Input
                key={key}
                label={key}
                defaultValue={attributes[key]}
                onChange={(_, data) => this.onChange(_, data, key)}
              />
            ))
          : null}
      </div>
    );
  }
}

export default AttributesPanel;
