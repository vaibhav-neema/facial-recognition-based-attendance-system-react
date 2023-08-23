import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const RefreshIcon = ({ onClickHandler }) => {
  return (
    <div className="refresh-icon">
      <button onClick={onClickHandler}>
        <i className="material-icons" id="refresh-button" style={{ cursor: "pointer" }}>
          refresh
        </i>
      </button>
    </div>
  );
};

RefreshIcon.defaultProps = {
  onClickHandler: () => {},
};

RefreshIcon.propTypes = {
  onClickHandler: PropTypes.func,
};

export default React.memo(RefreshIcon);
