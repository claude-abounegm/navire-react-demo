import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";

import NavBar from "./components/NavBar";
import Page from "./components/Page";

import "semantic-ui-css/semantic.min.css";

const App = props => {
  const { history, location } = props;

  const [admin, setAdmin] = useState(false);

  function handleClick() {
    setAdmin(!admin);
    history.push("/");
  }

  return (
    <Container>
      <NavBar user={{ admin }} history={history} location={location} />

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
