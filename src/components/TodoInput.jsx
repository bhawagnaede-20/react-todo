import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddTodo(trimmed);
    setText('');
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Add new task"
        autoFocus
      />
      <button 
        type="submit" 
        className="todo-submit-btn" 
        disabled={!text.trim()} 
        aria-label="Add task"
      >
        <Plus size={20} />
        <span>Add</span>
      </button>
    </form>
  );
}
