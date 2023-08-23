import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import Logo from "../Logo";
import RefreshIcon from "../RefreshIcon";
import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const AppBar = ({ title, subTitle, isWeb }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        sessionStorage.removeItem("Auth Token");
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
        {subTitle && <div className="sub-title">{subTitle}</div>}
      </div>
      <div
        className={cx("app-bar-icons", {
          "app-bar-icons-web": isWeb,
        })}
      >
        <RefreshIcon onClickHandler={reloadPage} />
        <LogoutIcon onClick={handleLogout} sx={{ color: "white", fontSize: "28px", marginLeft: "0.5vw" }} />
      </div>
    </div>
  );
};

AppBar.defaultProps = {
  title: "AttendEase",
  subTitle: ``,
  isWeb: false,
};

AppBar.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  isWeb: PropTypes.bool,
};

export default React.memo(AppBar);
