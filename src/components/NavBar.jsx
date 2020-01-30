import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import styled from "styled-components";

const ActiveDropdown = styled(Dropdown)`
  &.active {
    font-weight: bold !important;
  }
`;

const NavBar = props => {
  const { nav } = props;

  const els = nav.traverse((item, i, traverseChildren) => {
    const { id, type, level, href, active } = item;

    if (type === "link") {
      if (level === 0) {
        return (
          <Menu.Item key={id} name={id} href={href}>
            {item.title}
          </Menu.Item>
        );
      }

      return (
        <Dropdown.Item key={id} active={active} href={href}>
          {item.title}
        </Dropdown.Item>
      );
    }

    if (type === "category") {
      console.log(item);

      return (
        <ActiveDropdown
          item
          key={id}
          className={active ? "active" : ""}
          text={item.title}
        >
          <Dropdown.Menu>{traverseChildren()}</Dropdown.Menu>
        </ActiveDropdown>
      );
    }

    return null;
  });

  return <Menu pointing>{els}</Menu>;
};

export default NavBar;
