import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function BasicButtons2() {
  return (
    <Stack spacing={2} direction="row" justifyContent="center">
      <Button
        component="a"
        size="large"
        variant="contained"
        style={{ width: 200, height: 64, fontSize: 20 }}
      >
        Result
      </Button>
    </Stack>
  );
}
