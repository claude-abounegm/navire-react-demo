import { useState, useEffect } from "react";
import Nav from "navire";

/**
 * @template PropsType
 * @param {{ props?: PropsType }} opts
 * @param {Nav.Init<PropsType>} init
 */
function useNav({ opts = {}, init }, deps = []) {
  const createNav = () => new Nav(opts, init);

  const [nav, setNav] = useState(null);

  function resetNav() {
    setNav(createNav());
  }

  function append(init) {
    nav.append(init);
  }

  useEffect(() => {
    resetNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [nav, resetNav, append];
}

export default useNav;
