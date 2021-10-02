import React, {useEffect, useState} from "react";
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
import Select from 'react-select'
import Option from "react-select/dist/declarations/src/components/Option";

const theme = createTheme();
const user_options = [
  { value: 'teacher', label: 'Teacher' },
  { value: 'studennt', label: 'Student' },
];
const grade_options = [
  { value: 'g_3', label: 'G-03'},
  { value: 'g_4', label: 'G-04'},
  { value: 'g_5', label: 'G-05'},
  { value: 'g_6', label: 'G-06'},
  { value: 'g_7', label: 'G-07'},
  { value: 'g_8', label: 'G-08'},
];


export function Signup() {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign Up
          </Typography>
          <Box component="form" >

            <Select className="select_usertype" options={user_options} id="select_usertype"/>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Full Name"
              name="fullname"
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="uname"
              label="UserName"
              name="uname"
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <div className="select_area1" >
              <Select className="select_grade" options={grade_options}/>
            </div>
            <div className="check_box_are">
            <form> 
              <input
                // onChange="{handleFruitChange}"
                type="checkbox"
                name="fruit"
                value="apple"
              />Apple
              <input
                // onChange="{handleFruitChange}"
                type="checkbox"
                name="fruit"
                value="orange"
              />Orange
              <input
                // onChange="{handleFruitChange}"
                type="checkbox"
                name="fruit"
                value="watermelon"
              />Watermelon
            </form>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}