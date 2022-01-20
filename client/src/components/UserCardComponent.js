import React from "react";

import PropTypes from "prop-types";
import {Grid, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {MonitorHeart} from "@mui/icons-material";

export default class UserCardComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    showLife() {
        let life = [];
        for (let i = 0; i < this.props.player.life; i++) {
            life.push(
                <Grid item textAlign={"center"}>
                    ❤
                </Grid>);
        }
        return life;
    }

    render() {
        return (
            <Grid item>
                <Paper>
                    <Box sx={{width: 180, height: 50, backgroundColor: this.props.player.isAnswered ? 'primary.dark' : ""}} >
                        <Typography>{this.props.player.client.username}</Typography>
                        <Grid container textAlign={"center"} alignContent={"center"}>
                            {this.showLife()}
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        )
    }
}

UserCardComponent.propTypes = {
    user: PropTypes.object
}
