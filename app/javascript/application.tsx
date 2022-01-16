// Entry point for the build script in your package.json
import React from "react";
import { render } from "react-dom";
import App from "./components/App";

const div = document.createElement("div");
div.id = "app"

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(div)
  );
});
