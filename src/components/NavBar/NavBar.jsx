import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import useNavire from "./hooks/useNavire";
import useNavireActivePath from "./hooks/useNavireActivePath";

const NavBar = ({ user, history, location }) => {
  const [navire] = useNavire(
    {
      init: () => [
        { type: "link", title: "Link1", href: "/link1" },
        {
          type: "category",
          title: "Category1",
          children: [
            {
              type: "link",
              title: "SubLink1",
              href: "/sublink1"
            },
            {
              type: "link",
              title: "Admin Link",
              href: "/admin",
              icon: "trophy",
              show: user.admin
            },
            { type: "divider", title: "SubCategory" },
            {
              type: "link",
              title: "SubLink2",
              href: "/sublink2/?category=4",
              match: /\/sublink2/
            },
            { type: "divider" },
            {
              type: "category",
              title: "Nested",
              children: [
                {
                  type: "link",
                  title: "SubSubLink1",
                  href: "/subsublink1"
                }
              ]
            }
          ]
        },
        {
          type: "category",
          title: "Admin",
          show: user.admin,
          children: [{ type: "link", title: "Users", href: "/users" }]
        }
      ]
    },
    [user.admin]
  );

  useNavireActivePath({ navire, location });

  function handleItemClick(e, item) {
    e.preventDefault();

    // update history to new href
    history.push(item.href);
  }

  if (!navire) {
    return null;
  }

  return (
    <Menu>
      {navire.traverse((item, traverseChildren) => {
        const { id, title, type, level, href, active, icon } = item;

        if (type === "link") {
          const Container = level === 0 ? Menu : Dropdown;

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

        if (level > 0) {
          if (type === "divider") {
            return <Dropdown.Divider key={id} />;
          }

          if (type === "divider-title") {
            return (
              <Dropdown.Header key={id} id={id}>
                {icon && <Icon name={icon} />} {title}
              </Dropdown.Header>
            );
          }
        }

        return null;
      })}
    </Menu>
  );
};

NavBar.propTypes = {
  onChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default NavBar;
