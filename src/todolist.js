import React, { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null); // track uploaded file
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, file }]);
    setInput("");
    setFile(null);
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setIsEditing(index);
    setEditText(todos[index].text);
  };

  const saveEdit = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: editText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h2>📝 My Todo List</h2>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="save-btn" onClick={() => saveEdit(index)}>
                  💾 Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                {todo.file && (
                  <div className="file-preview">
                    {todo.file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(todo.file)}
                        alt="preview"
                        className="preview-img"
                      />
                    ) : (
                      <a
                        href={URL.createObjectURL(todo.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📎 {todo.file.name}
                      </a>
                    )}
                  </div>
                )}
                <div className="button-group">
                  <button className="edit-btn" onClick={() => startEdit(index)}>
                    ✏️ Edit
                  </button>
                  <button className="delete-btn" onClick={() => removeTodo(index)}>
                    ❌ Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
