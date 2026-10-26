import React from 'react';
import TodoItem from './TodoItem';
import { CheckCircle2, ClipboardList } from 'lucide-react';

export default function TodoList({
  todos,
  totalTodosCount,
  activeFilter,
  onToggle,
  onDelete,
  onEdit,
}) {
  if (todos.length === 0) {
    let emptyMessage = "No tasks yet. Add one above to get started!";
    let EmptyIcon = ClipboardList;

    if (totalTodosCount > 0) {
      if (activeFilter === 'completed') {
        emptyMessage = "No completed tasks yet. Finish a task to see it here!";
      } else if (activeFilter === 'active') {
        emptyMessage = "Awesome! All caught up. No active tasks remaining.";
        EmptyIcon = CheckCircle2;
      }
    }

    return (
      <div className="empty-state">
        <EmptyIcon className="empty-icon" size={44} strokeWidth={1.5} />
        <p className="empty-message">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-label="Tasks">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
