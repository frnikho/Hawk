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
                <Grid key={i} item textAlign={"center"}>
                    ❤
                </Grid>);
        }
        return life;
    }

    userBox(box) {
        if (this.props.player.life <= 0) {
            if (box === true)
                return {backgroundColor: "#e74c3c"}
            else
                return {textColor: "white"}
        } else if (this.props.player.isAnswered) {
            if (box === true)
                return {backgroundColor: "#34495e"}
            else
                return {textColor: "white"}
        } else {
            if (box === true)
                return {backgroundColor: "white"}
            else
                return {textColor: "black"}
        }
    }

    render() {
        return (
            <Grid item>
                <Paper>
                    <Box style={this.userBox(true)} sx={{width: 180, height: 50}} >
                        <Typography color={this.userBox(false)}>{this.props.player.client.username}</Typography>
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
