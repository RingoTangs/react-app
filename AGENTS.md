# Repository Guidelines

## Project Structure & Module Organization

Application code lives in `src/`. App infrastructure lives in `src/app`: providers, router setup, runtime config, devtools, and monitoring. TanStack file routes live in `src/routes` and should stay thin, delegating page implementation to `src/features`. Reusable product-agnostic UI belongs in `src/shared/ui`, and pure helpers belong in `src/shared/lib`. Business, demo, and public business capabilities should be grouped by domain under `src/features`; feature modules may add `api`, `model`, `hooks`, `lib`, and `constants` by need. Repo-level ambient declarations may be added under `types/` when needed. Generated router output is committed as `src/routeTree.gen.ts`; avoid manual edits.

## Build, Test, and Development Commands

Use `pnpm@10.24.0` with Node `>=22.0.0`. `.npmrc` enables `engine-strict=true`, so installs should fail on unsupported Node versions.

- `pnpm dev` starts Vite on `http://localhost:3000`.
- `pnpm build` runs TypeScript project builds, then creates a production bundle in `dist/`.
- `pnpm preview` serves the built app locally.
- `pnpm test` runs Vitest in watch mode; `pnpm test:run` is the non-interactive CI-style run.
- `pnpm lint` checks ESLint rules, `pnpm lint:fix` applies safe fixes.
- `pnpm format:check` verifies formatting, and `pnpm format` rewrites files.
- `pnpm check` is the main pre-PR gate: lint, Prettier, typecheck, and tests together.
- `pnpm check:ci` is the stable CI entrypoint and delegates to `pnpm check`.
- `pnpm check:fix` applies local lint fixes and Prettier formatting.
- `pnpm lint-staged` runs the staged-file checks used by the pre-commit hook.

## Coding Style & Naming Conventions

This repo uses TypeScript, React 19, and Vite with 2-space indentation, single quotes, no semicolons, and trailing commas. Prettier also sorts Tailwind classes via `prettier-plugin-tailwindcss`, including classes built with `tv()`. Use explicit imports, PascalCase for React components (`Counter.tsx`), camelCase for utilities (`sleep.ts`), and colocate test files as `*.spec.tsx` beside the component under test. Prefer the `@/` alias for imports from `src`.

## Testing Guidelines

Vitest runs in the `happy-dom` environment with shared setup from `src/setupTests.ts`. Write component tests with Testing Library and keep them close to the source file, for example `src/features/example-counter/ui/Counter.spec.tsx`. Cover new UI states, user interactions, and error boundaries when behavior changes. Run `pnpm test:run` before opening a PR.

## Commit & Pull Request Guidelines

Recent history follows conventional prefixes such as `chore:`, `refactor:`, and `test:`. Keep commit subjects imperative and scoped to one change. Pull requests should include a short description, linked issue when applicable, screenshots for visible UI changes, and confirmation that `pnpm check` plus relevant tests passed.

## Agent-Specific Notes

Do not hand-edit generated files unless the underlying generator input changed. Do not reintroduce generic top-level `components/` or `utils/` directories; use `shared` or `features` based on ownership. Do not create empty feature subdirectories or add a top-level `src/api`; feature-specific requests belong under the owning feature unless a generated SDK or justified shared transport layer is introduced. Template examples may use native `fetch` inside feature `api` files, but React components, hooks, and route files should not call `fetch` directly. Do not add Axios or another HTTP client without a concrete project need. React Query examples should use feature-owned query key factories, request functions, hooks, and `queryOptions` when loaders and hooks share data. Route loaders may preload data through feature `queryOptions` and `context.queryClient.ensureQueryData(...)`; do not define endpoints or query keys in routes. Keep barrel exports limited to stable public boundaries such as `shared/ui` and `shared/lib`; do not add `src/app/index.ts`, `src/features/index.ts`, route barrels, or feature subfolder barrels by default. Public business capabilities belong in `features/<domain>`, not `shared`; add `features/<feature>/index.ts` only for an intentional stable public API. Features may import stable runtime config from `@/app/config/*`, but must not depend on app wiring such as `@/app/router/*`, `@/app/providers/*`, or `@/app/monitoring/*`. Shared code must not import `@/app/*` or read app env directly; pass environment-derived values in from callers. Page-level business components should live in the owning feature, while route files should remain thin and focus on route semantics. Keep `app` free of business logic, keep route files focused on URL-to-page mapping, and keep shared code independent of app, route, and feature modules. Keep edits focused, avoid unrelated formatting churn, and leave the worktree clean except for intentional changes. README is the source of truth for the full directory tree; this file should stay focused on contributor and agent operating rules.

Use TanStack Router `errorComponent` for route-level render errors, loader errors, and route match errors. Do not wrap the root route `<Outlet />` with a generic `react-error-boundary`; it does not own the router match lifecycle. Keep `QueryErrorResetBoundary` wired in route error fallbacks so React Query errors can be retried. `react-error-boundary` may be used inside a feature only when a local widget needs to fail independently from the rest of the page. Handle event handler, timer, and unhandled Promise errors at the call site.
