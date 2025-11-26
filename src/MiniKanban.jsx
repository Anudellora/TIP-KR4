import React, { useState } from "react";
import "./MiniKanban.css";

const initialTasks = [
  { id: 1, text: "Сделать урок по React", status: "todo" },
  { id: 2, text: "Посмотреть новый доклад", status: "inprogress" },
  { id: 3, text: "Прочитать статью на Habr", status: "done" }
];

const columns = [
  { key: "todo", label: "TODO" },
  { key: "inprogress", label: "В процессе" },
  { key: "done", label: "Сделано" }
];

function MiniKanban() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");

  function addTask() {
    if (input.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: input.trim(), status: "todo" }
      ]);
      setInput("");
    }
  }

  function moveTask(id, direction) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const statusIndex = columns.findIndex(col => col.key === task.status);
        const newStatusIndex = statusIndex + direction;
        if (newStatusIndex >= 0 && newStatusIndex < columns.length) {
          return { ...task, status: columns[newStatusIndex].key };
        }
      }
      return task;
    }));
  }

  return (
    <div className="board">
      {columns.map((column, idx) => (
        <div className="column" key={column.key}>
          <h3>{column.label}</h3>
          {tasks
            .filter(task => task.status === column.key)
            .map(task => (
              <div className="card" key={task.id}>
                <span>{task.text}</span>
                <div className="task-btns">
                  <button
                    onClick={() => moveTask(task.id, -1)}
                    disabled={idx === 0}
                  >
                    ←
                  </button>
                  <button
                    onClick={() => moveTask(task.id, 1)}
                    disabled={idx === columns.length - 1}
                  >
                    →
                  </button>
                </div>
              </div>
            ))}
          {column.key === "todo" && (
            <div className="add-area">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Новая задача"
              />
              <button onClick={addTask}>Добавить</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MiniKanban;
