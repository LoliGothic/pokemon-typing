import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./components/App";
import { Play } from "./components/Play";
import { Result } from "./components/Result";

export const RouterConfig: React.VFC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="result" element={<Result />} />
          <Route path="play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
