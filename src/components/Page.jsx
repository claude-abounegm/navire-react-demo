import React from "react";

const Page = props => {
  const { location } = props;

  return <>{location.pathname}</>;
};

export default Page;
