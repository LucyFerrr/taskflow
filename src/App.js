import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskManagerSideBar from "./components/TaskManagerSideBar";
import TaskManagerMobileHeader from "./components/TaskManagerMobileHeader";
import TaskManagerMainContent from "./components/TaskManagerMainContent";
import TaskManagerSidePanel from "./components/TaskManagerSidePanel";
import { TaskManagerProvider } from "./context/TaskManagerContext";
import TaskManagerWelcomeScreen from "./components/TaskManagerWelcomeScreen";
import TaskManagerAboutPage from "./components/TaskManagerAboutPage";
// import SettingPage from "./pages/SettingPage";

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1280;
      setIsDesktop(newIsDesktop);

      if (newIsDesktop && activeSection === "sticky-wall") {
        setActiveSection("dashboard");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  const checkUserInfo = () => {
    try {
      const savedUserInfo = localStorage.getItem("userInfo");
      if (savedUserInfo) {
        const parsedInfo = JSON.parse(savedUserInfo);
        if (parsedInfo && parsedInfo.name && parsedInfo.email) {
          setUserInfo(parsedInfo);
          return;
        }
      }
      setUserInfo(null);
    } catch (error) {
      console.error("Error reading user info:", error);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserInfo();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userInfo" || e.key === null) {
        checkUserInfo();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleWelcomeComplete = (info) => {
    setUserInfo(info);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!userInfo) {
    return <TaskManagerWelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <TaskManagerProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  {/* Sidebar */}
                  <TaskManagerSideBar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />

                  {/* Mobile Header */}
                  <TaskManagerMobileHeader
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />

                  {/* Main Content */}
                  <TaskManagerMainContent
                    activeSection={activeSection}
                    isDesktop={isDesktop}
                  />

                  {/* Side Panel (Sticky Notes) */}
                  {isDesktop && activeSection !== "sticky-wall" && (
                    <TaskManagerSidePanel />
                  )}
                </>
              }
            ></Route>

            <Route path="/about" element={<TaskManagerAboutPage />} />
          </Routes>
        </div>
      </Router>
    </TaskManagerProvider>
  );
}

export default App;
