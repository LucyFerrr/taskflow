import { useState, useRef, useEffect, useContext } from "react";
import TaskManagerContext from "../../context/TaskManagerContext";
import TaskManagerAddModal from "../TaskManagerAddModal";

function Button({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { editTaskItem, deleteTaskItem, isDialogOpen, setIsDialogOpen } =
    useContext(TaskManagerContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = () => {
    editTaskItem(item);
    setIsDialogOpen(true);
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="task-menu-container" ref={menuRef}>
      <button
        className="task-menu-button"
        onClick={handleToggleMenu}
        aria-label="Task options"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>

      {isOpen && (
        <div className="task-menu-dropdown">
          <button className="menu-item edit-button" onClick={handleEditClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="menu-icon"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>
          <div className="menu-divider"></div>
          <button
            className="menu-item delete-button"
            onClick={() => {
              deleteTaskItem(item.id);
              setIsOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="menu-icon"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      )}
      <TaskManagerAddModal isOpen={isDialogOpen} onClose={handleDeleteClick} />
    </div>
  );
}

export default Button;
