import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Media from "./Components/Pages/Media";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              // <PrivateRoute>
              //   <Dashboard />
              // </PrivateRoute>
              <Dashboard />
            }
          />
          <Route path="/media" element={<Media />} />

          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
      {/* <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider> */}
    </>
  );
}

export default App;
