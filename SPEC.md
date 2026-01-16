# Todo App Specification

## Overview

A minimal, browser-based todo list application. Users can manage their daily tasks without creating accounts, installing software, or relying on internet connectivity. The app runs entirely in the browser and remembers tasks between sessions.

## Technology Constraints

- HTML, CSS, and vanilla JavaScript only
- No external libraries or frameworks
- No build tools or compilation steps
- Data stored in browser localStorage
- Must work when opened directly as a file (no server required)

## Core Features

### Adding Tasks

- A text input field at the top of the app where users type new tasks
- Users press Enter or click an "Add" button to create the task
- Empty submissions are ignored (no blank tasks allowed)
- After adding, the input field clears and is ready for the next task
- New tasks appear at the bottom of the list

### Viewing Tasks

- All tasks display in a vertical list
- Each task shows its text content
- Tasks are visually distinct from each other (clear separation)
- Completed tasks are visually different from incomplete tasks (e.g., strikethrough, faded, or different color)
- The list scrolls if there are many tasks

### Completing Tasks

- Each task has a checkbox or clickable area to mark it complete
- Clicking toggles the task between complete and incomplete
- Completed tasks remain visible in the list (not hidden)
- The completion state is saved immediately

### Deleting Tasks

- Each task has a delete button or icon
- Clicking delete removes the task permanently
- No confirmation dialog (keep it simple)
- Deletion is immediate and saved

### Persistence

- All tasks are saved to browser localStorage
- Tasks persist when the browser is closed and reopened
- Tasks persist when the page is refreshed
- Each browser/device maintains its own separate task list

## User Interface

### Layout

- Single page application
- Clean, centered layout that works on both desktop and mobile
- Maximum width: 600px
- Container padding: 24px on sides, 48px top
- Content centered horizontally on page

### Color Palette

Use a neutral, accessible color scheme:

- **Background:** #f5f5f5 (light gray page background)
- **Container background:** #ffffff (white card/container)
- **Primary text:** #1a1a1a (near-black for readability)
- **Secondary text:** #666666 (gray for completed tasks, hints)
- **Border color:** #e0e0e0 (subtle borders)
- **Accent color:** #2563eb (blue for interactive elements, focus states)
- **Accent hover:** #1d4ed8 (darker blue on hover)
- **Danger color:** #dc2626 (red for delete button)
- **Danger hover:** #b91c1c (darker red on hover)
- **Success/complete:** #16a34a (green checkmark when complete)

### Typography

Use system fonts for fast loading and native feel:

- **Font family:** -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Base font size:** 16px
- **Line height:** 1.5
- **Heading (app title):** 24px, font-weight 600
- **Task text:** 16px, font-weight 400
- **Button text:** 14px, font-weight 500
- **Empty state message:** 14px, color #666666, italic

### Spacing (8px grid)

- Container padding: 24px
- Space between input area and task list: 24px
- Space between task items: 8px
- Task item padding: 12px 16px
- Input field padding: 12px 16px
- Button padding: 12px 16px

### Component Styling

**Container:**
- White background (#ffffff)
- Border-radius: 8px
- Box-shadow: 0 1px 3px rgba(0,0,0,0.1)

**Input field:**
- Full width minus add button
- Border: 1px solid #e0e0e0
- Border-radius: 6px
- Focus: border-color #2563eb, outline none, box-shadow 0 0 0 3px rgba(37,99,235,0.1)

**Add button:**
- Background: #2563eb
- Color: white
- Border: none
- Border-radius: 6px
- Cursor: pointer
- Hover: background #1d4ed8

**Task item:**
- Background: #ffffff
- Border: 1px solid #e0e0e0
- Border-radius: 6px
- Display: flex, align-items center
- Gap between elements: 12px

**Checkbox:**
- Size: 20px × 20px
- Border: 2px solid #e0e0e0
- Border-radius: 4px
- Cursor: pointer
- When checked: background #16a34a, border-color #16a34a, white checkmark

**Delete button:**
- Background: transparent
- Color: #666666
- Border: none
- Padding: 8px
- Border-radius: 4px
- Cursor: pointer
- Hover: background #fee2e2, color #dc2626

**Completed task styling:**
- Text: color #666666, text-decoration line-through
- Opacity: 0.7

### Task Item Design

Each task item displays:
- Checkbox or completion indicator on the left (20px)
- Task text in the middle (flex: 1, takes remaining space)
- Delete button on the right (icon or × symbol)
- Visual distinction between completed and incomplete states

### Empty State

- When there are no tasks, show a friendly message
- Something like "No tasks yet. Add one above!"
- Disappears as soon as the first task is added

### Responsive Behavior

- Works on mobile screens (minimum 320px width)
- Works on desktop screens
- Touch-friendly tap targets (minimum 44px)
- Input field and buttons are easily tappable on mobile

## Interactions

### Keyboard Support

- Enter key submits new task from input field
- Tab key navigates between interactive elements
- Visible focus indicators for keyboard users

### Mouse/Touch Support

- All actions achievable via click/tap
- Hover states on desktop for buttons and checkboxes
- No drag-and-drop required (keep it simple)

## Data Model

Each task consists of:
- Unique identifier (for tracking)
- Text content (what the user typed)
- Completion status (true/false)
- Creation order (for maintaining list order)

## Edge Cases

### Long Task Text

- Long text should wrap to multiple lines
- Text should not overflow or break the layout
- Consider truncating extremely long text or allowing full display

### Many Tasks

- List should scroll when tasks exceed viewport height
- Performance should remain acceptable with 100+ tasks
- No pagination needed (simple scroll)

### Special Characters

- Users can include any characters in task text
- Emojis should display correctly
- HTML characters should display as text, not render as HTML

### Browser Support

- Should work in modern browsers (Chrome, Firefox, Safari, Edge)
- No need to support Internet Explorer
- Graceful behavior if localStorage is unavailable (show error message)

## What This App Does NOT Include

To keep scope minimal, the following are explicitly excluded:

- User accounts or authentication
- Cloud sync or server storage
- Due dates or deadlines
- Priority levels
- Categories or tags
- Search or filtering
- Drag-and-drop reordering
- Undo/redo functionality
- Keyboard shortcuts beyond basic Enter/Tab
- Dark mode toggle
- Export/import functionality
- Multiple lists
- Collaboration features
- Notifications or reminders

## Success Criteria

The app is complete when:

1. Users can add new tasks by typing and pressing Enter
2. Tasks appear in a list with checkboxes
3. Clicking a checkbox marks the task complete (with visual feedback)
4. Each task has a working delete button
5. All data persists after page refresh
6. The interface is clean and usable on both mobile and desktop
7. The app works when opened directly as a file in a browser
