import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

const Button = ({ labelKey, iconType, onClickHandler, isWeb, isDatabase, isDisabled }) => {
  return (
    <button
      className={cx("button", {
        "button-web": isWeb,
        disabled: isDisabled,
      })}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      <label
        htmlFor={labelKey}
        className={cx("material-icons", {
          "material-symbols-rounded": isDatabase,
        })}
        style={{ cursor: "pointer" }}
      >
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
  isDatabase: false,
};

Button.propTypes = {
  labelKey: PropTypes.string,
  iconType: PropTypes.string,
  onClickHandler: PropTypes.func,
  isWeb: PropTypes.bool,
  teamButtonMobile: PropTypes.bool,
  isDatabase: PropTypes.bool,
};

export default React.memo(Button);
