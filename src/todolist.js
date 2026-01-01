import React, { useState } from "react";
import "./TodoApp.css"; // Import CSS file

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      <h2>📝 My Todo List</h2>
      <div className="todo-input">
      <input type="text" value={input} 
      onChange={(e) => setInput(e.target.value)} 
      placeholder="Enter a task..." 
      onKeyDown={(e) => { if (e.key === "Enter") 
      { addTodo();  } }} />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>
            <button className="delete-btn" onClick={() => removeTodo(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
