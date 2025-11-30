# React App Template

A modern, production-ready React application template built with the latest web technologies. Features type-safe routing, powerful data fetching, and a beautiful UI foundation.

## ✨ Features

- ⚛️ **React 19** - Latest React with improved performance and new features
- 🔷 **TypeScript** - Full type safety and enhanced developer experience
- ⚡ **Vite** - Lightning-fast development and optimized builds
- 🧭 **TanStack Router** - Type-safe file-based routing with automatic code splitting
- 🔄 **TanStack Query** - Powerful async state management and data fetching
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework with the latest features
- 🎯 **Auto Import** - Import React hooks and utilities automatically
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🔍 **ESLint + Prettier** - Code quality and formatting
- 🪝 **Husky** - Git hooks for maintaining code quality
- 🎭 **Error Boundaries** - Graceful error handling with custom fallback UI

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- pnpm >= 10.24.0

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server with hot reload

# Build
pnpm build        # Build for production
pnpm preview      # Preview production build locally

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors automatically
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
pnpm typecheck    # Run TypeScript type checking
pnpm check        # Run all checks (lint + format + typecheck)
```

## 📁 Project Structure

```
react-app/
├── src/
│   ├── routes/              # File-based routing
│   │   ├── __root.tsx      # Root layout with error boundary
│   │   ├── index.tsx       # Home page
│   │   └── error.tsx       # Error test page
│   ├── components/
│   │   └── builtin/        # Built-in reusable components
│   │       ├── Button.tsx
│   │       ├── NotFound.tsx
│   │       ├── PageErrorFallback.tsx
│   │       ├── QueryProvider.tsx
│   │       └── Welcome.tsx
│   ├── utils/              # Utility functions
│   │   ├── dayjs.ts       # Date/time utilities
│   │   ├── env.ts         # Environment variables
│   │   ├── http.ts        # HTTP client (Axios)
│   │   └── sleep.ts       # Sleep utility
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Application entry point
│   └── style.css          # Global styles
├── public/                # Static assets
├── types/                 # TypeScript type definitions
├── vite.config.ts         # Vite configuration
├── vite.imports.ts        # Auto-import configuration
├── tsconfig.*.json        # TypeScript configuration
└── package.json
```

## 🛠️ Technology Stack

### Core

- **React 19.2.0** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server

### Routing & Data

- **@tanstack/react-router** - Type-safe routing
- **@tanstack/react-query** - Server state management
- **axios** - HTTP client

### Styling

- **Tailwind CSS v4** - Utility-first CSS
- **tailwind-variants** - Component variant management
- **tailwind-merge** - Intelligent class merging

### Development Tools

- **unplugin-auto-import** - Automatic imports
- **ESLint** (@antfu/eslint-config) - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## 🔧 Configuration

### Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
import { Button } from '@/components/builtin'
```

### Auto Import

The following are automatically imported without explicit import statements:

- **React Hooks**: `useState`, `useEffect`, `useMemo`, `useCallback`, etc.
- **React Query**: `useQuery`, `useMutation`, `useQueryClient`, etc.
- **Router**: `Link`, `useNavigate`
- **Tailwind**: `tv`, `cn`, `cx`
- **Utils**: All functions from `src/utils/`

### HTTP Client

Pre-configured Axios instance with:

- Auto token injection from localStorage
- Request/response interceptors
- Retry logic
- Error handling by status code

```typescript
import http from '@/utils/http'

// Use the http client
const data = await http.get('/endpoint')
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.example.com
```

Access in code via:

```typescript
import { env } from '@/utils/env'
const apiUrl = env.VITE_API_BASE_URL
```

## 🎨 Styling

This template uses Tailwind CSS v4 with a custom configuration. The design system includes:

- Responsive design utilities
- Custom color schemes with gradients
- Glassmorphism effects
- Smooth transitions and animations

Example component with Tailwind Variants:

```typescript
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'rounded px-4 py-2',
  variants: {
    intent: {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
  },
})
```

## 🧪 Error Handling

The app includes comprehensive error handling:

- **Error Boundaries**: Catch React component errors
- **Custom Fallback UI**: Beautiful error pages
- **404 Page**: Custom not found page
- **Query Error Reset**: Integration with React Query error recovery

## 📝 Code Quality

### Pre-commit Hooks

Husky and lint-staged automatically run on commit:

- ESLint fixes
- Prettier formatting
- Only on staged files

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semi-colons**: No
- **Trailing commas**: Yes
- **Line endings**: LF

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

The optimized files will be in the `dist/` directory.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TanStack](https://tanstack.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

---

Built with ❤️ using modern web technologies
