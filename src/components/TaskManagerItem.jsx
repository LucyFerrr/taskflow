import { useContext } from "react";
import TaskManagerContext from "../context/TaskManagerContext";
import { Clock, Calendar } from "lucide-react";
import Button from "./shared/Button";

function TaskManagerItem({ item, isLast, isDelayed, isChecked }) {
  const { categoryColors, toggleTask } = useContext(TaskManagerContext);

  return (
    <div className={`task-item ${isLast ? "last-task" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={!!item.checked}
          onChange={() => toggleTask(item.id)}
        />
        <div className="task-details">
          <p className={`task-title ${item.checked ? "completed" : ""}`}>
            {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
          </p>
          <div className="task-meta">
            {isDelayed || isChecked ? (
              <Calendar size={14} className="meta-icon" />
            ) : (
              <Clock size={14} className="meta-icon" />
            )}
            <span>{item.date}</span>
            <span className="meta-separator"></span>
            <span
              className={`task-tag ${categoryColors[item.type] || "tag-gray"}`}
            >
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          </div>
        </div>
        <Button item={item} />
      </div>
    </div>
  );
}

export default TaskManagerItem;
