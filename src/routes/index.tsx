import { createFileRoute } from '@tanstack/react-router';
import { useTasks } from '@/hooks/useTasks';
import { Header } from '@/components/Header';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-md">
        <Header total={tasks.length} completed={completed} />
        <AddTaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </div>
  );
}
