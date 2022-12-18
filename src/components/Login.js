import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import LoaderCircle from "../components/LoaderCircle";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import app from "../firebase/firebase";
const db = getFirestore(app);

const Register = ({ setIsLogin }) => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    authflag: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/");
    }
  }, []);
  const navigate = useNavigate();
  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const docRef = doc(db, "users", state.email);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    if (
      docSnap.exists() &&
      docData.email === state.email &&
      docData.password === state.password
    ) {
      localStorage.setItem("login", state.email);
      setIsLogin(true);
      setIsLoading(false);
      alert("Login Successful");
      navigate("/searchUser");
      // docSnap.data()
    } else {
      setIsLoading(false);
      alert("Incorrect Credentials!");
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
        {isLoading && (
          <div className="loading">
            <LoaderCircle />
          </div>
        )}
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
                  Login
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
                        Submit
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
