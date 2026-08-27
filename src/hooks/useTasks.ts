import { useEffect, useState } from 'react';
import type { Task } from '@/types/task';

const STORAGE_KEY = 'todo-app-tasks';

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text: string, dueDate: string | null) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, dueDate, completed: false },
    ]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return { tasks, addTask, toggleTask, deleteTask };
}
