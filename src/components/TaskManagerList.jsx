import { motion, LayoutGroup } from "framer-motion";
import { useContext } from "react";
import TaskManagerContext from "../context/TaskManagerContext";
import TaskManagerItem from "./TaskManagerItem";

function TaskManagerList() {
  const {
    taskItem,
    todayTasks,
    upcomingTasks,
    delayedTasks,
    handleOpenDialog,
    clearTaskItem,
    selectedCategory,
  } = useContext(TaskManagerContext);

  const filterTasks = (tasks) => {
    return selectedCategory
      ? tasks.filter((task) => task.type === selectedCategory)
      : tasks;
  };

  const categoryTile = selectedCategory
    ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
    : "All";

  return (
    <LayoutGroup>
      {/* Tasks Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="tasks-section">
          <div className="section-header">
            <h2 className="section-title">
              {`${categoryTile} Tasks for Today`}{" "}
            </h2>
            <div className="header-actions">
              <motion.button
                className="action-button"
                onClick={() => clearTaskItem()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM3 9l2.45-4.9A2 2 0 017.24 3h9.52a2 2 0 011.8 1.1L21 9"></path>
                  <path d="M12 14v3"></path>
                  <path d="M8 14v3"></path>
                  <path d="M16 14v3"></path>
                </svg>
              </motion.button>
              <motion.button
                className="action-button"
                onClick={() => handleOpenDialog()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </motion.button>
            </div>
          </div>

          <div className="task-list">
            {/* List of todays tasks */}
            {filterTasks(todayTasks).filter((item) => !item.checked).length ===
            0 ? (
              <p className="task-item-message">
                No tasks available. Start by adding one!
              </p>
            ) : (
              filterTasks(todayTasks)
                .filter((item) => !item.checked)
                .map((item, index) => (
                  <motion.div
                    className="motion-div"
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    {
                      <TaskManagerItem
                        key={item.id}
                        item={item}
                        isLast={
                          index ===
                          filterTasks(todayTasks).filter(
                            (item) => !item.checked
                          ).length -
                            1
                        }
                      />
                    }
                  </motion.div>
                ))
            )}

            {/* Upcoming Section */}
            <div className="upcoming-section">
              <h3 className="upcoming-title">Upcoming</h3>

              {/* Upcoming Task */}
              {filterTasks(upcomingTasks).filter((item) => !item.checked)
                .length === 0 ? (
                <p className="task-item-message">
                  No upcoming tasks! Enjoy your free time!
                </p>
              ) : (
                filterTasks(upcomingTasks)
                  .filter((item) => !item.checked)
                  .map((item, index) => (
                    <motion.div
                      className="motion-div"
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      {
                        <TaskManagerItem
                          key={item.id}
                          item={item}
                          isLast={
                            index ===
                            filterTasks(upcomingTasks).filter(
                              (item) => !item.checked
                            ).length -
                              1
                          }
                          isDelayed={filterTasks(upcomingTasks).length >= 1}
                        />
                      }
                    </motion.div>
                  ))
              )}
            </div>

            {/* Delayed Tasks */}
            <div className="upcoming-section">
              <h3 className="upcoming-title">Delayed</h3>

              {/* Delayed Task */}
              {filterTasks(delayedTasks).filter((item) => !item.checked)
                .length === 0 ? (
                <p className="task-item-message">
                  No delayed tasks! Keep up the good work!
                </p>
              ) : (
                filterTasks(delayedTasks)
                  .filter((item) => !item.checked)
                  .map((item, index) => (
                    <motion.div
                      className="motion-div"
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      {
                        <TaskManagerItem
                          key={item.id}
                          item={item}
                          isLast={
                            index ===
                            filterTasks(delayedTasks).filter(
                              (item) => !item.checked
                            ).length -
                              1
                          }
                          isDelayed={filterTasks(delayedTasks).length >= 1}
                        />
                      }
                    </motion.div>
                  ))
              )}
            </div>

            {/* Completed Tasks */}
            <div className="upcoming-section">
              <h3 className="upcoming-title">Completed</h3>

              {/* Upcoming Task */}
              {filterTasks(taskItem).length === 0 ? (
                <p className="task-item-message">
                  No delayed tasks! Keep up the good work!
                </p>
              ) : (
                filterTasks(taskItem)
                  .filter((item) => item.checked)
                  .map((item, index) => (
                    <motion.div
                      className="motion-div"
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      {
                        <TaskManagerItem
                          key={item.id}
                          item={item}
                          isLast={
                            index ===
                            filterTasks(taskItem).filter((item) => item.checked)
                              .length -
                              1
                          }
                          isChecked={taskItem.filter((item) => item.checked)}
                        />
                      }
                    </motion.div>
                  ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </LayoutGroup>
  );
}

export default TaskManagerList;
