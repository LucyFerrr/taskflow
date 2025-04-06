import { PlusCircle } from "lucide-react";
import { useContext } from "react";
import TaskManagerList from "./TaskManagerList";
import TaskManagerStats from "./TaskManagerStats";
import TaskManagerAddModal from "./TaskManagerAddModal";
import TaskManagerContext from "../context/TaskManagerContext";
import TaskManagerCalendar from "./TaskManagerCalendar";
import TaskManagerSidePanel from "./TaskManagerSidePanel";
import { motion } from "framer-motion";

function TaskManagerMainContent({ activeSection, isDesktop }) {
  const {
    todayTasks,
    isDialogOpen,
    setIsDialogOpen,
    handleOpenDialog,
    userInfo,
  } = useContext(TaskManagerContext);

  const headerRender = (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-container">
          <div>
            <h1 className="greeting">
              Hello,{" "}
              {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}!
            </h1>
            <p className="task-summary">
              You have {todayTasks.filter((task) => !task.checked).length}{" "}
              {todayTasks.length === 1 ? "task" : "tasks"} today
            </p>
          </div>
          <motion.button
            onClick={() => handleOpenDialog(true)}
            className="add-task-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <PlusCircle size={18} className="add-icon" />
            Add Task
          </motion.button>
        </div>
      </header>
    </motion.div>
  );

  const dashboardRender = (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stats Cards */}
      <TaskManagerStats />

      {/* Calendar Section */}
      <TaskManagerCalendar />

      {/* Tasks Section */}
      <TaskManagerList />
    </motion.div>
  );

  const getMainContent = () => {
    if (activeSection === "sticky-wall" && !isDesktop) {
      return (
        <div className="sticky-notes-container">
          <TaskManagerSidePanel />
        </div>
      );
    }

    switch (activeSection) {
      case "dashboard":
        return dashboardRender;
      case "tasks":
        return <TaskManagerList />;
      case "calendar":
        return <TaskManagerCalendar />;
      default:
        return dashboardRender;
    }
  };

  return (
    <main className="main-content">
      <div className="content-wrapper">
        {activeSection !== "sticky-wall" && headerRender}
        {getMainContent()}
      </div>

      {/* Add Modal */}
      <TaskManagerAddModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      {/* Mobile Add Button */}
      {activeSection !== "sticky-wall" && (
        <div className="mobile-add-button">
          <motion.button
            className="floating-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOpenDialog(true)}
          >
            <PlusCircle size={24} />
          </motion.button>
        </div>
      )}
    </main>
  );
}

export default TaskManagerMainContent;
