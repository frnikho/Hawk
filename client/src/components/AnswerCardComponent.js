import React from "react";
import {ButtonBase, Grid, Paper} from "@mui/material";
import PropTypes from 'prop-types';

export default class AnswerCardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Grid item md={6} textAlign={"center"}>
                <ButtonBase onClick={() => this.props.onClick(this.props.answer)} sx={{my: 2, height: 150, width: 500}} style={{backgroundColor: '#f5f6fa'}}>
                    <Paper elevation={0} style={{backgroundColor: '#f5f6fa'}}>
                        <h1>{this.props.answer}</h1>
                    </Paper>
                </ButtonBase>
            </Grid>
        )
    }
}

AnswerCardComponent.propTypes = {
    answer: PropTypes.string,
    onClick: PropTypes.func,
}