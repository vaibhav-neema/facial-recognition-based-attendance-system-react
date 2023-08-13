import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const TextBox = ({ showDownloadButton, onDownloadButtonClick }) => {
  return (
    <div className="attendance-option">
      <textarea
        className="text-box-input"
        rows={1}
        readOnly
        placeholder="No Records"
      ></textarea>

      {showDownloadButton && (
        <div className="download-button" onClick={onDownloadButtonClick}>
          <i className="material-icons">download</i>
        </div>
      )}
    </div>
  );
};

TextBox.defaultProps = {
  showDownloadButton: false,
  onDownloadButtonClick: () => {},
};

TextBox.propTypes = {
  title: PropTypes.bool,
  onDownloadButtonClick: PropTypes.func,
};

export default React.memo(TextBox);
