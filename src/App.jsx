import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { CheckSquare } from 'lucide-react';
import './App.css';

const STORAGE_KEY = 'react_todos_app_data';

const DEFAULT_TODOS = [
  { id: '1', text: 'Welcome to your React Todo App! 👋', completed: false, createdAt: Date.now() - 2000 },
  { id: '2', text: 'Double-click or click the edit icon to modify a task ✏️', completed: false, createdAt: Date.now() - 1000 },
  { id: '3', text: 'Check off tasks to mark them complete ✅', completed: true, createdAt: Date.now() },
];

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse todos from localStorage', e);
    }
    return DEFAULT_TODOS;
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos to localStorage', e);
    }
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const activeTodosCount = todos.filter((t) => !t.completed).length;
  const completedTodosCount = todos.filter((t) => t.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const progressPercentage =
    todos.length > 0 ? Math.round((completedTodosCount / todos.length) * 100) : 0;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-icon-title">
          <div className="app-logo">
            <CheckSquare size={26} strokeWidth={2.2} />
          </div>
          <div>
            <h1>TaskFlow</h1>
            <p className="app-subtitle">Stay organized and get things done</p>
          </div>
        </div>

        {todos.length > 0 && (
          <div className="progress-card">
            <div className="progress-info">
              <span>Progress</span>
              <span className="progress-percent">{progressPercentage}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        )}
      </header>

      <main className="todo-card">
        <TodoInput onAddTodo={addTodo} />

        <TodoList
          todos={filteredTodos}
          totalTodosCount={todos.length}
          activeFilter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {todos.length > 0 && (
          <TodoFilter
            activeFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeTodosCount}
            completedCount={completedTodosCount}
            onClearCompleted={clearCompleted}
          />
        )}
      </main>

      <footer className="app-footer-credits">
        <p>Built with React & Vite • Local Storage Enabled</p>
      </footer>
    </div>
  );
}
