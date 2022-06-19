import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Types = ({ children }: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3" component="div" gutterBottom>
        {children}
      </Typography>
    </Box>
  );
};

export default Types;
