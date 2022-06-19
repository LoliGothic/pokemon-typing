import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export const App: React.VFC = () => {
  return (
    <>
      <h1>Sample Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="play">
              <Button variant="contained">Play</Button>
            </Link>
          </li>
          <li>
            <Link to="result">
              <Button variant="contained">Result</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
