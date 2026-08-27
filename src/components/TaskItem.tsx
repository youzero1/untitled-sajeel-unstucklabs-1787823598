import type { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatDueDate(dueDate: string): string {
  const date = new Date(dueDate + 'T00:00:00');
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function isOverdue(dueDate: string, completed: boolean): boolean {
  if (completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate + 'T00:00:00') < today;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const overdue = task.dueDate ? isOverdue(task.dueDate, task.completed) : false;

  return (
    <li className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as not done' : 'Mark as done'}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          task.completed
            ? 'border-indigo-500 bg-indigo-500'
            : 'border-slate-500 hover:border-indigo-400'
        }`}
      >
        {task.completed && (
          <svg viewBox="0 0 20 20" fill="white" className="h-3 w-3">
            <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.3 6.3-6.3a1 1 0 0 1 1.4 0z" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`truncate ${
            task.completed ? 'text-slate-500 line-through' : 'text-slate-100'
          }`}
        >
          {task.text}
        </p>
        {task.dueDate && (
          <p className={`text-xs mt-0.5 ${overdue ? 'text-red-400' : 'text-slate-500'}`}>
            Due {formatDueDate(task.dueDate)}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="shrink-0 text-slate-500 transition hover:text-red-400"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </li>
  );
}
