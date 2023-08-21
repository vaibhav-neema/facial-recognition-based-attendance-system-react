import React from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import RefreshIcon from "../RefreshIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import "./index.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AppBar = ({ title, subTitle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // alert(errorMessage);
      });
  };
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="app-bar">
      <Logo />

      <div className="app-bar-content">
        <div className="title">{title}</div>
        <div className="sub-title">{subTitle}</div>
      </div>
      <div className="app-bar-icons">
        <RefreshIcon onClickHandler={reloadPage} />
        <LogoutIcon color="white" onClick={handleLogout} />
      </div>
    </div>
  );
};

AppBar.defaultProps = {
  title: "FaceIn",
  subTitle: `IET-DAVV \u00A0 E&TC`,
};

AppBar.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default React.memo(AppBar);
