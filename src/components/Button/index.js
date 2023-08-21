import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

const Button = ({ labelKey, iconType, onClickHandler, isWeb }) => {
  return (
    <button
      className={cx("button", {
        "button-web": isWeb,
      })}
      onClick={onClickHandler}
    >
      <label htmlFor={labelKey} className="material-icons" style={{ cursor: "pointer" }}>
        {iconType}
      </label>
    </button>
  );
};

Button.defaultProps = {
  labelKey: "",
  iconType: "",
  onClickHandler: () => {},
  isWeb: false,
  teamButtonMobile: false,
};

Button.propTypes = {
  labelKey: PropTypes.string,
  iconType: PropTypes.string,
  onClickHandler: PropTypes.func,
  isWeb: PropTypes.bool,
  teamButtonMobile: PropTypes.bool,
};

export default React.memo(Button);
