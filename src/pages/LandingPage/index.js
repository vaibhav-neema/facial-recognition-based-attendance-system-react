import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import clgLogo from "../../assets/images/ietdavv_logo.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link to="/">FaceIn</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Password: data.get("password"),
      Username: data.get("Username"),
    });
    if (data.get("password") == "vneema") {
      navigate("/home");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 7,
            }}
          >
            <img src={clgLogo} />
          </Box>
          <Box
            sx={{
              m: 5,
              textAlign: "center",
            }}
          >
            <p>
              FaceIn revolutionizes traditional attendance tracking by
              harnessing cutting-edge Facial Recognition Algorithms. By
              extracting precise biometric data from photographs, this
              innovative system seamlessly records classroom attendance. The
              captured data is then cross-referenced against a meticulously
              maintained database, instantly confirming students' class
              participation. The output can be effortlessly generated as a
              concise text file or a comprehensive Excel spreadsheet,
              streamlining administrative tasks. Experience the future of
              attendance management with FaceIn.
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1b5e20" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                color="success"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                color="success"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
