import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import PropTypes from "prop-types";

export default class GameStart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countdown: this.props.countdown,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.countdown !== this.state.countdown) {
            this.setState({countdown: this.props.countdown});
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h3">
                        <b>
                            {this.state.countdown === undefined ? "Game starting soon..." : `Game will be ready in ${this.state.countdown}`}
                        </b>
                    </Typography>
                </Box>
            </Container>
        )
    }
}

GameStart.propTypes = {
    countdown: PropTypes.number
}