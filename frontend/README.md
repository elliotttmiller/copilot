# Frontend Setup & Maintenance Guide

## Project Overview
This is the frontend for your Personal AI Crew, built with Next.js, React, CopilotKit, and TailwindCSS.

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Build for production:
   ```sh
   npm run build
   npm start
   ```

## Updating Dependencies
- To update all dependencies to their latest compatible versions:
  ```sh
  npm update
  ```
- To update a specific package:
  ```sh
  npm update <package-name>
  ```
- For devDependencies:
  ```sh
  npm update --dev <package-name>
  ```

## Best Practices
- Keep your dependencies up to date for security and performance.
- Use `npm audit` to check for vulnerabilities.
- Use `npm run lint` to maintain code quality.
- For major upgrades, review release notes for breaking changes.

## Troubleshooting
- If you encounter issues after updating, try deleting `node_modules` and `package-lock.json`, then reinstall:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- For Next.js or CopilotKit issues, consult their official documentation.

---
For backend update instructions, see `backend/README.md` or `pyproject.toml`.
