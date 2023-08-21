import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../src/pages/HomePage";
import SignIn from "./pages/LandingPage";

function App() {
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
