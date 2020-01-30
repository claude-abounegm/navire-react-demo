import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";

const NavBar = props => {
  const { nav } = props;

  const els = nav.traverse((item, i, traverseChildren) => {
    if (item.type === "link") {
      if (item.level === 0) {
        return (
          <Menu.Item name={item.id} href={item.href}>
            {item.title}
          </Menu.Item>
        );
      }

      return <Dropdown.Item href={item.href}>{item.title}</Dropdown.Item>;
    }

    if (item.type === "category") {
      return (
        <Dropdown item text={item.title}>
          <Dropdown.Menu>{traverseChildren()}</Dropdown.Menu>
        </Dropdown>
      );
    }

    return null;
  });

  return <Menu pointing>{els}</Menu>;
};

export default NavBar;
