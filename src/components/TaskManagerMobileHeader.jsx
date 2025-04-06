import { useState, useEffect } from "react";
import { List, User, X } from "lucide-react";
import TaskManagerSideBar from "./TaskManagerSideBar";

function TaskManagerMobileHeader({ activeSection, setActiveSection }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSidebarVisible &&
        e.target.closest(".mobile-sidebar-overlay") &&
        !e.target.closest(".sidebar")
      ) {
        setIsSidebarVisible(false);
      }
    };

    if (isSidebarVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarVisible]);

  return (
    <>
      <div className="mobile-header">
        <div className="mobile-header-content">
          <button className="mobile-menu-button" onClick={toggleSidebar}>
            <List size={24} />
          </button>
          <h1 className="app-title">TaskFlow</h1>
          <button className="mobile-profile-button">
            <User size={24} />
          </button>
        </div>

        {isSidebarVisible && (
          <div className="mobile-sidebar-overlay">
            <div className="mobile-sidebar">
              <button className="close-sidebar-btn" onClick={toggleSidebar}>
                <X size={24} />
              </button>
              <TaskManagerSideBar
                activeSection={activeSection}
                setActiveSection={(section) => {
                  setActiveSection(section);
                  setIsSidebarVisible(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TaskManagerMobileHeader;
