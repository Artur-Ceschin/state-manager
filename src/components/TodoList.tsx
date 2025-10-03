import { useState, type FormEvent } from 'react'
import { type Todo, type TodoFormData } from '../types/todo'
import { TodoItem } from './TodoItem'
import styles from './TodoList.module.scss'

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

      setTodos(prev => [...prev, newTodo])
      setFormData({ title: '' })
    }
  }

  const handleToggle = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDelete = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
            <text x="0" y="24" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" fill="#ffffff">JStack</text>
          </svg>
          <span className={styles.logoIcon}>
            {todos.length === 0 ? 'No tasks registered!' : `${todos.length} task${todos.length > 1 ? 's' : ''} registered!`}
          </span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.loginButton}>Login</button>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Task title..."
            value={formData.title}
            onChange={(e) => setFormData({ title: e.target.value })}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>

        <div className={styles.todoContainer}>
          {todos.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
                </svg>
              </div>
              <p className={styles.emptyText}>No tasks created!</p>
            </div>
          ) : (
            <div className={styles.todoList}>
              {todos.map(todo => (
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
