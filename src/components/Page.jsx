import React from "react";
import { Card } from "semantic-ui-react";

const Page = props => {
  const { location } = props;

  return (
    <Card centered>
      <Card.Content>{JSON.stringify(location)}</Card.Content>
    </Card>
  );
};

export default Page;
