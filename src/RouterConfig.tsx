import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./pages/App";
import { Play } from "./pages/Play";
import { Result } from "./pages/Result";

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
