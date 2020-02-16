// eslint-disable-next-line no-unused-vars
import Navire from "navire";
import { useState, useEffect } from "react";
import { getHrefFromLocation } from "../../../utils/url";

/**
 *
 * @param {{ navire: Navire }} param0
 */
function useNavireActivePath({ navire, location }) {
  const [activePath, setActivePathState] = useState(null);

  // on pathname change update nav active item
  useEffect(() => {
    if (!navire) {
      return;
    }

    const href = getHrefFromLocation(location);

    // try to set active navigation element by href
    const item = navire.findByHref(href);

    if (item) {
      setActiveNavirePath(item.path);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function setActiveNavirePath(path) {
    const navItem = navire.get(path);
    if (!navItem) {
      throw new Error("Invalid navigation path", path);
    }

    navItem.activate();
    setActivePathState(path);
  }

  return [activePath, setActiveNavirePath];
}

export default useNavireActivePath;
