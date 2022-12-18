import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
} from "@material-ui/core";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import app from "../firebase/firebase";
import { inputAdornmentClasses } from "@mui/material";
import emailjs, { send } from "emailjs-com";
const db = getFirestore(app);

const Register = () => {
  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/");
    }
  }, []);
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    authflag: 1,
  });

  function handleChange(event) {
    console.log(state);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const docRef = doc(db, "users", state.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("User already exists, Go for Login or different email");
      // docSnap.data()
    } else {
      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", state.email), {
        email: state.email,
        username: state.username,
        password: state.password,
      });
      alert("registered");
      navigate("/Login");
    }
  }

  return (
    <div>
      <AppBar position="" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justify="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">FB</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="email"
                        id="email"
                        variant="outlined"
                        value={state.email}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="Username"
                        fullWidth
                        name="username"
                        id="username"
                        variant="outlined"
                        value={state.username}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        id="password"
                        name="password"
                        variant="outlined"
                        value={state.password}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Register;
