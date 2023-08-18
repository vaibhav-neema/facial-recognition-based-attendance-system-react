import React from "react";
import Header from "./components/Header";
import SignIn from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/HomePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div>
              <Header />
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
