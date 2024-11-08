import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";
import ScrollToTop from './components/ScrollToTop';
import SideBar from './components/SideBar';
import AuthLayout from './components/AuthLayout';
import { SidebarProvider } from './ContextApi';
import Header from './components/Header';
import Links from './pages/Links';
import Support from './pages/Support';
import Setting from './pages/Setting';
import CreateLink from './pages/CreateLink';
import Analytics from './pages/Analytics';

function App() {

  return (
    <SidebarProvider>
    <Router> {/* Wrap everything inside Router */}
      <ScrollToTop />
      <AuthLayout>
      <SideBar />
        <Routes>
          {/* Auth Routes */}
          <Route path="/Create_Link" element={<Header title="Create a Link"><CreateLink/></Header>} />
          <Route path="/Dashboard" element={<Header title="Dashboard"><Dashboard/></Header>} />
          <Route path="/Links" element={<Header title="Links"><Links/></Header>} />
          <Route path="/Support" element={<Header title="Support"><Support/></Header>} />
          <Route path="/Setting" element={<Header title="Setting"><Setting/></Header>} />
          <Route path="/Analytics" element={<Header title="Analytics"><Analytics/></Header>} />
        </Routes>
        </AuthLayout>
    </Router>
    </SidebarProvider>
  );
}

export default App;
