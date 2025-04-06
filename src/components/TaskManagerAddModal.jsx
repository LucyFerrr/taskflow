import React, { useState, useEffect, useContext, useCallback } from "react";
import { X, Calendar } from "lucide-react";
import TaskManagerContext from "../context/TaskManagerContext";

function TaskManagerAddModal({ isOpen, onClose }) {
  const {
    dialogTitle,
    setDialogTitle,
    buttonTitle,
    selectedDate,
    setButtonTitle,
    setIsDialogOpen,
    setTaskItemEdit,
    addTaskItem,
    updateTaskItem,
    taskItemEdit,
  } = useContext(TaskManagerContext);

  const [title, setTitle] = useState("");
  const [localDate, setLocalDate] = useState("");
  const [type, setType] = useState("Work");

  const handleClose = useCallback(() => {
    setTitle("");
    setLocalDate("");
    setType("");
    setDialogTitle("Add New Task");
    setButtonTitle("Add Task");
    setTaskItemEdit({ edit: false, item: null });
    onClose();
  }, [setDialogTitle, setButtonTitle, setTaskItemEdit, onClose]);

  useEffect(() => {
    if (isOpen && taskItemEdit.edit) {
      setTitle(taskItemEdit.item.title);
      setLocalDate(taskItemEdit.item.date);
      setType(taskItemEdit.item.type);
      setDialogTitle("Edit Current Task");
      setButtonTitle("Edit Task");
    }
  }, [taskItemEdit, setDialogTitle, setButtonTitle, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      if (taskItemEdit.edit) {
        setTitle(taskItemEdit.item.title);
        setLocalDate(taskItemEdit.item.date);
        setType(taskItemEdit.item.type);
        setDialogTitle("Edit Current Task");
        setButtonTitle("Edit Task");
      } else {
        setTitle("");
        setLocalDate(selectedDate || "");
        setType("");
        setDialogTitle("Add New Task");
        setButtonTitle("Add Task");
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      setTitle("");
      setLocalDate("");
      setType("");
    };
  }, [
    isOpen,
    handleClose,
    setDialogTitle,
    setButtonTitle,
    taskItemEdit,
    selectedDate,
  ]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") setTitle(value);
    else if (name === "date") setLocalDate(value);
    else if (name === "type") setType(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length > 1) {
      const newTaskItem = {
        title,
        date: localDate,
        type,
      };

      if (taskItemEdit.edit) {
        updateTaskItem(taskItemEdit.item.id, newTaskItem);
        handleClose();
      } else {
        addTaskItem(newTaskItem);
        handleClose();
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="task-dialog-overlay" onClick={handleOverlayClick}>
      <div className="task-dialog">
        <button
          onClick={handleClose}
          className="task-dialog-close"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <h2 className="task-dialog-title">{dialogTitle}</h2>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="task-form-group">
            <label className="task-form-label task-required" htmlFor="title">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTextChange}
              className="task-form-input"
              required
            />
          </div>
          {/* 
          <div className="task-form-group">
            <label className="task-form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={taskItem.type}
              onChange={handleChange}
              rows="3"
              className="task-form-textarea"
            />
          </div> */}

          <div className="task-form-grid">
            <div className="task-form-group">
              <label className="task-form-label" htmlFor="dueDate">
                Due Date
              </label>
              <div className="task-input-with-icon">
                <div className="task-input-icon">
                  <Calendar size={16} />
                </div>
                <input
                  type="date"
                  id="dueDate"
                  name="date"
                  value={localDate}
                  onChange={handleTextChange}
                  className="task-form-input"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* <div className="task-form-group">
              <label className="task-form-label" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={taskItem.type}
                onChange={handleChange}
                className="task-form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div> */}
          </div>

          <div className="task-form-group">
            <label className="task-form-label" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="type"
              value={type}
              onChange={handleTextChange}
              className="task-form-input"
              placeholder="e.g., Work, Personal, Study"
              required
            />
          </div>

          <div className="task-button-group">
            <button
              type="button"
              onClick={handleClose}
              className="task-button task-button-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="task-button task-button-primary">
              {buttonTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskManagerAddModal;
