import * as React from "react";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import BasicButtons from "../BasicButton";
import BasicButtons2 from "../BasicButton2";
import Grid from "@mui/material/Grid";
import MediaCard from "../Media";
import Button from "@mui/material/Button";

export default function BoxSx() {
  return (
    <Box
      m="40px auto"
      sx={{
        width: "90%",
        minHeight: 300,
        p: 2,
        border: "1px solid blue"
      }}
    >
      <Grid container justifyContent="center" alignItems="center" columns={2}>
        <Grid item xs={1}>
          {/* ユーザーアイコン */}
          {/* ユーザーName */}
          <MediaCard />
        </Grid>
        <Grid item xs={1} justifyContent="center" alignItems="center">
          {/* プレイボタン */}

          <nav>
            <ul>
              <li>
                <a href="#play">
                  <BasicButtons />
                  {/* <Button variant="contained">play</Button> */}
                </a>
              </li>
            </ul>
          </nav>
        </Grid>
      </Grid>
    </Box>
  );
}
