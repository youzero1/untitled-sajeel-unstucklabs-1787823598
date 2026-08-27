import { useState, type FormEvent } from 'react';

interface AddTaskFormProps {
  onAdd: (text: string, dueDate: string | null) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, dueDate || null);
    setText('');
    setDueDate('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500"
      />
      <div className="flex gap-3">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="flex-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500"
        >
          Add
        </button>
      </div>
    </form>
  );
}
