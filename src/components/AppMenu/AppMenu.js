import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

const AppMenu = ({ activeItem, handleItemClick }) => (
  <Menu stackable>
    <Menu.Item
      active={activeItem === ""}
      as={Link}
      name=""
      to=""
      onClick={handleItemClick}
    >
      Home
    </Menu.Item>
    <Menu.Item
      active={activeItem === "workspace"}
      as={Link}
      name="workspace"
      to="/workspace"
      onClick={handleItemClick}
    >
      Workspace
    </Menu.Item>
    <Menu.Item
      active={activeItem === "attributes"}
      as={Link}
      name="attributes"
      to="/attributes"
      onClick={handleItemClick}
    >
      Create experience
    </Menu.Item>
    <Menu.Item position="right">
      <Icon name="bell"/>
      bellavisual
    </Menu.Item>
  </Menu>
);

export default AppMenu;
