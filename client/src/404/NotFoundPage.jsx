import React from "react";
import { Box, Grid } from "@mui/material";
import Lottie from 'lottie-react'
import pageNotFound from '../animations/404.json'

export default class NotFoundPage extends React.Component {
  render() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                sx={{
                    width: 850,
                }}
            >
                <Lottie animationData={pageNotFound} loop={true} autoplay={true} />
            </Box>
        </Grid>
    );
  }
}
