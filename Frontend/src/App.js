import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { useMemo } from "react";

function App() {
  // const isLogged = window.localStorage.getItem("LoggedIn");

  const isLogged = useMemo(() => window.localStorage.getItem("LoggedIn"), []);

  return (
    <div className="App">
      <Router>
        {isLogged === "true" ? <Dashboard /> : <Home />}
        <Routes>
          <Route path="/landingPage" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
