import React from "react";
import { Nav } from "nav-tree";
import NavBar from "./components/NavBar";
import "semantic-ui-css/semantic.min.css";

const nav = new Nav({}, nav => {
  nav.appendCategory({ title: "Category1" }, nav => {
    nav.appendLink({ title: "Link1", href: "/link1" });
    // nav.appendDivider();
    nav.appendLink({ title: "Link2", href: "/link2" });
  });
});

nav.get("Category1.Link1").activate();

function App() {
  return (
    <>
      <NavBar nav={nav} />
    </>
  );
}

export default App;
