import { Calendar, Clock, Tag } from "lucide-react";
import { useContext } from "react";
import { motion, LayoutGroup } from "framer-motion";
import TaskManagerContext from "../context/TaskManagerContext";

function TaskManagerStats() {
  const { taskItem, todayTasks } = useContext(TaskManagerContext);

  const completedItems = taskItem.filter((item) => item.checked).length;
  const progressPercentage =
    taskItem.length > 0 ? (completedItems / taskItem.length) * 100 : 0;

  const todayCompletedItems = todayTasks.filter((item) => item.checked).length;
  const progressPercentageToday =
    todayTasks.length > 0 ? (todayCompletedItems / todayTasks.length) * 100 : 0;

  const getWeekTasks = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weekTasks = taskItem.filter((item) => {
      const taskDate = new Date(item.date);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });

    return weekTasks;
  };

  const weekTasks = getWeekTasks();
  const weekCompletedItems = weekTasks.filter((item) => item.checked).length;
  const progressPercentageWeek =
    weekTasks.length > 0 ? (weekCompletedItems / weekTasks.length) * 100 : 0;

  return (
    <LayoutGroup>
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-header">
            <div>
              <p className="stats-label">Today</p>
              <h3 className="stats-value">{todayTasks.length} Tasks</h3>
            </div>
            <span className="stats-icon stats-icon-blue">
              <Clock size={20} />
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill progress-blue"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentageToday}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
          <p className="progress-text">
            {todayCompletedItems} of {todayTasks.length} completed
          </p>
        </div>

        <div className="stats-card">
          <div className="stats-header">
            <div>
              <p className="stats-label">This Week</p>
              <h3 className="stats-value">{weekTasks.length} Tasks</h3>
            </div>
            <span className="stats-icon stats-icon-green">
              <Calendar size={20} />
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill progress-green"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentageWeek}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
          <p className="progress-text">
            {weekCompletedItems} of {weekTasks.length} completed
          </p>
        </div>

        <div className="stats-card">
          <div className="stats-header">
            <div>
              <p className="stats-label">All Tasks</p>
              <h3 className="stats-value">{taskItem.length} Tasks</h3>
            </div>
            <span className="stats-icon stats-icon-purple">
              <Tag size={20} />
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill progress-purple"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
          <p className="progress-text">
            {completedItems} of {taskItem.length} completed
          </p>
        </div>
      </div>
    </LayoutGroup>
  );
}

export default TaskManagerStats;
