import { useState, useEffect } from "react";
import { Nav } from "nav-tree";

function useNav(props, init, defaultPath) {
  const [nav] = useState(new Nav(props, init));
  const [, setActivePathState] = useState(null);

  useEffect(() => {
    if (defaultPath) {
      setActiveNavPath(defaultPath);
    }
  }, []);

  function setActiveNavPath(path) {
    const navItem = nav.get(path);
    if (!navItem) {
      throw new Error("Invalid navigation path", path);
    }

    navItem.activate();
    setActivePathState(path);
  }

  return [nav, setActiveNavPath];
}

export default useNav;
