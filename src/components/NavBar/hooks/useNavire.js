import { useState, useEffect } from "react";
import Navire from "navire";

/**
 * @template PropsType
 * @param {{ props?: PropsType }} opts
 * @param {Nav.Init<PropsType>} init
 */
function useNavire({ opts = {}, init }, deps = []) {
  const createNavire = () => new Navire(init, opts);

  const [navire, setNavire] = useState(null);

  function resetNav() {
    setNavire(createNavire());
  }

  function append(init) {
    navire.append(init);
  }

  useEffect(() => {
    resetNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [navire, resetNav, append];
}

export default useNavire;
