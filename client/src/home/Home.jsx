import React from "react";
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Avatar, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import theme from '../theme'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SocketContext from "../components/SocketContext";

class Home extends React.Component {

    static contextType = SocketContext

    componentDidMount() {
        console.log("ABCD")
        console.log(Home.contextType);
    }

    // const [username, setUsername] = useState("");
    //
    // function onJoinRoom(e) {
    //     e.preventDefault();
    //     const room_code = window.prompt("Entrer le code de la room");
    //     if (room_code == null || room_code === "")
    //         return;
    //     window.location.replace(`/lobby/${room_code}`);
    // }
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: '#2e86de',
                        }}
                    >
                        <Avatar sx={{ m:2, bgcolor: '#ff6b6b', width: 100, height: 100}}>
                            <PersonIcon/>
                        </Avatar>
                        <Typography variant="h3">
                            Play
                        </Typography>
                        <Box component="form"
                             // onSubmit={onJoinRoom}
                             sx={{
                                 m: 3,
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'center',
                             }}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                id="firstName"
                                label="Pseudo"
                                autoFocus
                                variant="standard"
                                // onChange={(e) => {
                                //     e.preventDefault();
                                //     setUsername(e.target.value)
                                // }}
                            />
                            <Box
                                sx={{
                                    marginTop: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    Create room
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="success"
                                    sx={{ mt: 1, mb: 2 }}
                                >
                                    Join room
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

export default Home;