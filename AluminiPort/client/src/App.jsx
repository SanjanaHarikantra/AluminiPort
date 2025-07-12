import React from "react";
import "./App.css";

// Pages & Components
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import NewUser from "./Pages/NewUser";            // renamed from AddUser
import UserDetail from "./Pages/UserDetail";
import UpdateUser from "./Pages/UpdateUser";
import DeleteUser from "./Pages/DeleteUser";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// 🔒 Private route wrapper to check login
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

// 🌐 Main App Function
function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* User-related Routes (Protected) */}
        <Route
          path="/add-user"
          element={
            <PrivateRoute>
              <NewUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-detail/:id"
          element={
            <PrivateRoute>
              <UserDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-user/:id"
          element={
            <PrivateRoute>
              <UpdateUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-user/:id"
          element={
            <PrivateRoute>
              <DeleteUser />
            </PrivateRoute>
          }
        />

        {/* Catch-all for invalid URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// 🧭 Conditional Navbar for certain pages
function ConditionalNavbar() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];
  return !hideNavbarPaths.includes(location.pathname) ? <Navbar /> : null;
}

export default App;
