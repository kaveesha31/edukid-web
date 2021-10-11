import React, {useEffect, useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Theme, ThemeProvider, useTheme} from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import fire from "../../config/firebaseConfig";
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import Validator from "../../resources/validations";
import LinearProgress from '@mui/material/LinearProgress';
import {FormHelperText} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useFirestore} from "reactfire";

interface User {
  uid: string;
  userType: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  StudentGrade: string;
  TeacherGrade: string[];
  selectedTeacher: string;
  userTypeError: string;
  fullNameError: string;
  usernameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  StudentGradeError: string;
  TeacherGradeError: string;
  selectedTeacherError: string;
}

const initUer: User = {
  uid: "",
  userType: "",
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  StudentGrade: "",
  TeacherGrade: [],
  selectedTeacher: "",
  userTypeError: "",
  fullNameError: "",
  usernameError: "",
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
  StudentGradeError: "",
  TeacherGradeError: "",
  selectedTeacherError: "",
}

interface Teacher {
  uid: string;
  userType: string;
  fullName: string;
  username: string;
  email: string;
  TeacherGrade: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const grades = [
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export function SignUp() {

  const [user, setUser] = useState(initUer);
  const theme = useTheme();
  const [teachersGrades, setTeachersGrades] = React.useState<string[]>([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [teacher, setTeachers] = useState<Teacher[]>([]);
  const store = useFirestore();

  console.log("user",user)

  useEffect(() => {
    setTeachers([]);

    return store
        .collection("users")
        .where("userType", "==", "teacher")
        .onSnapshot({}, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              setTeachers((ps) => {
                if (ps.filter((item) => item.uid === change.doc.id).length <= 0) {
                  ps.push({
                    uid: change.doc.data().uid,
                    email: change.doc.data().email,
                    userType: change.doc.data().userType,
                    fullName: change.doc.data().fullName,
                    username: change.doc.data().username,
                    TeacherGrade: change.doc.data().TeacherGrade,
                  });
                }
                return Object.assign([], ps);
              });
            }
            if (change.type === "modified") {
              setTeachers((ps) => {
                const modified = ps.map((a) => {
                  if (a.uid === change.doc.id) {
                    return {
                      uid: change.doc.id,
                      email: change.doc.data().email,
                      userType: change.doc.data().userType,
                      fullName: change.doc.data().fullName,
                      username: change.doc.data().username,
                      TeacherGrade: change.doc.data().TeacherGrade,
                    };
                  } else {
                    return a;
                  }
                });
                return Object.assign([], modified);
              });
            }
            if (change.type === "removed") {
              setTeachers((ps) => {
                const removed = ps.filter((a) => a.uid !== change.doc.id);
                return Object.assign([], removed);
              });
            }
          });
        });
  }, [store]);

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

  //validate register form
  const validateRegisterFormData = (): boolean => {

    const flnValidation = Validator.validateString(
      user.fullName,
      "Full name",
      3,
      100
    );

    const unValidation = Validator.validateString(
      user.username,
      "Useername",
      3,
      100
    );

    const emValidation = Validator.validateEmail(user.email);

    const pwValidation = Validator.validateString(
      user.password,
      "Password",
      6,
      100
    );

    const cfpwValidation =
      user.confirmPassword === user.password
        ? { message: "", isValid: true }
        : { message: "Confirm the password properly", isValid: false };

    const typeValidation =
      user.userType !== ""
        ? { message: "", isValid: true }
        : { message: "User type cannot be empty", isValid: false };

    const teacGrdsValidation =
      user.userType === 'teacher' ? (teachersGrades.length !== 0
        ? { message: "", isValid: true }
        : { message: "Teachers grades cannot be empty", isValid: false }) : { message: "", isValid: true }

    const selTchrRValidation =
      user.userType === 'student' ? (user.selectedTeacher !== ""
        ? { message: "", isValid: true }
        : { message: "Teacher cannot be empty", isValid: false }) : { message: "", isValid: true }

    const GrdValidation =
      user.userType === 'student' ? (user.StudentGrade !== ""
        ? { message: "", isValid: true }
        : { message: "Grade cannot be empty", isValid: false }) : { message: "", isValid: true }

    setUser({
      ...user,
      fullNameError: flnValidation.message,
      emailError: emValidation.message,
      passwordError: pwValidation.message,
      confirmPasswordError: cfpwValidation.message,
      usernameError: unValidation.message,
      StudentGradeError: GrdValidation.message,
      userTypeError: typeValidation.message,
      TeacherGradeError: teacGrdsValidation.message,
      selectedTeacherError: selTchrRValidation.message,
    });

    return (
      flnValidation.isValid &&
      emValidation.isValid &&
      pwValidation.isValid &&
      cfpwValidation.isValid &&
      unValidation.isValid &&
      GrdValidation.isValid &&
      typeValidation.isValid &&
      teacGrdsValidation.isValid &&
      selTchrRValidation.isValid
    );

  }

  const handleChange = (event: SelectChangeEvent) => {
    setUser({
      ...user,
      userType: event.target.value as string,
      userTypeError: "",
    });
  };

  const handleChangestudentGrade = (event: SelectChangeEvent) => {
    setUser({
      ...user,
      StudentGrade: event.target.value as string,
      StudentGradeError: "",
    });
  };

  const handleChangeSelectedTeacher = (event: SelectChangeEvent) => {
    setUser({
      ...user,
      selectedTeacher: event.target.value as string,
      selectedTeacherError: "",
    });
  };

  const handleChangeTeachersGrades = (event: SelectChangeEvent<typeof teachersGrades>) => {
    const {
      target: { value },
    } = event;
    setTeachersGrades(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setUser({
      ...user,
      TeacherGradeError: "",
    });
  };

  //register function
  const handleRegister = () => {
    setLoading(true);
    fire
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        if (authUser.user) {
          return saveUserInFirestore({
            uid: authUser.user.uid,
            fullName: user.fullName,
            userType: user.userType,
            username: user.username,
            email: user.email,
            StudentGrade: user.StudentGrade,
            TeacherGrade: teachersGrades,
            selectedTeacher: user.selectedTeacher
          })
            .then(() => {
              history.push("/login");
            })
            .catch((errorFirestore) => {
              setLoading(false)
              if (errorFirestore.includes("already in use")) {
                setErrorMsg("This email is already in use.")
              }
              else {
                setErrorMsg("Please check your network connection")
              }
              handleClick();
            })
            .finally(() => {
              setLoading(false)
            });
        }
      }).catch((error) => {
        setLoading(false);
        const errorMessage: string = error.message;
        if (errorMessage.includes("already in use")) {
          setErrorMsg("This email is already in use.")
        }
        else {
          setErrorMsg("Please check your network connection")
        }
        handleClick();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function saveUserInFirestore(userFirestore: any) {
    const db = firebase.firestore();
    if (userFirestore.uid) {
      return db.collection("users").add(userFirestore);
    } else {
      throw new Error("Invalid user!");
    }
  }

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
            Sign Up
          </Typography>
          <Box component="form" >

            <FormControl variant="outlined" style={{ minWidth: 'calc(100%)', marginTop: "30px" }}>
              <InputLabel id="demo-simple-select-filled-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={user.userType}
                onChange={handleChange}
                error={!!user.userTypeError}
              >
                <MenuItem value={'teacher'}>Teacher</MenuItem>
                <MenuItem value={'student'}>Student</MenuItem>
              </Select>
              {user.userTypeError && <FormHelperText style={{ marginLeft: "20px", color: "#bf0404", fontWeight: "normal" }}>User type cannot be empty</FormHelperText>}
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              type="text"
              error={!!user.fullNameError}
              helperText={user.fullNameError}
              onChange={(e) => {
                setUser({
                  ...user,
                  fullName: e.target.value,
                  fullNameError: "",
                });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="uname"
              label="UserName"
              name="uname"
              type="text"
              error={!!user.usernameError}
              helperText={user.usernameError}
              onChange={(e) => {
                setUser({
                  ...user,
                  username: e.target.value,
                  usernameError: "",
                });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              type="email"
              error={!!user.emailError}
              helperText={user.emailError}
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                  emailError: "",
                });
              }}
            />
            {user.userType === 'student' ? <div><FormControl variant="outlined" style={{ minWidth: 'calc(100%)', marginTop: "15px" }}>
              <InputLabel id="demo-simple-select-filled-label">Grade</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={user.StudentGrade}
                onChange={handleChangestudentGrade}
                error={!!user.StudentGradeError}
              >
                <MenuItem value={'3'}>G-03</MenuItem>
                <MenuItem value={'4'}>G-04</MenuItem>
                <MenuItem value={'5'}>G-05</MenuItem>
                <MenuItem value={'6'}>G-06</MenuItem>
                <MenuItem value={'7'}>G-07</MenuItem>
                <MenuItem value={'8'}>G-08</MenuItem>
              </Select>
            </FormControl></div> : <div>{}</div>}
            {user.StudentGradeError && <FormHelperText style={{ marginLeft: "20px", color: "#bf0404", fontWeight: "normal" }}>Grade cannot be empty</FormHelperText>}
            {
              user.userType === 'student' ? <div><FormControl variant="outlined" style={{ minWidth: 'calc(100%)', marginTop: "15px" }}>
                <InputLabel id="demo-simple-select-filled-label">Teacher</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={user.selectedTeacher}
                  onChange={handleChangeSelectedTeacher}
                  error={!!user.selectedTeacherError}
                >
                  {teacher.filter((f:any)=>(
                    f.TeacherGrade.includes(user.StudentGrade)
                  )).map((item: any) => (
                    <MenuItem value={item.uid}>{item.fullName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
                {user.selectedTeacherError && <FormHelperText style={{ marginLeft: "20px", color: "#bf0404", fontWeight: "normal" }}>Teacher cannot be empty</FormHelperText>}</div> : <div>{}</div>
            }
            {user.userType === 'teacher' ? <div><FormControl style={{ minWidth: 'calc(100%)', marginTop: "15px" }}>
              <InputLabel id="demo-multiple-chip-label">Teacher's Grades</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={teachersGrades}
                onChange={handleChangeTeachersGrades}
                error={!!user.TeacherGradeError}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected: any) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: any) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {grades.map((grade) => (
                  <MenuItem
                    key={grade}
                    value={grade}
                    style={getStyles(grade, teachersGrades, theme)}
                  >
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl></div> : <div>{}</div>}
            {user.TeacherGradeError && <FormHelperText style={{ marginLeft: "20px", color: "#bf0404", fontWeight: "normal" }}>Teacher's grade cannot be empty</FormHelperText>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={!!user.passwordError}
              helperText={user.passwordError}
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                  passwordError: "",
                });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPpassword"
              label="Confirm Password"
              type="password"
              id="confirmPpassword"
              error={!!user.confirmPasswordError}
              helperText={user.confirmPasswordError}
              onChange={(e) => {
                setUser({
                  ...user,
                  confirmPassword: e.target.value,
                  confirmPasswordError: "",
                });
              }}
            />
            {loading && (
              <div style={{ width: "100%" }}>
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
                validateRegisterFormData() && handleRegister();
              }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href={"/login"} variant="body2">
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