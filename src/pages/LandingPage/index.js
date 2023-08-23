import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CopyRight from "../../components/CopyRight";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import clgLogo from "../../assets/images/davvlogo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Header from "../../components/Header";
import TeamInfo from "../../components/TeamInfo";
import { useTeamInfo } from "../../components/TeamInfo/useTeamInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  typography: {
    fontFamily: "Geologica",
    fontSize: 14,
  },
});

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // Signed in
        navigate("/home");
        sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.code === "auth/wrong-password") {
          toast.error("Please enter correct Password", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please enter correct Email", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (error.code === "auth/missing-password") {
          toast.error("Please enter the Password", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (error.code === "auth/invalid-email") {
          toast.error("Email provided is invalid", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const updateDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setWindowWidth(width);
    setWindowHeight(height);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  });

  const isMobile = () => {
    if (windowWidth <= windowHeight / 1.5) return true;
  };

  const { isOpen: showTeamInfo, onClose: onTeamInfoClosed, onOpen: onTeamInfoOpen } = useTeamInfo();

  const handleTeamButtonClick = () => {
    onTeamInfoOpen();
  };

  return (
    <>
      <TeamInfo isOpen={showTeamInfo} onClose={onTeamInfoClosed} isWeb={!isMobile()} />

      <Header onClickHandle={handleTeamButtonClick} />
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Box component="main" display={"flex"} flexDirection={isMobile() ? "column" : "row"} width={"100%"}>
          <CssBaseline />
          <Box
            width={isMobile() ? "100%" : "50%"}
            height={isMobile() ? "none" : "90vh"}
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box marginTop={isMobile() ? "2.5rem" : 0}>
              <img
                width={isMobile() ? "100rem" : "200rem"}
                height={isMobile() ? "100rem" : "200rem"}
                src={clgLogo}
                alt="college-logo"
              />
            </Box>
            <Box
              sx={{
                mx: 4,
                textAlign: "center",
                p: 1,
              }}
            >
              <p style={{ fontSize: isMobile() ? 13 : null }}>
                AttendEase revolutionizes traditional attendance tracking by harnessing cutting-edge Facial Recognition
                Algorithms. By extracting precise biometric data from photographs, this innovative system seamlessly
                records classroom attendance. The captured data is then cross-referenced against a meticulously
                maintained database, instantly confirming students' class participation. The output can be effortlessly
                generated as a concise text file or a comprehensive Excel spreadsheet, streamlining administrative
                tasks. Experience the future of attendance management with FaceIn.
              </p>
            </Box>
          </Box>

          <Box
            height={isMobile() ? "65vh" : "90vh"}
            width={isMobile() ? "100%" : "50%"}
            component={Paper}
            elevation={6}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1b5e20" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} width="80%">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  color="success"
                  autoComplete="email"
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

                <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>

                <CopyRight sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LandingPage;
