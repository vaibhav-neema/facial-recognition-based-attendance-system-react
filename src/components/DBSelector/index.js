import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

const DBSelector = ({ isWeb }) => {
  return (
    <div
      className={cx("db-selector", {
        "db-selector-web": isWeb,
      })}
    >
      <div className="capsules">
        <select name="Batch">
          <option selected value="">
            Batch
          </option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select name="Branch">
          <option selected value="">
            Branch
          </option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="E&TC">E&TC</option>
          <option value="E&I">E&I</option>
          <option value="Mech">Mech</option>
          <option value="Civil">Civil</option>
        </select>
        <select name="Section">
          <option selected value="">
            Section
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
    </div>
  );
};

DBSelector.defaultProps = {
  isWeb: false,
};

DBSelector.propTypes = {
  isWeb: PropTypes.bool,
};

export default React.memo(DBSelector);
