import { useState, useEffect } from "react";
import { Nav } from "navire";

function useNav({ props, init, location }) {
  const [nav] = useState(new Nav(props, init));
  const [, setActivePathState] = useState(null);

  function getHrefFromLocation(location) {
    const { pathname, search, hash } = location;
    return `${pathname}${search}${hash}`;
  }

  // on pathname change update nav active item
  useEffect(() => {
    const currentPath = getHrefFromLocation(location);

    // try to set active navigation element by href
    const item = nav.getByHref(currentPath);

    if (item && item.path) {
      setActiveNavPath(item.path);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
