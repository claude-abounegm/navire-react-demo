import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
// eslint-disable-next-line no-unused-vars
import Nav from "navire";
import NavBar from "./components/NavBar";
import Page from "./components/Page";
import "semantic-ui-css/semantic.min.css";

const App = props => {
  const { history, location } = props;

  return (
    <Container>
      <NavBar
        init={(/** @type {Nav<object>()} */ nav) => {
          nav.appendLink({ title: "Link1", href: "/link1" });

          nav.appendCategory({ title: "Category1" }, nav => {
            nav.appendLink({ title: "SubLink1", href: "/sublink1" });
            nav.appendLink({
              title: "SubLink2",
              href: "/sublink2/?category=4",
              match: /\/sublink2/
            });
            nav.appendDivider();

            nav.appendCategory({ title: "SubCategory1" }, nav => {
              nav.appendLink({ title: "SubSubLink1", href: "/subsublink1" });
            });
          });
        }}
        history={history}
        location={location}
      />

      <Switch>
        <Route path="/" component={Page} />
      </Switch>
    </Container>
  );
};

export default App;
