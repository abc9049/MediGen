# Tech Context — MediGen

## Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Libraries:** Material UI (MUI) + Tailwind CSS (Glassmorphism theme)
- **Audio Engine:** Web Audio API + HTML5 Audio element
- **Voice Engine:** Browser SpeechSynthesis API
- **Hosting:** Vercel (Free tier)
- **Version Control:** GitHub + GitHub Copilot
- **Assets:** /public directory for static files (audio, icons, licenses)
- **State Management:** React Hooks + Context
- **Data Storage:** localStorage (for replay/saved sessions)
- **Animation:** Framer Motion for smooth breathing and fading effects

## Tooling
- **IDE:** Visual Studio Code (Copilot enabled)
- **Package Manager:** npm
- **Linting:** ESLint + Prettier
- **Deployment:** Auto-deploy via GitHub → Vercel CI/CD

## Dependencies
Minimal, no backend services. Example setup:
```bash
npm install @mui/material @emotion/react @emotion/styled tailwindcss framer-motion
