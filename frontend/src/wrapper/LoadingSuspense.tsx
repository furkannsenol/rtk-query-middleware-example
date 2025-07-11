import React from "react";
import { Container } from "reactstrap";

const LoadingSuspense = () => {
  return (
    <React.Fragment>
      <Container className="align-items-center justify-content-center d-flex min-vh-100">
        <h1 className="text-success ">Loading Page...</h1>
      </Container>
    </React.Fragment>
  );
};

export default LoadingSuspense;
