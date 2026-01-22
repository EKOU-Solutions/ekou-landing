# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EKOU Solutions landing page - a bilingual (Spanish/English) marketing site built with Astro, React, and Tailwind CSS v4. The site showcases EKOU's consulting and technology services for businesses and entrepreneurs.

## Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Production build to ./dist/
npm run preview      # Preview production build
npm run lint         # ESLint for .js, .jsx, .astro files
npm run lint:fix     # ESLint with auto-fix
npm run format       # Format with Prettier
npm run format:check # Check formatting
npm run typecheck    # Run astro check
```

Pre-commit hook runs `lint-staged` (Prettier + ESLint fix on staged files).

## Architecture

### Tech Stack
- **Astro 5** - Static site generator with islands architecture
- **React 19** - Interactive components (`.jsx` files)
- **Tailwind CSS 4** - Styling via Vite plugin
- **Zustand** - State management (available but minimal use)

### Internationalization (i18n)
- Default locale: Spanish (`es`), also supports English (`en`)
- Spanish pages: `/` (no prefix)
- English pages: `/en/`
- Translation files: `src/i18n/es.json`, `src/i18n/en.json`
- Helpers in `src/i18n/utils/`:
  - `getLangFromUrl(url)` - Extract locale from URL
  - `useTranslations(lang)` - Get translation function

### Component Pattern
- **Astro components** (`.astro`) - Page sections and layout
- **React components** (`.jsx`) - Interactive elements like sliders
- Pages import section components directly (see `src/pages/index.astro`)

### Key Directories
- `src/pages/` - Route pages (index.astro for each locale)
- `src/components/` - Astro sections and React interactive components
- `src/layouts/` - Layout.astro (includes smooth scroll scripts)
- `src/i18n/` - Translation JSON files and utility functions
- `public/` - Static assets

## Code Style

- No semicolons, single quotes, trailing commas (es5)
- ESLint: StandardJS + Astro + React/Hooks/A11y rules
- `react/prop-types` disabled
- No React import needed in JSX (React 19)
