import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { PokemonContextProvider, NotificationContextProvider } from "./context";
import { theme } from "./theme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <PokemonContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </PokemonContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
