# VS Code / Cursor Setup Guide

This project is configured to run seamlessly in VS Code or Cursor.

## Quick Start

### 1. Install Recommended Extensions
When you open this project, VS Code will prompt you to install recommended extensions:
- **ESLint** - Code linting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Prettier** - Code formatting

Click "Install All" when prompted, or install manually from the Extensions view.

### 2. Run the Development Server

**Option A: Using Tasks (Recommended)**
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Tasks: Run Task"
3. Select "npm: dev"
4. The dev server will start on `http://localhost:8080`

**Option B: Using Terminal**
1. Open integrated terminal (`Ctrl+`` ` or `View > Terminal`)
2. Run: `npm run dev`

**Option C: Using Debug Panel**
1. Go to Run and Debug (`Ctrl+Shift+D`)
2. Select "Start Dev Server + Launch Chrome"
3. Click the green play button
4. This will start the dev server AND open Chrome automatically

### 3. Available Tasks

Access via `Ctrl+Shift+P` → "Tasks: Run Task":
- **npm: install** - Install dependencies
- **npm: dev** - Start development server (port 8080)
- **npm: build** - Build for production
- **npm: lint** - Run ESLint
- **npm: test** - Run tests

### 4. Debugging

**Launch Configurations:**
- **Launch Chrome (dev server must be running)** - Opens Chrome for debugging (requires dev server running separately)
- **Start Dev Server + Launch Chrome** - Automatically starts dev server and opens Chrome
- **Run Tests** - Runs the test suite

**To Debug:**
1. Set breakpoints in your code
2. Press `F5` or go to Run and Debug panel
3. Select a launch configuration
4. Click the green play button

## Features Enabled

✅ **Format on Save** - Code automatically formats when you save  
✅ **ESLint Auto-fix** - Linting errors auto-fix on save  
✅ **TypeScript IntelliSense** - Full TypeScript support with path aliases (`@/`)  
✅ **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes  
✅ **Integrated Terminal** - Run commands directly in VS Code  

## Troubleshooting

**Port 8080 already in use?**
- Change the port in `vite.config.ts` or kill the process using port 8080

**Extensions not working?**
- Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"

**TypeScript errors?**
- Run `npm install` to ensure all dependencies are installed
- Check that `node_modules/typescript` exists
