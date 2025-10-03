import { useState, type FormEvent } from 'react'
import type { Todo, TodoFormData } from '../types/todo'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [formData, setFormData] = useState<TodoFormData>({ title: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (formData.title.trim()) {
      const newTodo: Todo = {
        id: globalThis.crypto.randomUUID(),
        title: formData.title.trim(),
        completed: false,
        createdAt: new Date(),
        createdBy: 'Guest',
      }

      setTodos((prev) => [...prev, newTodo])
      setFormData({ title: '' })
    }
  }

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <header className="flex justify-between items-center px-10 py-6 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">JStack</h1>
          <span className="text-sm text-gray-400 flex items-center gap-2">
            <span>🚫</span>
            {todos.length === 0
              ? 'No tasks registered!'
              : `${todos.length} task${todos.length > 1 ? 's' : ''} registered!`}
          </span>
        </div>
        <button className="px-5 py-2 border border-[#333333] rounded-md text-sm hover:bg-[#1a1a1a] transition-colors">
          Login
        </button>
      </header>

      <main className="flex-1 px-10 py-8 flex flex-col">
        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Task title..."
            value={formData.title}
            onChange={(e) => setFormData({ title: e.target.value })}
            className="flex-1 px-4 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3a3a3a]"
          />
          <button
            type="submit"
            className="px-7 py-3.5 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Submit
          </button>
        </form>

        <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl min-h-[450px] flex items-center justify-center p-6">
          {todos.length === 0 ? (
            <div className="text-center flex flex-col items-center gap-4">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600 opacity-60"
              >
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
              </svg>
              <p className="text-gray-500">No tasks created!</p>
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
