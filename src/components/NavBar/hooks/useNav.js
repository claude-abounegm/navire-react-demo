import { useState, useEffect } from "react";
import { Nav } from "navire";

function useNav(props, init, defaultPath) {
  const [nav] = useState(new Nav(props, init));
  const [, setActivePathState] = useState(null);

  useEffect(() => {
    if (defaultPath) {
      setActiveNavPath(defaultPath);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
