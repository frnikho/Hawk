import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Container from "@mui/material/Container";
import {ThemeProvider} from "@emotion/react";

class Lobby extends React.Component {
    // const { code } = useParams();
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    {/*<h1>Room ({code})</h1>*/}
                </Container>
            </ThemeProvider>
        );
    }
}

export default Lobby;