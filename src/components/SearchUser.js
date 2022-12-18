import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase/firebase";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import UserList from "./UserList";
import LoadingComponent from "../components/LoadingComponent";
const db = getFirestore(app);

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const SearchUser = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function searchUserHandler() {
    setFilteredUsers("");
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    const searchResult = users.filter((i) =>
      i.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(searchResult);
    setIsLoading(false);
  }
  return (
    <div>
      <div className="searchUser">
        <div className="searchUserSection">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name="searchValue"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <Button onClick={searchUserHandler}>Search</Button>
          </Search>

          {filteredUsers && <UserList data={filteredUsers} />}
          {isLoading && <LoadingComponent />}
          {!isLoading && filteredUsers.length <= 0 && <h2>User Not Found</h2>}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
