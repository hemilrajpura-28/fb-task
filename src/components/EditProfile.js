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
} from "@material-ui/core";
import {
  doc,
  getFirestore,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import app from "../firebase/firebase";
import LoaderCircle from "../components/LoaderCircle";

const db = getFirestore(app);

const EditUser = ({ setIsLogin }) => {
  useEffect(() => {
    if (!localStorage.getItem("login")) {
      navigate("/login");
    }
    handleGetData();
  }, []);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    oldPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const docRef = doc(db, "users", localStorage.getItem("login"));
    const docSnap = await getDoc(docRef);
    if (docSnap.data()["password"] !== state.oldPassword) {
      alert("Enter the correct current password");
      setState({
        ...state,
        oldPassword: "",
      });
      setIsLoading(false);

      return;
    }
    if (state.oldPassword === state.password) {
      alert("Please set a passwords which was not set");
      setState({
        ...state,
        oldPassword: "",
      });
      setIsLoading(false);
      return;
    }
    const Ref = doc(db, "users", localStorage.getItem("login"));
    await updateDoc(Ref, {
      email: state.email,
      username: state.username,
      password: state.password,
    });
    setState({
      ...state,
      oldPassword: "",
    });
    alert("User Details Updated");
    setIsLoading(false);
  }
  async function handleGetData() {
    setIsLoading(true);
    const docRef = doc(db, "users", localStorage.getItem("login"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setState(docSnap.data());
    }
    setIsLoading(false);
  }

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  async function deleteAccountHandler() {
    setIsLoading(true);
    const docRef = doc(db, "users", localStorage.getItem("login"));
    const docSnap = await getDoc(docRef);
    if (docSnap.data()["password"] !== state.oldPassword) {
      setIsLoading(false);
      alert("Enter the correct current password");
      return;
    }
    await deleteDoc(doc(db, "users", localStorage.getItem("login")));
    localStorage.removeItem("login");
    setIsLogin(false);
    setIsLoading(true);
    navigate("/Login");
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
                  Edit Profile
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
                        placeholder="New Password"
                        fullWidth
                        id="password"
                        name="password"
                        variant="outlined"
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="Password"
                        placeholder="Current Password"
                        fullWidth
                        id="oldPassword"
                        name="oldPassword"
                        variant="outlined"
                        value={state.oldPassword}
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
                        Update
                      </Button>
                    </Grid>{" "}
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="button-block"
                        onClick={deleteAccountHandler}
                      >
                        Delete Account
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
export default EditUser;
