import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit3, X } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
      setIsEditing(false);
    } else {
      // If cleared, delete or revert? Revert to avoid accidental delete
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        type="button"
        className={`checkbox-btn ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {isEditing ? (
        <div className="todo-edit-container">
          <input
            ref={editInputRef}
            type="text"
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Edit task description"
          />
          <div className="edit-actions">
            <button
              type="button"
              className="action-btn save-btn"
              onClick={handleSave}
              title="Save (Enter)"
              aria-label="Save edited task"
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              className="action-btn cancel-btn"
              onClick={() => {
                setEditText(todo.text);
                setIsEditing(false);
              }}
              title="Cancel (Esc)"
              aria-label="Cancel editing"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <span
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {todo.text}
          </span>

          <div className="item-actions">
            <button
              type="button"
              className="action-btn edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit task"
              aria-label={`Edit ${todo.text}`}
            >
              <Edit3 size={16} />
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => onDelete(todo.id)}
              title="Delete task"
              aria-label={`Delete ${todo.text}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
