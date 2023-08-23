import React from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const CopyRight = (props) => {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link to="/">AttendEase</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyRight;
