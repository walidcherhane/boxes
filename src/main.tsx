import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BoxesProvider } from "./BoxesContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BoxesProvider>
      <App />
    </BoxesProvider>
  </React.StrictMode>
);
