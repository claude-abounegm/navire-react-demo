// eslint-disable-next-line no-unused-vars
import Nav from "navire";
import { useState, useEffect } from "react";
import { getHrefFromLocation } from "../../../utils/url";

/**
 *
 * @param {{ nav: Nav }} param0
 */
function useNavActivePath({ nav, location }) {
  const [activePath, setActivePathState] = useState(null);

  // on pathname change update nav active item
  useEffect(() => {
    if (!nav) {
      return;
    }

    const href = getHrefFromLocation(location);

    // try to set active navigation element by href
    const item = nav.findByHref(href);

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

  return [activePath, setActiveNavPath];
}

export default useNavActivePath;
