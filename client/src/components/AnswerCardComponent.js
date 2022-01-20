import React from "react";
import {ButtonBase, Grid, Paper} from "@mui/material";
import PropTypes from 'prop-types';

export default class AnswerCardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enable: false,
            goodAnswer: undefined,
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.goodAnswer !== this.state.goodAnswer) {
            this.setState({goodAnswer: this.props.goodAnswer});
        }
        if (this.props.enable !== this.state.answered) {
            this.setState({answered: this.props.answered})
        }
    }

    onClick = () => {
        this.props.onClick(this.props.answer)
    }

    render() {
        return (
            <Grid item md={6} textAlign={"center"}>
                <ButtonBase disabled={this.state.answered !== this.props.index} onClick={this.onClick} sx={{my: 2, height: 150, width: 500}} style={{backgroundColor: this.props.goodAnswer ? "#42f554" : "#f5f6fa"}}>
                    <Paper elevation={0} style={{backgroundColor: this.state.goodAnswer ? "#42f554" : "#f5f6fa"}}>
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
    enable: PropTypes.bool
}
