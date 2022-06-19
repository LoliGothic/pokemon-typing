import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row" justifyContent="center">
      <Button
        component="a"
        size="large"
        variant="contained"
        style={{ width: 200, height: 64, fontSize: 20 }}
      >
        Play
      </Button>
    </Stack>
  );
}
