import React from "react";
import Button from "@mui/material/Button";
import ButtonAppBar from "../components/ButtonAppBar";
import { Fragment } from "react";
import BoxSx from "../components/Box";

export const App: React.VFC = () => {
  return (
    <>
      <ButtonAppBar />
      <Fragment>
        <BoxSx />
      </Fragment>
    </>
  );
};
