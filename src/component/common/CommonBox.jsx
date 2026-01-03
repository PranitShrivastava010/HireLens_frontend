import React from "react";
import { Box } from "@mui/material";
// import variants from "../../theme/variants";

const CommonBox = ({ sx = {}, children, ...props }) => {
//   const style = variant ? variants.box[variant] : {};
  return (
    <Box sx={{ ...sx }} {...props}>
      {children}
    </Box>
  );
};

export default CommonBox;
