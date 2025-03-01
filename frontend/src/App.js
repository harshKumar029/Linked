import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";
import ScrollToTop from './components/ScrollToTop';
// import SideBar from './components/SideBar';
import AuthLayout from './components/AuthLayout';
import { AppContextProvider } from './ContextApi';
import Header from './components/Header';
import Links from './pages/Links';
import Support from './pages/Support';
import Setting from './pages/Setting';
import CreateLink from './pages/CreateLink';
import Analytics from './pages/Analytics';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const withAuthLayout = (component) => (
    <AuthLayout>{component}</AuthLayout>
  );

  return (
    <AppContextProvider>
      <Router>
        <ScrollToTop />

        <Routes>
          {/* Redirect from "/" to "/Dashboard" */}
          <Route path="/" element={<Navigate to="/Dashboard" replace />} />

          {/* Public Routes */}
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />

          {/* Protected Routes with AuthLayout */}
          <Route
            path="/Create_Link"
            element={withAuthLayout(<Header title="Create a Link"><CreateLink /></Header>)}
          />
          <Route
            path="/Dashboard"
            element={withAuthLayout(<Header title="Dashboard"><Dashboard /></Header>)}
          />
          <Route
            path="/Links"
            element={withAuthLayout(<Header title="Links"><Links /></Header>)}
          />
          <Route
            path="/Support"
            element={withAuthLayout(<Header title="Support"><Support /></Header>)}
          />
          <Route
            path="/Setting"
            element={withAuthLayout(<Header title="Setting"><Setting /></Header>)}
          />
          <Route
            path="/Analytics"
            element={withAuthLayout(<Header title="Analytics"><Analytics /></Header>)}
          />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
