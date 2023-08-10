import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const Button = ({ labelKey, iconType, onClickHandler }) => {
  return (
    <button className="button" onClick={onClickHandler}>
      <label htmlFor={labelKey} className="material-icons">
        {iconType}
      </label>
    </button>
  );
};

Button.defaultProps = {
  labelKey: "",
  iconType: "",
  onClickHandler: () => {},
};

Button.propTypes = {
  labelKey: PropTypes.string,
  iconType: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default React.memo(Button);
