import React from "react";
import { useHash } from "./hooks/useHash";
import { App } from "./pages/App";
import Game from "./pages/Game";
import { Play } from "./pages/Play";
import { Result } from "./pages/Result";

export const RouterConfig: React.VFC = () => {
  const hash = useHash(window.location.hash);

  switch (hash) {
    case "":
      return <App />;
    case "#":
      return <App />;
    case "#result":
      return <Result />;
    case "#play":
      return <Play />;
    case "#game":
      return <Game />;
    default:
      return <h1>Not found!</h1>;
  }
};
