import React from "react";

const NavBar = props => {
  const { nav } = props;

  const els = nav.traverse((item, i, traverseChildren) => {
    if (item.type === "link") {
      return <a href={item.href}>{item.title}</a>;
    }

    if (item.type === "divider") {
      return <hr />;
    }

    if (item.type === "category") {
      return (
        <div>
          <h1>{item.title}</h1>
          {traverseChildren()}
        </div>
      );
    }

    return (
      <div>
        {item.type} - {item.title}
      </div>
    );
  });

  return <div>{els}</div>;
};

export default NavBar;
