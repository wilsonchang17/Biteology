import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container); // 使用 createRoot 代替 ReactDOM.render

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);