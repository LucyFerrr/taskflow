import {
  Calendar,
  Home,
  List,
  HelpCircle,
  User,
  StickyNote,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import TaskManagerContext from "../context/TaskManagerContext";
import { Link } from "react-router-dom";

function TaskManagerSideBar({ activeSection, setActiveSection }) {
  const { categoryColors, userInfo, selectedCategory, setSelectedCategory } =
    useContext(TaskManagerContext);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerClass = isDesktop ? "sticky-sidebar" : "sticky-panel-mobile";

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <List size={24} />
        </div>
        <h1 className="app-title">TaskFlow</h1>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li>
            <button
              className={`nav-item ${
                activeSection === "dashboard" ? "nav-active" : ""
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              <Home size={20} className="nav-icon" />
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`nav-item ${
                activeSection === "tasks" ? "nav-active" : ""
              }`}
              onClick={() => setActiveSection("tasks")}
            >
              <List size={20} className="nav-icon" />
              Tasks
            </button>
          </li>
          <li>
            <button
              className={`nav-item ${
                activeSection === "calendar" ? "nav-active" : ""
              }`}
              onClick={() => setActiveSection("calendar")}
            >
              <Calendar size={20} className="nav-icon" />
              Calendar
            </button>
          </li>

          {containerClass === "sticky-panel-mobile" && (
            <li>
              <button
                className={`nav-item ${
                  activeSection === "sticky-wall" ? "nav-active" : ""
                }`}
                onClick={() => setActiveSection("sticky-wall")}
              >
                <StickyNote size={20} className="nav-icon" />
                Sticky Wall
              </button>
            </li>
          )}
        </ul>
        <div className="category-section">
          <h3 className="category-header">Categories</h3>
          <ul className="category-list">
            {Object.entries(categoryColors).map(([category, color]) => (
              <li key={category}>
                <button
                  className={`category-item ${
                    selectedCategory === category ? "active-category" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className={`category-dot category-${color}`}></span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
            {Object.keys(categoryColors).length > 0 && (
              <li>
                <button
                  className={`category-item ${
                    selectedCategory === null ? "active-category" : ""
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  <span className="category-dot category-tag-gray"></span>All
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div>
          <Link to={{ pathname: "/about" }} className="about-link">
            <HelpCircle size={20} className="nav-icon" />
            About
          </Link>
          <div className="user-profile">
            <div className="avatar">
              <User size={16} />
            </div>
            <div className="user-info">
              <p
                className="user-name"
                title={
                  userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)
                }
              >
                {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}
              </p>
              <p className="user-email" title={userInfo.email}>
                {userInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default TaskManagerSideBar;
