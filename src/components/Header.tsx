interface HeaderProps {
  total: number;
  completed: number;
}

export function Header({ total, completed }: HeaderProps) {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold text-slate-100">My Tasks</h1>
      <p className="text-slate-400 mt-1">
        {total === 0
          ? 'No tasks yet — add one below'
          : `${completed} of ${total} completed`}
      </p>
    </header>
  );
}
