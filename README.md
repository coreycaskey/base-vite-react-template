# Base Vite + React + TypeScript Template

This project serves as a **personal base template** for building modern web applications using **Vite**, **React**, and **TypeScript**. It builds upon the minimal setup created from `npm create vite@latest your-project-name -- --template react-ts` by including a collection of carefully chosen tools and configurations that reflect common best practices and personal development preferences.

## 🔧 Features & Tooling

### 🛠 Development Stack

- **Vite** — blazing-fast dev server and bundler
- **React 19** — using the modern JSX transform (`react-jsx`)
- **TypeScript** — typed React components and config files
- **Babel (via `@vitejs/plugin-react`)** — fast builds and HMR

> [!Note] > `@vitejs/plugin-react-swc` is a plugin alternative to `@vitejs/plugin-react`. It offers faster builds through speedy web compiler at the potential cost of accuracy and support. Consider the most appropriate option for you.

### 🧪 Testing

- **Vitest** — fast, Vite-native unit testing framework
- **Testing Library** — React-focused testing utilities
- **JSDOM** — DOM emulation for unit tests
- **Custom `setupTests.ts`** — centralized test setup (e.g., mocks, globals)

### 📖 Storybook

- **Storybook 8** — for developing and documenting UI components
- `.storybook` config with Vite builder and TypeScript-aware setup
- Stories are colocated in `src/.stories/`

### 🧹 Linting & Formatting

- **ESLint (flat config)** — with type-aware linting and scoped rule sets
- **Prettier** — enforced via `eslint-config-prettier`
- Plugins:
  - `@typescript-eslint`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-jsx-a11y`
  - `eslint-plugin-import`
  - `eslint-plugin-storybook`
  - `eslint-plugin-react-refresh` (for Vite HMR safety)

### 🧠 TypeScript Project References

- Modular `tsconfig.app.json`, `tsconfig.node.json`, and `tsconfig.storybook.json`
- Ensures isolated, type-checked builds per environment
- Avoids polluting app types with test or Storybook globals

### 🐶 Husky Git Hooks

This project uses [**Husky**](https://typicode.github.io/husky) to enforce pre-commit checks and maintain code quality automatically.

---

## 📦 Scripts

```bash
npm run dev               # Start Vite dev server
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Lint and fix
npm run test              # Run unit tests with Vitest
npm run storybook         # Start Storybook locally
npm run storybook:build   # Build Storybook static site
npm run format            # Format files with Prettier
```

---

## 📁 Directory Overview

```
src/
  .stories/         # Component stories for Storybook
  components/       # React UI components
  App.tsx           # Root app component
  main.tsx          # Entry point

.storybook/         # Storybook configuration
public/             # Static assets
tsconfig*.json      # TypeScript project references
eslint.config.js    # Flat ESLint config
vite.config.ts      # Vite build and plugin setup
```

---

## 🧰 Notes

- Uses `moduleResolution: "Bundler"` and `jsx: "react-jsx"`
- Path aliases can be configured in `tsconfig.app.json` and used via ESLint resolver
- ESLint errors like “No default export found” are avoided by relying on named imports and automatic JSX runtime

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Feel free to fork, clone, or extend this template to fit your workflow.
