import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

// TODO: WE HAVE TO WORK ON THE FONT STYLE OF THE WHOLE WEBSITE

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <>
          <Toaster />
          <App />
        </>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);
