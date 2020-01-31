import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import useNav from "./hooks/useNav";

const NavBar = ({ init, history, location }) => {
  const [nav] = useNav({ props: {}, init, location });

  function handleItemClick(e, item) {
    e.preventDefault();

    // update history to new href
    history.push(item.href);
  }

  const els = nav.traverse((item, traverseChildren) => {
    const { id, title, type, level, href, active, icon } = item;
    const Container = level === 1 ? Menu : Dropdown;

    if (type === "link") {
      return (
        <Container.Item
          key={id}
          id={id}
          active={active}
          href={href}
          onClick={e => handleItemClick(e, item)}
        >
          {icon && <Icon name={icon} />} {title}
        </Container.Item>
      );
    }

    if (type === "category") {
      return (
        <Dropdown
          item
          key={id}
          id={id}
          className={active ? "active" : undefined}
          icon={icon}
          text={title}
        >
          <Dropdown.Menu>{traverseChildren()}</Dropdown.Menu>
        </Dropdown>
      );
    }

    if (type === "divider") {
      if (level > 1) {
        return <Dropdown.Divider />;
      }
    }

    if (type === "divider-title") {
      if (level > 1) {
        return (
          <Dropdown.Header>
            {icon && <Icon name={icon} />} {title}
          </Dropdown.Header>
        );
      }
    }

    return null;
  });

  return <Menu>{els}</Menu>;
};

NavBar.propTypes = {
  init: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default NavBar;
