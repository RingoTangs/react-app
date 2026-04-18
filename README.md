# React App Template

A team-oriented React starter built on React 19, Vite 8, TanStack Router, TanStack Query, Tailwind CSS v4, and Vitest. The template keeps runtime defaults conservative and pushes app wiring, monitoring, and transport setup into explicit boundaries.

## Quick Start

### Requirements

- Node.js `>=22.0.0`
- pnpm `>=10.24.0`

### Run locally

```bash
pnpm install
pnpm dev
```

The dev server runs on `http://localhost:3000`.

## Scripts

```bash
pnpm dev          # start Vite dev server
pnpm build        # typecheck and create a production build
pnpm preview      # preview the built app locally
pnpm test         # run Vitest in watch mode
pnpm test:run     # run tests once
pnpm lint         # run ESLint
pnpm format:check # verify Prettier formatting
pnpm check        # lint + format + typecheck + test
```

## Project Layout

```text
src/
  app/          # app config, providers, router wiring, monitoring, HTTP factory
  shared/       # reusable UI, pure helpers, and shared assets
  features/     # business or demo capabilities grouped by domain
  routes/       # TanStack file routes and page composition
```

Key boundaries:

- `src/app/config/env.ts` is the single entry for environment-derived config.
- `src/app/providers` owns app-level providers.
- `src/app/monitoring/reportError.ts` is the integration point for Sentry or another logger.
- `src/app/http/createHttpClient.ts` provides a neutral HTTP transport factory; auth and retry should be added by feature code or app-specific plugins.
- `src/shared/ui` holds reusable UI such as `Button`, `NotFound`, and `PageErrorFallback`.
- `src/features/home` and `src/features/example-counter` demonstrate how page-level and demo capabilities should be isolated from app wiring.

## Template Defaults

- Router and React Query devtools are enabled only in development.
- Auto-import is intentionally limited to Tailwind variant helpers (`tv`, `cn`, `cx`).
- React Query uses conservative defaults: `staleTime: 30s`, `retry: 1`, `refetchOnWindowFocus: false`.
- Error boundaries recover through `QueryErrorResetBoundary` and report through a single adapter.

## Development Rules

- Use explicit imports for React, router, and app utilities.
- Keep business logic out of `app/`; add product behavior under feature modules as the project grows.
- Keep reusable UI under `shared/ui` and pure utilities under `shared/lib`.
- Do not reintroduce generic `components/` or `utils/` top-level folders; add code to `shared` or `features` instead.
- Do not hand-edit generated router output in `src/routeTree.gen.ts`.
- Run `pnpm check` before opening a PR.
