import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchUser from "./components/SearchUser";
import EditProfile from "./components/EditProfile";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("login") ? true : false
  );
  const logoutHandler = () => {
    setIsLogin(false);
    localStorage.removeItem("login");
  };
  return (
    <div className="App">
      <Router>
        <NavBar {...{ isLogin, setIsLogin }} logoutHandler={logoutHandler} />
        <Routes>
          <Route path="/" element={null} />
          <Route path="/Login" element={<Login {...{ setIsLogin }} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/searchUser" element={<SearchUser />} />
          <Route
            path="/editProfile"
            element={<EditProfile setIsLogin={setIsLogin} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
