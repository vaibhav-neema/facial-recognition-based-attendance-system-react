import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "../src/pages/HomePage";
import SignIn from "./pages/LandingPage";

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div>
              <SignIn />
            </div>
          }
        />
        <Route path="/home" exact element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
