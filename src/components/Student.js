// import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Paper, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
// import { makeStyles, useStyles } from "tss-react/mui";
// import { makeStyles, useStyles } from "@material-ui/core/styles";

export default function Student() {
  const PaperStyle = {
    padding: "50px 20px",
    width: "600",
    margin: "20px auto",
  };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  // const classes = useStyles();
  // const { classes, cx } = useStyles({ color });
  //creat this function to handle our output
  const handleClick = (e) => {
    e.preventDefault();
    const Student = { name, address, message };
    console.log(Student);
    // connect database
    fetch("http://localhost:8072/student/add", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(Student),
    }).then(() => {
      console.log("New Student added");
    });
  };

  //react hook
  useEffect(() => {
    fetch("http://localhost:8072/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={PaperStyle}>
        <h1 style={{ color: "blue" }}>
          {" "}
          <u>Add Student & Message :)</u>{" "}
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            //the value we are typing will save here
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        {/* call the state here */}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          color="secondary"
          sx={{ m: 1 }}
          onClick={handleClick}
        >
          SUBMIT
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          color="primary"
          // onClick={}
        >
          VIEW ALL POST
        </Button>
        {/* {name}
        {address}
        {message} */}
      </Paper>
      <h1 style={{ color: "blue" }}>Student</h1>
      <Paper elevation={4} style={PaperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{
              margin: "10px",
              padding: "15px",
              textAlign: "left",
              background: "#4B9CD3",
            }}
            key={student.id}
          >
            <h3 style={{ margin: "0px" }}>
              Id: {student.id} <br />
            </h3>
            Name: {student.name} <br />
            Message:{student.message}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
