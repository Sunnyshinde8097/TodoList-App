import React, { useState } from "react";
import "./TodoApp.css"; // Import CSS file

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(null); // track index being edited
  const [editText, setEditText] = useState("");     // track edit input value

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const startEdit = (index) => {
    setIsEditing(index);
    setEditText(todos[index]);
  };

  const saveEdit = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? editText : todo
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
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
                <span>{todo}</span>
                 <div className="button-group"> 
                 <button className="edit-btn" onClick={() => startEdit(index)}>
                   ✏️ Edit </button>
                    <button className="delete-btn" onClick={() => removeTodo(index)}> 
                    ❌ Delete </button>
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
