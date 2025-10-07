# JStack State Manager — Tiny, Typed, and Fast

This repo demonstrates a minimal yet powerful React state manager built on top of `useSyncExternalStore`, applied to a Todo app. It’s the companion code for a YouTube class showing how to refactor from context-heavy state to a lean store with selector-based subscriptions and fewer re-renders.

## Why this refactor

- **Fewer re-renders**: Components subscribe to precise state slices.
- **Tiny API**: One function `createStore`, returning a hook with selectors.
- **Type-safe**: Strongly typed store and actions with TypeScript.
- **React 19 friendly**: Built on `useSyncExternalStore` for correctness.

## Demo highlights

- Add, toggle, and remove todos.
- Log in/out: new todos attribute the current user as author.
- Render counters show that unrelated components don’t re-render.

## 🚀 Tech Stack

- **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**
- **ESLint**, **Prettier**, **Husky**, **Commitlint**, **lint-staged**

## 📦 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🧹 Code Quality

```bash
# Lint
pnpm lint

# Autofix lint issues
pnpm lint:fix

# Format with Prettier
pnpm format

# Check formatting
pnpm format:check
```

## 🧠 Core idea in 60 seconds

- `createStore` creates a tiny store with local `state` and `listeners`.
- `useStore(selector)` uses `useSyncExternalStore` so a component subscribes only to derived values it cares about.
- `setState` accepts partial objects or a function `(prev) => partial` and notifies subscribers.

### Store factory

```ts
// src/store/createStore.ts
export function createStore<TState extends Record<string, any>>(
  createInitialState: (
    setState: (
      partial: Partial<TState> | ((prev: TState) => Partial<TState>)
    ) => void,
    getState: () => TState
  ) => TState
) {
  // … see file for full implementation
}
```

### Global store shape and actions

```ts
// src/store/globalStore.ts
export const useGlobalStore = createStore((setState, getState) => ({
  user: null,
  todos: [],
  login: () =>
    setState({
      user: { name: 'Artur Ceschin', email: 'arturceschin@test.com.br' }
    }),
  logout: () => setState({ user: null }),
  addTodo: (title: string) => {
    setState((prev) => ({
      todos: prev.todos.concat({
        id: Date.now(),
        title,
        author: getState().user?.name ?? 'Guest',
        done: false
      })
    }))
  },
  toggleTodoDone: (todoId: number) => {
    setState((prev) => ({
      todos: prev.todos.map((t) =>
        t.id === todoId ? { ...t, done: !t.done } : t
      )
    }))
  },
  removeTodo: (todoId: number) => {
    setState((prev) => ({ todos: prev.todos.filter((t) => t.id !== todoId) }))
  }
}))
```

### Using selectors in components

```tsx
// src/components/TodosList.tsx
const todos = useGlobalStore((state) => state.todos)
const toggleTodoDone = useGlobalStore((state) => state.toggleTodoDone)
const removeTodo = useGlobalStore((state) => state.removeTodo)
```

## 🎥 Follow along with the video

Try this sequence while watching:

1. Start the app and open the console to see render counters.
2. Add a few todos; confirm only form/list parts re-render.
3. Toggle and remove a todo; note minimal re-renders.
4. Trigger `login()` (wired in UI) and add another todo; author should be the logged user.

## 📈 Performance notes

- Select the smallest slice in each component: `useGlobalStore(state => state.todos)`.
- Keep selector outputs stable; avoid creating new objects in selectors.
- Batch related updates inside a single `setState` call when possible.

## 🎨 Project Structure

```
src/
├── components/
│   ├── AppBar.tsx
│   ├── TodoForm.tsx
│   ├── TodosCounter.tsx
│   └── TodosList.tsx
├── entities/
│   ├── ITodo.ts
│   └── IUser.ts
├── hooks/
│   └── useRenderCounter.ts
├── store/
│   ├── createStore.ts
│   └── globalStore.ts
├── utils/
│   └── cn.ts
├── App.tsx
├── main.tsx
└── assets/styles/index.css
```

## 🤝 Contributing

1. Use conventional commits.
2. Ensure lint and format checks pass.
3. Keep the store API minimal and typed.

## 📄 License

MIT

---
