import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Media from "./Components/Pages/Media";
import { AuthProvider } from "./Contexts/AuthContexts";
import PrivateRoute from "./Components/Auth/PrivateRoute";
function App() {
    return (React.createElement(React.Fragment, null,
        React.createElement(AuthProvider, null,
            React.createElement(Router, null,
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
                    React.createElement(Route, { path: "/dashboard", element: React.createElement(Dashboard, null) }),
                    React.createElement(Route, { path: "/media", element: React.createElement(PrivateRoute, { role: "admin" },
                            React.createElement(Media, null)) }),
                    React.createElement(Route, { path: "/", element: React.createElement(Login, null) }))))));
}
export default App;
