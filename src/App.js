import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashbord';
import GenderFemale from "./pages/Genre/gender-female";
import GenderMale from "./pages/Genre/gender-male";
import DomainActivityPage from './pages/indicateurs/domainactivity';
import InnovationDuration from "./pages/indicateurs/innovation-duration";
import MaturityLevel from "./pages/indicateurs/maturity-level";
import Label from "./pages/Label/Label";
import Login from "./pages/Login";
import Logout from "./pages/Logout/Logout";
import Messages from "./pages/Messages/Messages";
import FundingModel from "./pages/ModeleFinance/funding-model";
import Notifications from "./pages/Notifications/Notifications";
import MarketShare from "./pages/PM/market-share";
import Revenue from "./pages/Revenue/Revenue";
import Settings from './pages/Settings/Settings';
import SignUp from "./pages/SignUp";
import StartupLifetime from "./pages/startup-lifetime/startup-lifetime";

const Mycontext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [isSettings, setIsSettings] = useState(false);

  const logout = () => {
    setIsLogin(false); 
  };

  useEffect(() => {
    if (themeMode) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('themeMode', 'light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('themeMode', 'dark');
    }
  }, [themeMode]);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    isSettings,
    setIsSettings,
    logout,
  };

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
        {!isHideSidebarAndHeader && <Header />}
        <div className='main'>
          {!isHideSidebarAndHeader && (
            <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          )}
          <div className={`content ${isHideSidebarAndHeader ? 'full' : ''} ${isToggleSidebar ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/startup-lifetime" element={<StartupLifetime />} />
              <Route path="/label" element={<Label />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/domain-activity" element={<DomainActivityPage />} />
              <Route path="/innovation-duration" element={<InnovationDuration />} />
              <Route path="/maturity-level" element={<MaturityLevel />} />
              <Route path="/gender-female" element={<GenderFemale />} />
              <Route path="/gender-male" element={<GenderMale />} />
              <Route path="/market-share" element={<MarketShare />} />
              <Route path="/funding-model" element={<FundingModel />} />
            </Routes>
          </div>
        </div>
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { Mycontext };
