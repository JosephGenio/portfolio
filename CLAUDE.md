# Portfolio Project

## Stack
- React (Vite)
- TailwindCSS v4 (via `@tailwindcss/vite` plugin)
- Framer Motion (animations)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Project Structure
```
src/
├── App.jsx        — Root component
├── index.css      — TailwindCSS entry (uses @import "tailwindcss")
├── main.jsx       — App entry point
└── assets/        — Static assets
```

## Conventions
- Use functional components with hooks
- Use Tailwind utility classes for styling (no separate CSS files)
- Use Framer Motion for animations (`motion` components, `animate`, `whileHover`, etc.)
- File naming: PascalCase for components, camelCase for utilities
