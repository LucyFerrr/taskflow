import { motion } from "framer-motion";

function TaskManagerStickyNoteItem({
  item,
  handleEditStickyNote,
  handleDeleteStickyNote,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky-note ${item.color}`}
    >
      <p className="note-title">
        {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
      </p>
      <p className="note-content">
        {item.content.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <div className="note-footer">
        <span className="note-date">{item.date}</span>
        <div className="action-buttons">
          <button
            className="note-action"
            onClick={() => handleEditStickyNote(item.id)}
          >
            Edit
          </button>
          <button
            className="note-action"
            onClick={() => handleDeleteStickyNote(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskManagerStickyNoteItem;
