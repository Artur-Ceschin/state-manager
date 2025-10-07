import { create } from 'zustand'
import { ITodo } from '../entities/ITodo'
import { IUser } from '../entities/IUser'

interface IGlobalStore {
  user: IUser | null
  todos: ITodo[]
  login(): void
  logout(): void
  addTodo(title: string, author?: string): void
  toggleTodoDone(todoId: number): void
  removeTodo(todoId: number): void
}

export const useGlobalStore = create<IGlobalStore>()((set, get) => ({
  user: null,
  todos: [],
  login: () =>
    set({
      user: {
        name: 'Artur Ceschin',
        email: 'arturceschin@test.com.br'
      }
    }),
  logout: () => set({ user: null }),
  addTodo: (title) => {
    set((prevState) => ({
      todos: prevState.todos.concat({
        id: Date.now(),
        title,
        author: get().user?.name ?? 'Guest',
        done: false
      })
    }))
  },
  toggleTodoDone: (todoId) => {
    set((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo
      )
    }))
  },
  removeTodo: (todoId) => {
    set((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId)
    }))
  }
}))
