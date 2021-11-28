import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Container from "@mui/material/Container";
import {ThemeProvider} from "@emotion/react";
import withRouter from "../components/withRouter";

class Lobby extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <h1>{this.props.params.code}</h1>
                    {/*<h1>Room ({code})</h1>*/}
                </Container>
            </ThemeProvider>
        );
    }
}



export default withRouter(Lobby);