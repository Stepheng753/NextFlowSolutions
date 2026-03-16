# Design Developer Specification

## Purpose
This document serves as the primary specification and guide for the **Lead UX/UI Designer** agent (`design-dev`). It details the current frontend styling implementation, the technology stack, and the operational guidelines for developing and enhancing the user interface of the NextFlowLegal ecosystem.

## Tech Stack
The frontend is built using a modern, utility-first approach:
- **Framework:** React 18 (via Vite)
- **Styling:** Tailwind CSS 3.3.3
- **Plugins:** `@tailwindcss/typography` for rich text formatting.
- **Dark Mode:** Configured to use the manual `class` strategy.

## How Styling Works
The repository's styling architecture relies entirely on Tailwind CSS:
1. **Global CSS:** The base Tailwind directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`) are imported tightly in `main/src/index.css`. Custom base styles should be kept to an absolute minimum; prefer utility classes.
2. **Component Styling:** All component-level styling is applied directly within the React `.jsx` files (located in `main/src/components/`) using Tailwind utility classes in the `className` attribute.
3. **Configuration:** The `tailwind.config.js` file at the root of the `main/` directory dictates the theme, content paths, and plugins. It is currently set up to scan `./index.html` and `./src/**/*.{js,ts,jsx,tsx}` for classes.

## How to Develop Styling
When acting as the `design-dev` agent, follow this development workflow:

### 1. Environment Setup
- Navigate to the `main/` directory.
- Run the development server using `npm run dev` (or `vite`) to see hot-module replacement (HMR) updates in real-time.

### 2. Styling Guidelines
- **Utility-First:** Construct designs completely with Tailwind utility classes.
- **Design System:** Reference `docs/agent-artifacts/guidelines.md` (if established) to ensure styling aligns with premium legal-tech UI trends (e.g., color palettes, typography, spacing).
- **Quality of Life:** Proactively add hover states (`hover:`), focus states (`focus:`), smooth transitions (`transition-all duration-300`), and responsive breakpoints (`md:`, `lg:`) to elevate the UI.
- **Accessibility:** Ensure proper contrast ratios and use accessible HTML elements.

### 3. Constraints & Guardrails
- **DO NOT Break Logic:** The Frontend Component Creator has already built the logic. NEVER alter core React logic, state management (`useState`, `useEffect`), API calls, or event bindings (`onClick`, `onChange`).
- **Focus on Presentation:** Your sole responsibility is the visual presentation. Group your Tailwind classes logically (e.g., layout first, then spacing, typography, colors, and interactive states).

### 4. Handoff
- Save your changes to the `.jsx` and configuration files.
- Verify the UI changes locally.
- Ping the Orchestrator with a summary of the design upgrade for review.
