import React, { useEffect } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import useNav from "./hooks/useNav";
import styled from "styled-components";

const ActiveDropdown = styled(Dropdown)`
  &.active {
    font-weight: bold !important;
  }
`;

const NavBar = ({ init, ...props }) => {
  const [nav, setActiveNavPath] = useNav(props, init);

  useEffect(() => {
    setActiveNavPath("Category1.Link1");
  }, []);

  const onClick = (e, item) => {
    const { path } = item;

    e.preventDefault();

    setActiveNavPath(path);
  };

  const els = nav.traverse((item, traverseChildren) => {
    const { id, title, type, level, href, active = false } = item;

    if (type === "link") {
      if (level === 0) {
        return (
          <Menu.Item key={id} name={id} href={href}>
            {title}
          </Menu.Item>
        );
      }

      return (
        <Dropdown.Item
          key={id}
          active={active}
          href={href}
          onClick={e => onClick(e, item)}
        >
          {title}
        </Dropdown.Item>
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

  return <Menu pointing>{els}</Menu>;
};

export default NavBar;
