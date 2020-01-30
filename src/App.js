import React from "react";
import NavBar from "./components/NavBar";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <>
      <NavBar
        init={nav => {
          nav.appendCategory({ title: "Category1" }, nav => {
            nav.appendLink({ title: "Link1", href: "/link1" });
            // nav.appendDivider();
            nav.appendLink({ title: "Link2", href: "/link2" });
          });
        }}
      />
    </>
  );
}

export default App;
