import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const Separator = ({ title }) => {
  return <div className="separator">{`----------\u00A0${title}Image(s)\u00A0----------`}</div>;
};

Separator.defaultProps = {
  title: "",
};

Separator.propTypes = {
  title: PropTypes.string,
};

export default React.memo(Separator);
