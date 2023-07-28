import React from "react";
// import UploadButton from "./UploadButton";
// import Button from '@mui/material/Button';
import "./SimpleContainer";
import Header from "./Header";
// import SimpleContainer from "./SimpleContainer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Contact from "./Contact";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" exact element={<SignIn />} />
        <Route path="/register" exact element={<SignUp />} />
        <Route path="/contact" exact element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
