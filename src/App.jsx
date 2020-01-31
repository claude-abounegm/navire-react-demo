import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
// eslint-disable-next-line no-unused-vars
import Nav from "navire";

import NavBar from "./components/NavBar";
import Page from "./components/Page";
import useNav from "./components/NavBar/hooks/useNav";

import "semantic-ui-css/semantic.min.css";

const App = props => {
  const { history, location } = props;

  const [admin, setAdmin] = useState(false);

  const [nav, resetNav] = useNav({}, nav => {
    nav.appendLink({ title: "Link1", href: "/link1" });

    nav.appendCategory({ title: "Category1" }, nav => {
      nav.appendLink({
        title: "SubLink1",
        href: "/sublink1"
      });

      nav.appendLink({
        title: "Admin Link",
        href: "/admin",
        icon: "trophy",
        show: () => admin
      });

      nav.appendDivider({ title: "SubCategory" });
      nav.appendLink({
        title: "SubLink2",
        href: "/sublink2/?category=4",
        match: /\/sublink2/
      });
      nav.appendDivider();

      nav.appendCategory({ title: "Nested" }, nav => {
        nav.appendLink({
          title: "SubSubLink1",
          href: "/subsublink1"
        });
      });
    });

    nav.appendCategory({ title: "Admin", show: () => admin }, nav => {
      nav.appendLink({ title: "Users", href: "/users" });
    });
  });

  useEffect(() => {
    resetNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  function handleClick() {
    setAdmin(!admin);
    history.push("/");
  }

  return (
    <Container>
      <NavBar nav={nav} history={history} location={location} />

      <Button onClick={handleClick} primary={admin}>
        Toggle Admin
      </Button>

      <Switch>
        <Route path="/" component={Page} />
      </Switch>
    </Container>
  );
};

export default App;
