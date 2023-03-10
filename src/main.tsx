import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { PokemonContextProvider } from "./context";
import { theme } from "./theme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <PokemonContextProvider>
      <App />
    </PokemonContextProvider>
  </ThemeProvider>
);
