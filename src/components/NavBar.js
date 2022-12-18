import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import app from "../firebase/firebase";

const db = getFirestore(app);

export default function NavBar({ isLogin, setIsLogin, logoutHandler }) {
  useEffect(() => {}, [isLogin]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Home</Link>
            </Typography>

            {!isLogin && (
              <>
                <Link to="/Login">
                  <Button color="inherit">Login</Button>{" "}
                </Link>
                <Link to="/Register">
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )}
            {isLogin && (
              <>
                <Link to="/Login">
                  <Button color="inherit" onClick={logoutHandler}>
                    Logout
                  </Button>
                </Link>
                <Link to="/searchUser">
                  <Button color="inherit">Search User</Button>{" "}
                </Link>{" "}
                <Link to="/editProfile">
                  <Button color="inherit">Edit Profile</Button>{" "}
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
