import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const StickyNote = ({ title, width, top, left }) => {
  const relativeStyle = {
    width: width,
    top: top,
    left: left,
  };

  return <div className="sticky-note" style={relativeStyle}>{`${title}`}</div>;
};

StickyNote.defaultProps = {
  title: "",
  width: "",
  top: "",
  left: "",
};

StickyNote.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
};

export default React.memo(StickyNote);
