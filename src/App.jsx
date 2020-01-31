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

  const [nav, resetNav] = useNav({}, () => [
    { type: "link", title: "Link1", href: "/link1" },
    {
      type: "category",
      title: "Category1",
      children: [
        {
          type: "link",
          title: "SubLink1",
          href: "/sublink1"
        },
        {
          type: "link",
          title: "Admin Link",
          href: "/admin",
          icon: "trophy",
          show: () => admin
        },
        { type: "divider", title: "SubCategory" },
        {
          type: "link",
          title: "SubLink2",
          href: "/sublink2/?category=4",
          match: /\/sublink2/
        },
        { type: "divider" },
        {
          type: "category",
          title: "Nested",
          children: [
            {
              type: "link",
              title: "SubSubLink1",
              href: "/subsublink1"
            }
          ]
        }
      ]
    },
    {
      type: "category",
      title: "Admin",
      show: () => admin,
      children: [{ type: "link", title: "Users", href: "/users" }]
    }
  ]);

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
