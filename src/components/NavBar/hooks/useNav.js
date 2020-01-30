import React, { useState } from "react";
import { Nav } from "nav-tree";

function useNav(props, init) {
  const [nav, setNav] = useState(new Nav(props, init));
  const [activePath, setActivePathState] = useState(null);

  function setActiveNavPath(path) {
    nav.get(path).activate();
    setActivePathState(path);
  }

  return [nav, setActiveNavPath];
}

export default useNav;
