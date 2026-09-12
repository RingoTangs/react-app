# Repository Guidelines

## Project Structure & Module Organization

Application code lives in `src/`. Application environment config and infrastructure such as the query client, router setup, and monitoring live in `src/app`; global providers, devtools, and router composition stay in `src/App.tsx`, while `src/main.tsx` only bootstraps React DOM. TanStack file routes live in `src/routes`. They may contain simple static pages and feature composition; business logic, data access, and complex page implementations belong in `src/features`. Reusable product-agnostic UI belongs in `src/shared/ui`, shared imported media belongs in `src/shared/assets`, and pure helpers belong in `src/shared/lib`. Business, demo, and public business capabilities should be grouped by domain under `src/features`; feature modules may add `api`, `model`, `hooks`, `lib`, `assets`, and `constants` by need. Repo-level ambient declarations may be added under `types/` when needed; do not scatter global `.d.ts` files under `src/`. Generated router output is committed as `src/routeTree.gen.ts`; avoid manual edits.

## Build, Test, and Development Commands

Use `pnpm@10.24.0` with Node `>=22.12.0`. `.npmrc` enables `engine-strict=true`, so installs should fail on unsupported Node versions.

- `pnpm dev` starts Vite on `http://localhost:3000`.
- `pnpm build` runs TypeScript project builds, then creates a production bundle in `dist/`.
- `pnpm preview` serves the built app locally.
- `pnpm test` runs Vitest in watch mode; `pnpm test:run` is the non-interactive CI-style run.
- `pnpm lint` checks ESLint rules, `pnpm lint:fix` applies safe fixes.
- `pnpm format` verifies Prettier formatting, and `pnpm format:fix` rewrites files.
- `pnpm check` is the main pre-PR gate: lint, Prettier, typecheck, and tests together.
- `pnpm check:fix` applies local lint fixes and Prettier formatting fixes.

## Coding Style & Naming Conventions

This repo uses TypeScript, React 19, and Vite with 2-space indentation, single quotes, no semicolons, and trailing commas. Prettier sorts Tailwind classes via `prettier-plugin-tailwindcss`, including classes built with `tv()`, and formats SVG/XML through `@prettier/plugin-xml`. Use explicit imports, PascalCase for React components (`FeatureCard.tsx`), camelCase for utilities (`formatDate.ts`), and colocate test files as `*.spec.tsx` beside the component under test. Prefer the `@/` alias for imports from `src`.

Write explanatory comments in hand-written `src` code in Simplified Chinese. Preserve API names, tool directives, reference URLs, and generator-owned comments; do not hand-edit generated files to translate their comments.

## Testing Guidelines

Vitest runs in the `happy-dom` environment with shared setup from `src/setupTests.ts`. Test-only types are managed in `tsconfig.test.json`; production app code should not rely on Vitest globals. Write component tests with Testing Library and keep them close to the source file, for example `src/features/billing/ui/BillingPage.spec.tsx`. Cover new UI states, user interactions, and error boundaries when behavior changes. Run `pnpm test:run` before opening a PR.

## Commit & Pull Request Guidelines

Recent history follows conventional prefixes such as `chore:`, `refactor:`, and `test:`. Keep commit subjects imperative and scoped to one change. Pull requests should include a short description, linked issue when applicable, screenshots for visible UI changes, and confirmation that `pnpm check` plus relevant tests passed.

## Agent-Specific Notes

Do not hand-edit generated files unless the underlying generator input changed. Do not reintroduce generic top-level `components/`, `utils/`, or `src/assets` directories; use `shared` or `features` based on ownership. Do not create empty feature subdirectories or add a top-level `src/api`; feature-specific requests belong under the owning feature unless a generated SDK or justified shared transport layer is introduced. Put fixed-URL public files in `public`, shared imported media in `src/shared/assets`, and feature-private media in `src/features/<feature>/assets`. Template examples may use local async sample data or native `fetch` inside feature `api` files, but React components, hooks, and route files should not call `fetch` directly. Do not add Axios or another HTTP client without a concrete project need. React Query examples should use feature-owned query key factories, request functions, hooks, and `queryOptions` when loaders and hooks share data. Route loaders may preload data through feature `queryOptions` and `context.queryClient.query({ ...options, staleTime: 'static' })`; do not define endpoints or query keys in routes. Keep barrel exports limited to stable public boundaries such as `shared/ui` and `shared/lib`; do not add `src/app/index.ts`, `src/features/index.ts`, route barrels, or feature subfolder barrels by default. Public business capabilities belong in `features/<domain>`, not `shared`; add `features/<feature>/index.ts` only for an intentional stable public API. Keep Vite environment access behind `src/app/env.ts`. Features must not import application environment config or other app infrastructure; pass environment-derived values through feature public interfaces. Before adding a provider, decide whether it is app composition or a feature-consumable capability: compose application providers in `src/App.tsx`, while reusable provider capabilities such as theme, auth, or i18n belong in `shared/<capability>` or `features/<domain>`. Shared code must not import `@/app/*` or read app env directly; pass environment-derived values in from callers. Page-level business components and complex pages should live in the owning feature; route files may contain simple static pages and feature composition alongside route semantics. Keep `app` free of business logic, keep route files focused on URL-to-page mapping, and keep shared code independent of app, route, and feature modules. Keep edits focused, avoid unrelated formatting churn, and leave the worktree clean except for intentional changes. README is the source of truth for the recommended directory structure overview; this file should stay focused on contributor and agent operating rules.

Use TanStack Router `errorComponent` for route-level render errors, loader errors, and route match errors. Retry route and loader failures with `router.invalidate()`. If queries use suspense or `throwOnError`, coordinate retries with `useQueryErrorResetBoundary()` before invalidating the router. Do not wrap the root route `<Outlet />` with a generic `react-error-boundary`; it does not own the router match lifecycle. `react-error-boundary` may be used inside a feature only when a local widget needs to fail independently from the rest of the page. Handle event handler, timer, and unhandled Promise errors at the call site.
