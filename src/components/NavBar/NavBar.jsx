import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown } from "semantic-ui-react";
import useNav from "./hooks/useNav";
import styled, { css } from "styled-components";

const ActiveDropdown = styled(Dropdown)`
  ${props =>
    props.active &&
    css`
      font-weight: bold !important;
      border-bottom-style: solid !important;
      border-color: black !important;
    `}
`;

const NavBar = ({ init, onChange, history, location }) => {
  const [nav, setActiveNavPath] = useNav({}, init);

  useEffect(() => {
    const currentPath = location.pathname;
    // try to set active navigation element by href
    const item = nav.getByHref(currentPath);

    if (item && item.path) {
      setActiveNavPath(item.path);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function onItemClick(e, item) {
    e.preventDefault();

    if (onChange && onChange(item) === false) {
      return;
    }

    history.push(item.href);
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
          active={active ? "active" : undefined}
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

NavBar.propTypes = {
  init: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default NavBar;
