// app.js
const { useState } = React;

const initialTasks = [
  { id: 1, text: "Сделать урок по Golang", status: "todo" },
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
        if (
          newStatusIndex >= 0 &&
          newStatusIndex < columns.length
        ) {
          return { ...task, status: columns[newStatusIndex].key };
        }
      }
      return task;
    }));
  }

  return (
    React.createElement("div", { className: "board" },
      columns.map((column, idx) =>
        React.createElement("div", { className: "column", key: column.key },
          React.createElement("h3", null, column.label),
          tasks
            .filter(task => task.status === column.key)
            .map(task =>
              React.createElement("div", { className: "card", key: task.id },
                React.createElement("span", null, task.text),
                React.createElement("div", { className: "task-btns" },
                  React.createElement("button", {
                    onClick: () => moveTask(task.id, -1),
                    disabled: idx === 0
                  }, "←"),
                  React.createElement("button", {
                    onClick: () => moveTask(task.id, 1),
                    disabled: idx === columns.length - 1
                  }, "→")
                )
              )
            ),
          column.key === "todo" &&
            React.createElement("div", { className: "add-area" },
              React.createElement("input", {
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Новая задача"
              }),
              React.createElement("button", { onClick: addTask }, "Добавить")
            )
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(MiniKanban));
