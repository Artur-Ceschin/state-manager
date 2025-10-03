import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg mb-3 hover:bg-[#1f1f1f] hover:border-[#333333] transition-all animate-[slideIn_0.3s_ease]">
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={`w-5 h-5 rounded-full cursor-pointer ${
            todo.completed ? 'accent-green-500' : 'accent-white'
          }`}
        />
        <div className="flex flex-col gap-1 flex-1">
          <span
            className={`text-base ${
              todo.completed ? 'line-through text-gray-500' : 'text-white'
            }`}
          >
            {todo.title}
          </span>
          <span
            className={`text-xs ${
              todo.completed ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            Invited by {todo.createdBy}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors flex items-center justify-center"
        aria-label="Delete todo"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  )
}
