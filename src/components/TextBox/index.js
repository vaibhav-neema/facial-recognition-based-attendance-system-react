import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

const TextBox = ({ showDownloadButton, onDownloadButtonClick, isWeb }) => {
  return (
    <div
      className={cx("attendance-option", {
        "attendance-option-web": isWeb,
      })}
    >
      {/* <StickyNote title={"Attendance Record"} width="8rem" top={isWeb ? "-2.25%" : "-30%"} left={isWeb ? "1%" : "3%"} /> */}

      <textarea
        className={cx("text-box-input", {
          "text-box-input-web": isWeb,
        })}
        rows={isWeb ? 15 : 1}
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
  isWeb: false,
};

TextBox.propTypes = {
  title: PropTypes.bool,
  onDownloadButtonClick: PropTypes.func,
  isWeb: PropTypes.bool,
};

export default React.memo(TextBox);
