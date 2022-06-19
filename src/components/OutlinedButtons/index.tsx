import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import CottageSharpIcon from "@mui/icons-material/CottageSharp";
import PlayCircleSharpIcon from "@mui/icons-material/PlayCircleSharp";
import Typography from "@mui/material/Typography";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";

const OutlinedButtons = (): React.ReactElement => {
  return (
    <Stack
      direction="row"
      spacing={8}
      justifyContent="center"
      alignItems="center"
    >
      <a href="/">
        <Button component="a" variant="outlined">
          <Stack direction="row" spacing={1}>
            <CottageSharpIcon />
            <Typography>ホームに戻る</Typography>
          </Stack>
        </Button>
      </a>

      <a href="#play">
        <Button component="a" variant="outlined">
          <Stack direction="row" spacing={1}>
            <PlayCircleFilledWhiteSharpIcon />
            <Typography>もう一回</Typography>
          </Stack>
        </Button>
      </a>

      {/* <Button variant='outlined'>
				<Stack direction='row' spacing={1}>
					<StarsSharpIcon />
					<Typography>ランキング</Typography>
				</Stack>
			</Button> */}
    </Stack>
  );
};

export default OutlinedButtons;
