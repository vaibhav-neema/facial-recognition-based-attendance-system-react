import React from "react";

import "./index.scss";

const Logo = () => {
  return (
    <div className="logo">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/a/ae/Devi_Ahilya_Vishwavidyalaya_Logo.png?20191204131429"
        alt=""
      />
    </div>
  );
};

export default React.memo(Logo);
