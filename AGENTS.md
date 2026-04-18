# Repository Guidelines

## Project Structure & Module Organization

Application code lives in `src/`. App wiring and infrastructure live in `src/app`, route files are under `src/routes`, reusable UI belongs in `src/shared/ui`, and pure helpers belong in `src/shared/lib`. Business or demo capabilities should be grouped under `src/features`. Generated router output is committed as `src/routeTree.gen.ts`; avoid manual edits. TypeScript config is split across `tsconfig*.json`, and repo-level tooling lives in `vite.config.ts`, `eslint.config.mjs`, and `.prettierrc`.

## Build, Test, and Development Commands

Use `pnpm` with Node `>=22`.

- `pnpm dev` starts Vite on `http://localhost:3000`.
- `pnpm build` runs TypeScript project builds, then creates a production bundle in `dist/`.
- `pnpm preview` serves the built app locally.
- `pnpm test` runs Vitest in watch mode; `pnpm test:run` is the non-interactive CI-style run.
- `pnpm lint` checks ESLint rules, `pnpm lint:fix` applies safe fixes.
- `pnpm format:check` verifies formatting, and `pnpm format` rewrites files.
- `pnpm check` is the main pre-PR gate: lint, Prettier, typecheck, and tests together.

## Coding Style & Naming Conventions

This repo uses TypeScript, React 19, and Vite with 2-space indentation, single quotes, no semicolons, and trailing commas. Prettier also sorts Tailwind classes via `prettier-plugin-tailwindcss`, including classes built with `tv()`. Use PascalCase for React components (`Counter.tsx`), camelCase for utilities (`sleep.ts`), and colocate test files as `*.spec.tsx` beside the component under test. Prefer the `@/` alias for imports from `src`.

## Testing Guidelines

Vitest runs in the `happy-dom` environment with shared setup from `src/setupTests.ts`. Write component tests with Testing Library and keep them close to the source file, for example `src/features/example-counter/ui/Counter.spec.tsx`. Cover new UI states, user interactions, and error boundaries when behavior changes. Run `pnpm test:run` before opening a PR.

## Commit & Pull Request Guidelines

Recent history follows conventional prefixes such as `chore:`, `refactor:`, and `test:`. Keep commit subjects imperative and scoped to one change. Pull requests should include a short description, linked issue when applicable, screenshots for visible UI changes, and confirmation that `pnpm check` plus relevant tests passed.

## Agent-Specific Notes

Do not hand-edit generated files unless the underlying generator input changed. Keep edits focused, avoid unrelated formatting churn, and leave the worktree clean except for intentional changes.
