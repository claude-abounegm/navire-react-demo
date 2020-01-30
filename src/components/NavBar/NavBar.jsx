import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import useNav from "./hooks/useNav";
import styled from "styled-components";

const ActiveDropdown = styled(Dropdown)`
  &.active {
    font-weight: bold !important;
    border-bottom-style: solid !important;
    border-color: black !important;
  }
`;

const NavBar = ({ init, onChange, ...props }) => {
  console.log(props);
  const [nav, setActiveNavPath] = useNav(props, init, "Category1.SubLink1");

  function onItemClick(e, item) {
    e.preventDefault();

    const { path } = item;

    if (onChange && onChange(item) === false) {
      return;
    }

    setActiveNavPath(path);
  }

  const els = nav.traverse((item, traverseChildren) => {
    const { id, title, type, level, href, active } = item;

    if (type === "link") {
      const Container = level === 0 ? Menu : Dropdown;

      return (
        <Container.Item
          key={id}
          active={active}
          href={href}
          onClick={e => onItemClick(e, item)}
        >
          {title}
        </Container.Item>
      );
    }

    if (type === "category") {
      return (
        <ActiveDropdown
          item
          key={id}
          className={active ? "active" : ""}
          text={title}
        >
          <Dropdown.Menu>{traverseChildren()}</Dropdown.Menu>
        </ActiveDropdown>
      );
    }

    return null;
  });

  return (
    <Menu pointing secondary>
      {els}
    </Menu>
  );
};

export default NavBar;
