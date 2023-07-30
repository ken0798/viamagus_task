import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterLayer } from "./routes";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterLayer />
    <Toaster />
  </React.StrictMode>
);
