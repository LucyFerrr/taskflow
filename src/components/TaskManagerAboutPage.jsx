import { Link } from "react-router-dom";
import { useContext } from "react";
import TaskManagerContext from "../context/TaskManagerContext";

function TaskManagerAboutPage() {
  const { userInfo } = useContext(TaskManagerContext);

  return (
    <div className="about-page">
      <div className="about-header">
        <Link to="/" className="back-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Dashboard
        </Link>
        <h1>About TaskFlow</h1>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Welcome to TaskFlow</h2>
          <p>
            Hello, {userInfo.name || "there"}! TaskFlow is a simple, intuitive
            task management application designed to help you organize your daily
            activities, manage your schedule, and boost your productivity.
          </p>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <ul>
            <li>
              <strong>Task Management</strong> - Create, organize, and track
              your tasks
            </li>
            <li>
              <strong>Calendar View</strong> - Visualize your schedule in a
              monthly calendar
            </li>
            <li>
              <strong>Categories</strong> - Organize tasks by work, study, and
              personal categories
            </li>
            <li>
              <strong>Sticky Notes</strong> - Keep important information readily
              accessible
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Version Information</h2>
          <p>
            <strong>TaskFlow Version:</strong> 1.0.0
          </p>
          <p>
            <strong>Last Updated:</strong> April 2025
          </p>
        </section>

        <section className="about-section">
          <h2>Your Account</h2>
          <p>
            <strong>Name:</strong> {userInfo.name || "Not set"}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email || "Not set"}
          </p>
          <button
            className="reset-button"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to reset your account? This will clear all your data."
                )
              ) {
                localStorage.clear();
                window.location.href = "/";
              }
            }}
          >
            Reset Account
          </button>
        </section>
      </div>
    </div>
  );
}

export default TaskManagerAboutPage;
