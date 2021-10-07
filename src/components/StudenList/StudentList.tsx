import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { SideBar } from "../Common/SideBar/SideBar";
import { useFirestore } from "reactfire";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AuthContext } from "../../contexts/userContext";

interface Student {
    uid: string;
    userType: string;
    fullName: string;
    username: string;
    email: string;
    StudentGrade: string;
    selectedTeacher: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export function StudentList() {
    const db = firebase.firestore();
    const username = "user";
    const [student, setStudent] = useState<Student[]>([]);
    const store = useFirestore();
    const authContext = useContext(AuthContext);  
    
    const currentPath = window.location.pathname;
    const tId = currentPath.substr(currentPath.indexOf("classrooms/") + 11);

    console.log("tId", authContext);

    useEffect(() => {
        setStudent([]);

        const unsubscriber = store
            .collection("users")
            .where("userType", "==", "student")
            .onSnapshot({}, (snapshot) => {
                snapshot.docChanges().forEach((change, i) => {
                    if (change.type === "added") {
                        setStudent((ps) => {
                            if (ps.filter((item) => item.uid === change.doc.id).length <= 0) {
                                ps.push({
                                    uid: change.doc.id,
                                    email: change.doc.data().email,
                                    userType: change.doc.data().userType,
                                    fullName: change.doc.data().fullName,
                                    username: change.doc.data().username,
                                    StudentGrade: change.doc.data().StudentGrade,
                                    selectedTeacher: change.doc.data().selectedTeacher,
                                });
                            }
                            return Object.assign([], ps);
                        });
                    }
                    if (change.type === "modified") {
                        setStudent((ps) => {
                            const modified = ps.map((a) => {
                                if (a.uid === change.doc.id) {
                                    return {
                                        uid: change.doc.id,
                                        email: change.doc.data().email,
                                        userType: change.doc.data().userType,
                                        fullName: change.doc.data().fullName,
                                        username: change.doc.data().username,
                                        StudentGrade: change.doc.data().StudentGrade,
                                        selectedTeacher: change.doc.data().selectedTeacher,
                                    };
                                } else {
                                    return a;
                                }
                            });
                            return Object.assign([], modified);
                        });
                    }
                    if (change.type === "removed") {
                        setStudent((ps) => {
                            const removed = ps.filter((a) => a.uid !== change.doc.id);
                            return Object.assign([], removed);
                        });
                    }
                });
            });

        return unsubscriber;
    }, [store]);


    console.log("student", student)

    return (
        <div className="class_list">
            <div className="header">
                <div className="header__left">
                    <i id="menu" className="material-icons">menu</i>
                    <img
                        src="https://www.youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg?cache=72a5d9c"
                        alt=""
                    />
                    <a href="/">
                        <img src="logos/logo.png" alt="" style={{ width: "50%" }} />
                    </a>
                </div>


                <div className="header__icons">
                    <i className="material-icons">notifications</i>
                    <div className="dropdown">
                        <button className="dropbtn"><i className="material-icons display-this">account_circle</i></button>
                        <div className="dropdown-content">
                            <a href="/login">LogOut</a>
                            <p>{username}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mainBody">
                <SideBar />
                <div className="container">
                    <div className="title">
                        <h5>Student List</h5>
                    </div>
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Full Name</StyledTableCell>
                                        <StyledTableCell align="right">Username</StyledTableCell>
                                        <StyledTableCell align="right">Email</StyledTableCell>
                                        <StyledTableCell align="right">Grade</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                        student.filter((item : any)=>(
                                            (item.selectedTeacher === authContext.uid && item.StudentGrade === tId.toString())
                                        )).map((row:any) => (
                                            <StyledTableRow key={row.uid}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.fullName}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.username}</StyledTableCell>
                                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                                            <StyledTableCell align="right">{row.StudentGrade}</StyledTableCell>
                                        </StyledTableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}