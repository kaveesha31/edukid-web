import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Validator from '../../resources/validations';
import { useContext } from "react";
import { AuthContext } from "../../contexts/userContext";
import fire from "../../config/firebaseConfig";
import { IconButton, LinearProgress, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface User {
  uid: string;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  userRole: string;
  rememberMe: boolean;
  hasError: boolean;
  errorMessage: string;
  loading: boolean;
}

const initUer: User = {
  uid: "",
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  userRole: "",
  rememberMe: false,
  hasError: false,
  errorMessage: "",
  loading: false,
};

const theme = createTheme();

export function Login() {

  const [user, setUser] = useState(initUer);
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  console.log("userType", authContext.userType)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  
  const validateLoginFormData = (): boolean => {
    const emValidation = Validator.validateEmail(user.email);

    const pwValidation = Validator.validateString(
      user.password,
      "Password",
      3,
      100
    );

    setUser({
      ...user,
      emailError: emValidation.message,
      passwordError: pwValidation.message,
    });

    return emValidation.isValid && pwValidation.isValid;
  };

  const handleLogin = () => {
    setUser({ ...user, loading: true });
    console.log("authContext", authContext.userType)

    fire
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((loggedUser) => {        
        console.log("loggedUser",loggedUser)
        authContext.setUser(loggedUser.user);
        setUser({ ...user, loading: true });
        console.log("user logged in successfully");
        if (user.rememberMe) {
          localStorage.setItem("isAuthed", "true");
          sessionStorage.setItem("isAuthed", "true");
        } else {
          sessionStorage.setItem("isAuthed", "true");
          localStorage.setItem("isAuthed", "false");
        }
        
        history.push("/welcome")

      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setErrorMsg("Inncorrect or unregistered username");
            handleClick();
            console.log("handleLogin email error => ", err.message);
            break;
          case "auth/wrong-password":
            setErrorMsg("Wrong password");
            handleClick();
            console.log("handleLogin password error => ", err.message);
            break;
        }
      })
      .finally(() => {
        setUser({ ...user, loading: false });
      });
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errorMsg}
          action={action}
        />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!user.emailError}
            helperText={user.emailError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
                emailError: "",
              });
            }}
          />
          <TextField
            error={!!user.passwordError}
            helperText={user.passwordError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
                passwordError: "",
              });
            }}
          />
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.rememberMe}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setUser({ ...user, rememberMe: e.target.checked });
                  }}
                />
              }
              label="Remember me"
            />
             {user.loading && (
            <div style={{width:"100%"}}>
              <LinearProgress color="secondary" />
            </div>
          )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e: any) => {
                e.preventDefault();
                validateLoginFormData() && handleLogin();
              }}
            >
              LogIn
            </Button>
            <Grid container>
               <Grid item>
                <Link href={"/signup"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}