import { useState } from "react";
import Nav from "navire";

function useNav(opts, init) {
  const createNav = () => new Nav(opts, init);

  const [nav, setNav] = useState(createNav());

  function resetNav() {
    setNav(createNav());
  }

  return [nav, resetNav];
}

export default useNav;
