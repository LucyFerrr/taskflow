import { useContext, useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import TaskManagerContext from "../context/TaskManagerContext";
import TaskManagerStickyNoteItem from "./TaskManagerStickyNoteItem";

function TaskManagerSidePanel() {
  const { noteItem, addNoteItem, deleteNoteItem, updateNoteItem } =
    useContext(TaskManagerContext);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getRandomColor = () => {
    const colors = [
      "note-yellow",
      "note-blue",
      "note-green",
      "note-pink",
      "note-orange",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleAddStickyNote = () => {
    Swal.fire({
      title: "Add New Sticky Note",
      html: `
        <input id="note-title" class="swal2-input" placeholder="Note Title">
        <textarea id="note-content" class="swal2-textarea" placeholder="Note Content"></textarea>
      `,
      preConfirm: () => {
        const title = document.getElementById("note-title").value;
        const content = document.getElementById("note-content").value;
        if (!title || !content) {
          Swal.showValidationMessage("Please fill in both fields.");
          return false;
        }

        if (title.trim().length > 1) {
          const newNoteItem = {
            title,
            content,
            date: new Date().toLocaleDateString("en-us", {
              month: "short",
              day: "numeric",
            }),
            color: getRandomColor(),
          };

          addNoteItem(newNoteItem);
        }
      },
    });
  };

  const handleEditStickyNote = (noteId) => {
    const existingNote = noteItem.find((note) => note.id === noteId);
    if (!existingNote) return;

    Swal.fire({
      title: "Edit Sticky Note",
      html: `
        <input id="note-title" class="swal2-input" placeholder="Note Title" value="${existingNote.title}">
        <textarea id="note-content" class="swal2-textarea" placeholder="Note Content">${existingNote.content}</textarea>
      `,
      preConfirm: () => {
        const title = document.getElementById("note-title").value;
        const content = document.getElementById("note-content").value;
        if (!title || !content) {
          Swal.showValidationMessage("Please fill in both fields.");
          return false;
        }
        const newNoteItem = {
          title,
          content,
          date: new Date().toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
          }),
        };

        updateNoteItem(noteId, newNoteItem);
      },
    });
  };

  const handleDeleteStickyNote = (noteId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this sticky note!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNoteItem(noteId);
        Swal.fire("Deleted!", "Your sticky note has been removed.", "success");
      }
    });
  };

  const containerClass = isDesktop ? "sticky-sidebar" : "sticky-panel-mobile";

  return (
    <aside className={containerClass}>
      <div className="sidebar-header">
        <h2 className="section-title">Sticky Notes</h2>
        <button className="action-button" onClick={handleAddStickyNote}>
          <PlusCircle size={20} />
        </button>
      </div>

      {/* Sticky Notes */}
      <div className="sticky-notes">
        {noteItem.length > 0 ? (
          noteItem.map((item) => (
            <TaskManagerStickyNoteItem
              key={item.id}
              handleEditStickyNote={handleEditStickyNote}
              handleDeleteStickyNote={handleDeleteStickyNote}
              item={item}
            />
          ))
        ) : (
          <p className="note-item-message">
            Got something to list? Add a sticky note!
          </p>
        )}
      </div>
    </aside>
  );
}

export default TaskManagerSidePanel;
