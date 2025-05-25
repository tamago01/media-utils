import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Contexts/AuthContexts";
createRoot(document.getElementById("root")).render(React.createElement(StrictMode, null,
    React.createElement(AuthProvider, null,
        React.createElement(App, null))));
