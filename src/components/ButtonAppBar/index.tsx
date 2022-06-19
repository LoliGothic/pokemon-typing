import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import FaceSharpIcon from "@mui/icons-material/FaceSharp";
import { Helmet } from "react-helmet";
import { Grid } from "@mui/material";

const ButtonAppBar = (): React.ReactElement => {
  return (
    <AppBar position="static" color="primary">
      <Helmet>
        <title>Eye-Typing</title>
        <meta property="ogel:image" key="ogImage" content="/emojis/happy.png" />
        <link rel="icon" href="/emojis/happy.png" />
      </Helmet>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1}>
          <FaceSharpIcon />
          <Typography>Eye-Typing</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ButtonAppBar;
