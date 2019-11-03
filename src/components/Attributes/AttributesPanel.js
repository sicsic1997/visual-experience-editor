import React, { Component, useState } from "react";
import {Button, Divider, Form, Header, Input} from "semantic-ui-react";
import DataManager from "../../model/DataManager";
import { withRouter } from 'react-router-dom';
let idx = 1;

const AttributesList = ({ attributes, onChange, isStyle }) => {
    return (
        Object.keys(attributes).map(key => (
            <Input
                key={++idx}
                label={`${key}:`}
                defaultValue={attributes[key]}
                name={key}
                onChange={(_, data) => onChange(_, data, key, isStyle)}
            />
        )));
};

const StylePropForm = ({ onChange }) => {
    const [data, changeData] = useState({});
    return (
        <Form className="style-prop__form">
            <Form.Input
                placeholder='Attribute name'
                name='propDescription'
                onChange={e => changeData({ ...data, [e.target.name]: e.target.value })}
                required
            />
            <Form.Input
                placeholder='Attribute value'
                name='propValue'
                onChange={e => changeData({ ...data, [e.target.name]: e.target.value })}
                required
            />
            <Button content="Save" onClick={() => { onChange({}, { value: data.propValue }, data.propDescription, true, true)}}/>
        </Form>
    )
};

const AttributesLists = ({ attributes: { style, ...rest }, onChange }) => (
    <div className="workflow__panel-tools">
        <div className="workflow__panel-tools--main">
            <Divider horizontal>Basic Attributes</Divider>
            <AttributesList attributes={rest} onChange={onChange} />
        </div>
        <div className="workflow__panel-tools--style">
            <Divider horizontal>Styles</Divider>
            <AttributesList attributes={style} onChange={onChange} isStyle={true} />
            <StylePropForm onChange={onChange} />
        </div>
    </div>
);

class AttributesPanel extends Component {
  constructor(props) {
    super(props);
  }

  onChange = async (_, data, key, isStyle, isNew) => {
    const { onAttributeAdded } = this.props;
    this.props.onChangeAttribute(key, data.value, isStyle);
    if (isNew) {
        await onAttributeAdded();
    }
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
                onClick={async () => {
                  await DataManager.getInstance().fetchDataManagerCachedData();
                  await DataManager.getInstance().publishExperience()
                  this.props.history.push("/workspace");
                }}>
                Publish
            </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(AttributesPanel);
