import { useState, useEffect } from "react";
import { getHrefFromLocation } from "../../../utils/url";

function useNavActivePath({ nav, location }) {
  const [activePath, setActivePathState] = useState(null);

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

  return [activePath, setActiveNavPath];
}

export default useNavActivePath;
