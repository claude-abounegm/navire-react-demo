import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Page from "./components/Page";
import "semantic-ui-css/semantic.min.css";

const App = props => {
  const { history } = props;

  return (
    <>
      <NavBar
        init={nav => {
          nav.appendLink({ title: "Link1", href: "/link1" });

          nav.appendCategory({ title: "Category1" }, nav => {
            nav.appendLink({ title: "SubLink1", href: "/sublink1" });
            nav.appendDivider();
            nav.appendLink({ title: "SubLink2", href: "/sublink2" });

            nav.appendCategory({ title: "SubCategory1" }, nav => {
              nav.appendLink({ title: "SubSubLink1", href: "/subsublink1" });
            });
          });
        }}
        onChange={item => {
          history.push(item.href);
        }}
      />

      <Switch>
        <Route path="/" component={Page} />
      </Switch>
    </>
  );
};

export default App;
