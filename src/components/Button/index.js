import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

const Button = ({ title, labelKey, iconType, onClickHandler, isWeb, isDatabase, isDisabled }) => {
  return (
    <button
      className={cx(isWeb ? "button-web" : "button-mobile", {
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
      <label htmlFor={labelKey}>{title}</label>
    </button>
  );
};

Button.defaultProps = {
  title: "",
  labelKey: "",
  iconType: "",
  onClickHandler: () => {},
  isWeb: false,
  teamButtonMobile: false,
  isDatabase: false,
};

Button.propTypes = {
  title: PropTypes.string,
  labelKey: PropTypes.string,
  iconType: PropTypes.string,
  onClickHandler: PropTypes.func,
  isWeb: PropTypes.bool,
  teamButtonMobile: PropTypes.bool,
  isDatabase: PropTypes.bool,
};

export default React.memo(Button);
