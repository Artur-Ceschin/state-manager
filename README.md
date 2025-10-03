# JStack State Manager

A modern todo list application built with React, TypeScript, Vite, and Tailwind CSS. This project demonstrates state management concepts and best practices for building scalable React applications.

## 🚀 Technologies

- **React 19** - UI library
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **Commitlint** - Conventional commits enforcement
- **lint-staged** - Run linters on staged files

## 📦 Installation

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
# Run ESLint
pnpm lint

# Fix ESLint errors
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check formatting
pnpm format:check
```

## 📝 Features

- ✅ Create, complete, and delete todos
- ✅ Task counter in header
- ✅ Empty state with visual feedback
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Dark theme
- ✅ Type-safe with TypeScript

## 🎨 Project Structure

```
src/
├── components/
│   ├── TodoList.tsx      # Main todo list component
│   └── TodoItem.tsx      # Individual todo item
├── types/
│   └── todo.ts           # TypeScript interfaces
├── App.tsx               # Root component
├── main.tsx              # App entry point
└── index.css             # Global styles with Tailwind
```

## 🤝 Contributing

1. Follow the conventional commits format
2. Ensure code passes linting and formatting checks
3. Write meaningful commit messages
4. Test your changes before committing

## 📄 License

MIT

---
