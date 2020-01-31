import { useState, useEffect } from "react";
import { Nav } from "navire";
import { getHrefFromLocation } from "../../../utils/url";

function useNav({ props, init, location }) {
  const [nav] = useState(new Nav(props, init));
  const [, setActivePathState] = useState(null);

  // on pathname change update nav active item
  useEffect(() => {
    const href = getHrefFromLocation(location);

    // try to set active navigation element by href
    const item = nav.find(href);

    if (item) {
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
