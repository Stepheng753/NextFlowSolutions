# Frontend Component Developer Specification

This document outlines the current implementation of frontend components within the repository, providing a reference guide for future component development. It acts as the specification for the `frontend-component-dev` agent.

## Core Tech Stack
- **React**: Used for building all UI components.
- **Vite**: The build tool and development server, offering fast hot-module replacement.
- **Tailwind CSS**: Used exclusively for styling. The Design Agent manages advanced aesthetic classes, while the Component Creator applies structural utility classes (e.g., `flex`, `grid`, `p-4`).

### Application Structure
The repository contains two main frontend applications:
1. **`main`**: The primary landing/marketing website, featuring dark/light mode toggle.
2. **`Legal`**: The core web application containing the legal workflows (IP Law, PI Law, Intake). Navigation here utilizes custom state-based routing (e.g., `const [view, setView] = useState('home')` in `App.jsx`) rather than `react-router`.

## Component Patterns

### Cards as Navigation Buttons
Workflows are accessed via card components that act as large, clickable buttons.
- **Structure**: They are structural `div` elements, not semantic `<button>` tags, designed to hold icons, titles, and descriptions.
- **Styling**: They heavily utilize Tailwind's `group` class to coordinate hover effects across child elements. Typical classes include `cursor-pointer`, `hover:shadow-xl`, and `transition-all`.
- **Interactivity**: Navigation is handled via an `onClick` event that calls the routing function, typically passed down as a `navigate` prop (e.g., `onClick={() => navigate('patent')}`).
- **Micro-animations**: Icons scale up (`group-hover:scale-110`) and text arrows slide right (`group-hover:translate-x-1`) on hover.

### Back Buttons
Back navigation is typically found at the top left of workflow sub-pages.
- **Implementation**: Usually rendered using a standardized `<Button>` component or a styled `<button>` element.
- **Styling**: Back buttons employ minimal styling to avoid competing with primary actions. They often use `variant="outline"` or have transparent backgrounds with `hover:text-slate-900`.
- **Icons**: They incorporate a `ChevronLeft` or `ArrowLeft` icon from the `lucide-react` library.
- **Functionality**: They trigger the `navigate` function to return to the parent view (e.g., `onClick={() => navigate('ip-law')}`).

### Webhook & Form Handling
Interaction with backend n8n workflows is handled via standard React state and the native `fetch` API.
- **State Management**: Complex forms manage a `step` state (e.g., `'form'`, `'processing'`, `'success'`, `'results'`) rather than rendering disparate pages. Error messages are stored in an `error` state variable.
- **Data Submission**: Data is packaged into a `FormData` object (crucial for files like PDFs/DOCXs) and sent via a `POST` request.
- **Endpoints**: Webhook URLs are centralized in a `CONFIG` object imported from `../config.js` (e.g., `CONFIG.endpoints.patent`).
- **Synchronous Execution**: The fetch calls use `await`. During the request, the component UI transitions to the `'processing'` state (displaying a loading spinner).
- **Error Handling**: If `!response.ok` or a network error occurs, the catch block sets the `error` state with a user-friendly message and reverts the UI to the `'form'` or `'upload'` step.
