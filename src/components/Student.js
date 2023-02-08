// import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Paper, Button } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
export default function Student() {
  const PaperStyle = {
    padding: "50px 20px",
    width: "600",
    margin: "20px auto",
  };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
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
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            //the value we are typing will save here
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Message"
            variant="outlined"
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
          onClick={handleClick}
        >
          SUBMIT
        </Button>
        {/* {name}
        {address}
        {message} */}
      </Paper>
    </Container>
  );
}
