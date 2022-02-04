import React from "react";
import { Grid } from "@mui/material";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
          <h1>404 Not found</h1>
      </Grid>
    );
  }
}
