# Copilot Instructions for EKOU Landing

## Project Overview

**EKOU Solutions Landing Page** - A bilingual (Spanish/English) marketing website built with Astro 5, React 19, and Tailwind CSS v4. This static site showcases EKOU's consulting and technology services for businesses and entrepreneurs.

**Repository Stats:**
- Size: ~11MB
- Files: ~106 files total
- Languages: JavaScript/JSX (React), Astro, CSS
- Target Runtime: Node.js 20.x
- Build Output: Static HTML/CSS/JS to `./dist/`

## Tech Stack

- **Astro 5** (v5.16.6) - Static site generator with islands architecture
- **React 19** (v19.2.3) - Interactive components in `.jsx` files (no React import needed)
- **Tailwind CSS 4** (v4.1.18) - Styling via Vite plugin
- **Zustand** - State management (available but minimally used)
- **Lucide React** - Icon library
- **Splide** - Slider/carousel components

## Build & Validation Commands

### Essential Command Sequence

**ALWAYS use `npm ci` for clean installs** (never `npm install` in CI or after fresh clone):

```bash
npm ci              # Install dependencies (uses package-lock.json)
npm run lint        # Lint .js, .jsx, .astro files (must pass for CI)
npm run typecheck   # Run Astro type checking (has warnings but won't block build)
npm run build       # Build to ./dist/ (takes ~5-10 seconds)
```

### All Available Commands

```bash
npm run dev         # Dev server at localhost:4321
npm run build       # Production build to ./dist/
npm run preview     # Preview production build locally
npm run lint        # ESLint for .js, .jsx, .astro files (must pass)
npm run lint:fix    # ESLint with auto-fix
npm run format      # Format all files with Prettier
npm run format:check # Check formatting (won't block build)
npm run typecheck   # Astro check (has warnings, won't block build)
```

### Pre-commit Hook

Husky runs `lint-staged` on staged files which automatically runs:
1. Prettier formatting (`--write`)
2. ESLint with auto-fix

### CI Pipeline (.github/workflows/ci-deploy.yml)

The CI job runs on all PRs and pushes to main. It **MUST** pass:

```bash
npm ci              # Clean install (required, not npm install)
npm run lint        # Must pass (exit code 0)
npm run typecheck   # Currently has warnings but doesn't fail
npm run build       # Must succeed
```

**Critical:** If you modify dependencies, always test with `npm ci` in a clean environment. Using `npm install` may not install dependencies correctly if package-lock.json is out of sync.

### Known Issues

1. **Typecheck warnings**: `npm run typecheck` shows TypeScript warnings but doesn't fail the build:
   - Missing `@astrojs/check` and `typescript` in package.json (present in node_modules via deps)
   - Deprecated Lucide icon imports (Linkedin, Instagram, Dribbble)
   - Missing type for `getRelativeLocaleUrl` from 'astro:i18n'
   - Various implicit 'any' types in .astro files
   - These warnings are expected and don't block CI

2. **Format check**: Some files may fail `npm run format:check` but this doesn't block CI

## Project Structure

### Directory Layout

```
/
├── src/
│   ├── pages/              # Route pages
│   │   ├── index.astro     # Spanish homepage (/)
│   │   └── en/
│   │       └── index.astro # English homepage (/en/)
│   ├── components/         # 22 Astro + 10 React components
│   │   ├── *.astro         # Static sections (Navbar, Footer, Welcome, etc.)
│   │   ├── *.jsx           # Interactive (ContactForm, CasesSlider, ServicePhases)
│   │   └── icons/          # Custom icon components
│   ├── layouts/
│   │   └── Layout.astro    # Main layout with smooth scroll scripts
│   ├── i18n/               # Internationalization
│   │   ├── es.json         # Spanish translations
│   │   ├── en.json         # English translations
│   │   └── utils/          # getLangFromUrl(), useTranslations()
│   ├── data/
│   │   └── casesData.js    # Case study data
│   ├── store/
│   │   └── phasesStore.js  # Zustand store (minimal usage)
│   ├── assets/             # Images and SVG assets
│   └── styles/
│       └── global.css      # Global styles
├── public/                 # Static files served as-is
│   ├── favicon.ico
│   ├── gfx.svg
│   ├── og-image.svg
│   └── team/               # Team member images
├── .github/
│   └── workflows/
│       └── ci-deploy.yml   # CI and Vercel deploy pipeline
├── docs/                   # Project documentation
├── astro.config.mjs        # Astro configuration
├── .eslintrc.cjs           # ESLint config (StandardJS + Astro + React)
├── .prettierrc             # Prettier config (no semis, single quotes)
└── package.json            # Dependencies and scripts
```

### Configuration Files

- **astro.config.mjs**: React integration, Tailwind Vite plugin, i18n config (es/en locales)
- **.eslintrc.cjs**: StandardJS + Astro + React/Hooks/A11y rules, ignores dist/node_modules/.astro
- **.prettierrc**: No semicolons, single quotes, trailing commas (es5), 100 char width
- **.gitignore**: Excludes dist/, .astro/, node_modules/, .env*, .DS_Store

## Architecture & Patterns

### Internationalization (i18n)

- **Default locale**: Spanish (`es`) - routes without prefix (e.g., `/`)
- **English locale**: `en` - prefixed routes (e.g., `/en/`)
- **Translation files**: `src/i18n/es.json`, `src/i18n/en.json`
- **Utilities**: 
  - `getLangFromUrl(url)` - Extract locale from Astro.url
  - `useTranslations(lang)` - Get translation function for locale

### Component Pattern

- **Astro components** (`.astro`) - Static page sections, server-rendered
- **React components** (`.jsx`) - Interactive elements with client-side JS
- Pages import section components directly (see `src/pages/index.astro`)
- No React import needed in JSX files (React 19 automatic runtime)

### Key Components

**Main Sections (Astro):**
- Welcome.astro - Hero section
- WhoWeAre.astro - About section
- Services.astro - Services overview
- HelpYou.astro - How we help
- Successes.astro - Success stories
- Team.astro - Team showcase
- Contact.astro - Contact section
- Navbar.astro - Site navigation
- Footer.astro - Site footer

**Interactive (React JSX):**
- ContactForm.jsx - Form with Formspree integration
- CasesSlider.jsx - Splide-based case studies carousel
- ServicePhases.jsx - Service phases with state management

## Code Style

- No semicolons, single quotes, trailing commas (es5)
- ESLint: StandardJS + Astro + React/Hooks/A11y rules
- `react/prop-types` disabled (not needed with React 19)
- Prettier formatting enforced via pre-commit hook

## Common Tasks

### Making Changes

1. **ALWAYS run `npm ci` after fresh clone or dependency changes**
2. Make code changes
3. Run `npm run lint` to check for linting errors
4. Run `npm run build` to ensure build succeeds
5. Commit (pre-commit hook will format and lint staged files)

### Adding Dependencies

1. Add to package.json
2. Run `npm install` to update package-lock.json
3. **Test with `npm ci` in clean state** to ensure deps install correctly
4. Commit both package.json and package-lock.json

### Modifying Translations

1. Edit `src/i18n/es.json` and `src/i18n/en.json`
2. Keep keys synchronized between files
3. Use `useTranslations(lang)` in components to access translations

### Adding Pages

1. Create `.astro` file in `src/pages/` (Spanish) or `src/pages/en/` (English)
2. Import and use Layout.astro
3. Use i18n utilities for translations

## Trust These Instructions

These instructions have been validated by running all commands in a clean environment. Only search or explore if:
- You encounter an error not documented here
- You need to understand specific implementation details
- These instructions appear outdated or incorrect
