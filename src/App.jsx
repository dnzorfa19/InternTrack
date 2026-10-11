
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("interntrack-auth") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("interntrack-auth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("interntrack-auth");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/" replace />
              : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <>
                <Navbar onLogout={handleLogout} />

                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                  />
                </Routes>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
