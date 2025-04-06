import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import TaskManagerContext from "../context/TaskManagerContext";

function TaskManagerCalendar() {
  const {
    setIsDialogOpen,
    taskItem,
    setSelectedDate,
    setTaskItemEdit,
    selectedCategory,
  } = useContext(TaskManagerContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidNight = midnight - new Date();

    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, timeUntilMidNight);

    return () => clearTimeout(timer);
  }, [currentDate]);

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const today = new Date();

  const categoryTitle = selectedCategory
    ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
    : "All";

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTasksForDate = (dateStr) => {
    // const tasks = taskItem.filter((task) => task.date === dateStr);
    const tasks = taskItem.filter((task) => {
      const dateMatch = task.date === dateStr;
      const categoryMatch = selectedCategory
        ? task.type === selectedCategory
        : true;
      return dateMatch && categoryMatch;
    });

    if (tasks.length === 0) return null;

    const isDelayed =
      new Date(dateStr).setHours(0, 0, 0, 0) <
        new Date(today).setHours(0, 0, 0, 0) &&
      tasks.some((task) => !task.checked || task.checked);

    return {
      checked: tasks.some((task) => !task.checked),
      count: tasks.length,
      delayed: isDelayed,
    };
  };

  const handleClick = (day, currentMonth, dateKey, tasks) => {
    const [year, month, dayOfMonth] = dateKey.split("-").map(Number);
    const clickedDate = new Date(year, month - 1, dayOfMonth);

    const currentDateStart = new Date(today);
    currentDateStart.setHours(0, 0, 0, 0);

    if (tasks) {
      // const tasksForDate = taskItem.filter((task) => task.date === dateKey);
      const tasksForDate = taskItem.filter((task) => {
        const dateMatch = task.date === dateKey;
        const categoryMatch = selectedCategory
          ? task.type === selectedCategory
          : true;
        return dateMatch && categoryMatch;
      });

      if (tasksForDate.length > 0 && tasks.checked) {
        setIsDialogOpen(true);
        setTaskItemEdit({
          edit: true,
          item: tasksForDate[0],
        });
      }
    } else if (currentDate && clickedDate >= currentDateStart) {
      setIsDialogOpen(true);
    }

    setSelectedDate(dateKey);
  };

  const month = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentYear, month);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

  const firstDayOfMonth = getFirstDayOfMonth(currentYear, month);
  const days = [];

  // Adding previous months days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonthDay = daysInPrevMonth - i;
    const date = new Date(prevMonthYear, prevMonth, prevMonthDay);
    const dateKey = formatDateKey(date);

    days.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
      nextMonth: false,
      isToday: false,
      date: dateKey,
      tasks: getTasksForDate(dateKey),
    });
  }

  // Adding current months days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, month, i);
    const dateKey = formatDateKey(date);

    const isToday =
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    days.push({
      day: i,
      currentMonth: true,
      nextMonth: false,
      isToday,
      date: dateKey,
      tasks: getTasksForDate(dateKey),
    });
  }

  // Adding next months days
  const totalDays = days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? currentYear + 1 : currentYear;
  // 6 X 7 = 42
  const remainingDays = 42 - totalDays;

  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(nextMonthYear, nextMonth, i);
    const dateKey = formatDateKey(date);

    days.push({
      day: i,
      currentMonth: false,
      nextMonth: true,
      isToday: false,
      date: dateKey,
      tasks: getTasksForDate(dateKey),
    });
  }

  const isOlderMonth = (dateStr) => {
    const dayDate = new Date(dateStr);
    const now = new Date();

    return (
      dayDate.getFullYear() < now.getFullYear() ||
      (dayDate.getFullYear() === now.getFullYear() &&
        dayDate.getMonth() < now.getMonth()) ||
      (dayDate.getFullYear() === now.getFullYear() &&
        dayDate.getMonth() === now.getMonth() &&
        dayDate.getDate() < now.getDate())
    );
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="calendar-section">
        <div className="section-header">
          <h2 className="section-title">{`${monthName} ${year} - ${categoryTitle}`}</h2>
          <div className="header-actions">
            <button className="action-button" onClick={handlePrevMonth}>
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
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="action-button" onClick={handleNextMonth}>
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
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="calendar-header">
          {dayNames.map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, index) => {
            const isPastDate =
              new Date(day.date) < new Date(today).setHours(0, 0, 0, 0) &&
              day.currentMonth;

            return (
              <div
                key={index}
                className={`calendar-day ${day.isToday ? "current-day" : ""} ${
                  !day.currentMonth
                    ? day.nextMonth
                      ? "next-month"
                      : "prev-month"
                    : ""
                } ${isOlderMonth(day.date) ? "older-month" : ""} ${
                  isPastDate ? "past-date" : ""
                } ${day.tasks ? "has-tasks" : ""} ${
                  day.tasks?.checked === false ? "done-tasks" : ""
                }`}
                onClick={() =>
                  day.tasks
                    ? handleClick(
                        day.day,
                        day.currentMonth,
                        day.date,
                        day.tasks
                      )
                    : handleClick(day.day, day.currentMonth, day.date)
                }
              >
                <span>{day.day}</span>

                {day.tasks && day.tasks.checked && (
                  <div
                    className={`task-indicator ${
                      day.tasks.delayed ? "delayed" : "upcoming"
                    }`}
                    title={`${day.tasks.count} Task${
                      day.tasks.count > 1 ? "s" : ""
                    }`}
                  >
                    {day.tasks.count}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default TaskManagerCalendar;
