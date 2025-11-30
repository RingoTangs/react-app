# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (port 3000)
pnpm build        # Type-check and build for production
pnpm typecheck    # Run TypeScript type checking
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm format       # Format with Prettier
pnpm check        # Run lint + format check + typecheck
```

## Architecture

This is a React 19 + TypeScript + Vite app using:

- **Routing**: TanStack Router with file-based routing in `src/routes/`. Routes auto-generate `src/routeTree.gen.ts` (do not edit).
- **Data Fetching**: TanStack Query with `QueryProvider` wrapper.
- **Styling**: Tailwind CSS v4 with `tailwind-variants` for component variants. Use `tv()`, `cn()`, `cx()` utilities.
- **Error Handling**: `react-error-boundary` with `QueryErrorResetBoundary` at root level.

## Auto-Imports

`unplugin-auto-import` provides global access (no imports needed) for:

- React hooks: `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `useContext`, `StrictMode`
- React Query: `useQuery`, `useMutation`, `useQueryClient`, `queryOptions`, etc.
- Router: `Link`, `TanStackRouterDevtools`
- Utilities from `src/utils/`: all exports are auto-imported
- UI: `tv`, `cn`, `cx` from tailwind-variants, `ErrorBoundary`

Types are generated to `types/auto-imports.d.ts`.

## Path Alias

Use `@/` to import from `src/` (e.g., `import Foo from '@/components/Foo'`).
