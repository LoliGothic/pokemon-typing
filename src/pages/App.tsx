import React from "react";
import Button from "@mui/material/Button";
import ButtonAppBar from "../components/ButtonAppBar";

export const App: React.VFC = () => {
  return (
    <>
      <ButtonAppBar />
      <h1>Sample Home</h1>
      <nav>
        <ul>
          <li>
            <a href="#play">
              <Button variant="contained">Play</Button>
            </a>
          </li>
          <li>
            <a href="#result">
              <Button variant="contained">Result</Button>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
