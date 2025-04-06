import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const TaskManagerContext = createContext();

export const TaskManagerProvider = ({ children }) => {
  const [taskItem, setTaskItem] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [categoryColors, setCategoryColors] = useState(() => {
    const savedColors = localStorage.getItem("categoryColors");
    return savedColors ? JSON.parse(savedColors) : {};
  });
  const [noteItem, setNoteItem] = useState(() => {
    const savedNote = localStorage.getItem("notes");
    return savedNote ? JSON.parse(savedNote) : [];
  });
  const [userInfo, setUserInfo] = useState(() => {
    const saveUser = localStorage.getItem("userInfo");
    return saveUser ? JSON.parse(saveUser) : {};
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskItemEdit, setTaskItemEdit] = useState({
    item: {},
    edit: false,
  });
  const [dialogTitle, setDialogTitle] = useState("Add New Task");
  const [buttonTitle, setButtonTitle] = useState("Add Task");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItem));
  }, [taskItem]);
  useEffect(() => {
    localStorage.setItem("categoryColors", JSON.stringify(categoryColors));
  }, [categoryColors]);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteItem));
  }, [noteItem]);

  const getRandomColor = () => {
    const colors = [
      "tag-blue",
      "tag-green",
      "tag-purple",
      "tag-yellow",
      "tag-orange",
      "tag-red",
      "tag-pink",
      "tag-teal",
      "tag-gray",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setSelectedDate("");
  };

  const addTaskItem = (newTaskItem) => {
    newTaskItem.id = uuidv4();

    if (newTaskItem.type && !(newTaskItem.type in categoryColors)) {
      const newColor = getRandomColor();
      setCategoryColors((prevColors) => ({
        ...prevColors,
        [newTaskItem.type]: newColor,
      }));
    }

    const addedTask = [newTaskItem, ...taskItem];
    setTaskItem(addedTask);
    localStorage.setItem("tasks", JSON.stringify(addedTask));
  };

  const updateTaskItem = (id, updatedItem) => {
    setTaskItem(
      taskItem.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        taskItem.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      )
    );
  };

  const editTaskItem = (item) => {
    setTaskItemEdit({
      item,
      edit: true,
    });
  };

  const deleteTaskItem = (id) => {
    setTaskItem(taskItem.filter((item) => item.id !== id));
  };

  const clearTaskItem = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete all tasks permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setTaskItem([]);
        setCategoryColors([]);
        Swal.fire("Deleted!", "Your tasks have been removed.", "success");
      }
    });
  };

  const addNoteItem = (newNoteItem) => {
    newNoteItem.id = uuidv4();

    const addedNote = [newNoteItem, ...noteItem];
    setNoteItem(addedNote);
    localStorage.setItem("notes", JSON.stringify(addedNote));
  };

  const updateNoteItem = (id, updatedItem) => {
    setNoteItem(
      noteItem.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );

    localStorage.setItem(
      "notes",
      JSON.stringify(
        noteItem.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      )
    );
  };

  const deleteNoteItem = (id) => {
    setNoteItem(noteItem.filter((item) => item.id !== id));
  };

  const toggleTask = (id) => {
    setTaskItem((previousTask) =>
      previousTask.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const todayTasks = taskItem.filter((item) => item.date === today);
  const upcomingTasks = taskItem.filter(
    (item) => new Date(item.date) > new Date(today)
  );
  const delayedTasks = taskItem.filter(
    (item) => new Date(item.date) < new Date(today)
  );

  return (
    <TaskManagerContext.Provider
      value={{
        taskItem,
        noteItem,
        setNoteItem,
        userInfo,
        setUserInfo,
        selectedCategory,
        setSelectedCategory,
        today,
        selectedDate,
        setSelectedDate,
        todayTasks,
        dialogTitle,
        setDialogTitle,
        buttonTitle,
        setButtonTitle,
        upcomingTasks,
        delayedTasks,
        taskItemEdit,
        setTaskItemEdit,
        categoryColors,
        isDialogOpen,
        setIsDialogOpen,
        toggleTask,
        addTaskItem,
        updateTaskItem,
        editTaskItem,
        deleteTaskItem,
        clearTaskItem,
        addNoteItem,
        updateNoteItem,
        deleteNoteItem,
        handleOpenDialog,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};

export default TaskManagerContext;
