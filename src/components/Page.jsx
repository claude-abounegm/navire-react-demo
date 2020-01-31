import React from "react";
import { Container } from "semantic-ui-react";
import { getHrefFromLocation } from "./../utils/url";

const Page = props => {
  const { location } = props;

  return (
    <Container textAlign="center">
      <pre>
        <code>{getHrefFromLocation(location)}</code>
      </pre>
    </Container>
  );
};

export default Page;
