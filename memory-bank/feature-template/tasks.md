# MediGen — Task Breakdown

## 🏗️ Phase 1 — Project Foundation

### 1. Setup & Deployment
**Tasks**
- [ ] Initialize Next.js + TypeScript project (`npx create-next-app@latest medigen --typescript`)
- [ ] Setup Tailwind CSS + Material UI
- [ ] Connect to GitHub repository
- [ ] Deploy starter app to Vercel
- [ ] Create `/memory-bank` folder and add markdown docs

**Acceptance Criteria**
- Project builds and deploys with no errors
- `vercel.app` domain accessible
- Tailwind and MUI both render correctly

---

## 🪶 Phase 2 — Core Experience

### 2. Questionnaire Form
**Tasks**
- [ ] Create `components/QuestionnaireForm.tsx`
- [ ] Form collects: user name, current mood, main goal, dream/future vision
- [ ] Use MUI `TextField`, `Select`, `Button`
- [ ] Save form data to React state (and localStorage)
- [ ] Validate that all fields are filled before continuing

**Acceptance Criteria**
- Form appears centered, with soft glass background
- On submit → triggers `buildScript()` function
- Works on desktop and mobile

---

### 3. Script Builder
**Tasks**
- [ ] Create `/app/lib/buildScript.ts`
- [ ] Function takes questionnaire data → returns meditation text JSON
- [ ] Structure text in 3 parts:
  1. Breathing intro (3 min)
  2. Visualization (5 min)
  3. Affirmation closing (2 min)
- [ ] Keep tone soft, hypnotic, and personalized (use user’s name)

**Acceptance Criteria**
- Generated text changes depending on user inputs
- Average duration ~10 minutes at speech rate 0.9
- No offensive or irrelevant content

---

### 4. Session Player
**Tasks**
- [ ] Create `components/SessionPlayer.tsx`
- [ ] Reads generated text via browser `SpeechSynthesis`
- [ ] Include Play / Pause / Regenerate buttons
- [ ] Integrate smooth fade transitions
- [ ] Show progress indicator (time elapsed)

**Acceptance Criteria**
- Plays voice audio clearly
- Can pause/resume mid-session
- Autoscrolls or highlights current section (optional)

---

### 5. Background Audio
**Tasks**
- [ ] Create `components/AudioBackground.tsx`
- [ ] Use `/public/audio/pure_theta.mp3` from Pixabay
- [ ] Implement volume fade-in/out (0 → 0.2)
- [ ] Loop continuously during meditation playback
- [ ] Stop when session ends

**Acceptance Criteria**
- Sound loops smoothly
- Fade transitions natural
- No overlap between sessions

---

### 6. UI & Styling
**Tasks**
- [ ] Apply Glassmorphism theme (translucent panels, blur, gradient)
- [ ] Add breathing circle animation (Framer Motion)
- [ ] Ensure text spacing and padding consistent across devices
- [ ] Create global theme (`theme.ts`) for colors, typography, shadows

**Acceptance Criteria**
- Layout centered, no overflow
- Fonts legible and consistent
- Padding visually balanced (no overlapping elements)
- Animation runs smoothly on 60fps

---

## 💡 Phase 3 — Interaction & Enhancements

### 7. Volume and Mix Control
**Tasks**
- [ ] Add a simple volume slider (range 0–1)
- [ ] Link to both TTS and background audio
- [ ] Persist last used value in localStorage

**Acceptance Criteria**
- Smooth control of both sound layers
- Volume state persists across sessions

---

### 8. Save & Replay
**Tasks**
- [ ] Allow saving current meditation to localStorage (`savedSessions`)
- [ ] Add small “Replay” button to regenerate same text
- [ ] Add clear button to delete all saved sessions

**Acceptance Criteria**
- Saved meditations retrievable from menu
- Works offline (once assets cached)

---

### 9. Mobile Optimization
**Tasks**
- [ ] Ensure audio autoplay works (trigger via user click)
- [ ] Adjust font sizes and spacing for small screens
- [ ] Add loading states for slower networks

**Acceptance Criteria**
- Smooth mobile experience
- No broken layouts or blocked audio
- Lighthouse score >90 on performance & accessibility

---

## 🌙 Phase 4 — Polish & Launch

### 10. Finishing Touches
**Tasks**
- [ ] Create simple splash logo “MediGen”
- [ ] Add About page (mission, license, sound credit)
- [ ] Link GitHub repo and contact footer
- [ ] Test across browsers

**Acceptance Criteria**
- All assets load instantly
- Footer visible and functional
- MVP demo video recorded successfully

---

## 🧩 Phase 5 — Future Ideas
**Future Features (not in MVP)**
- [ ] Add theme selector (Ocean / Space / Forest)
- [ ] Integrate optional ElevenLabs free tier
- [ ] Add AI image background (via NASA or Pexels API)
- [ ] Create daily “meditation journal” feature

---

## 🧭 Summary Roadmap

| Phase | Milestone | ETA |
|--------|------------|-----|
| 1 | Project setup + deploy | 1 day |
| 2 | Form + Script + Player | 2–3 days |
| 3 | Audio + Styling | 2 days |
| 4 | Save + Mobile polish | 1 day |
| 5 | Launch | 🎉 |

---

## ✅ Success Criteria
- MVP deployed to Vercel and fully functional
- User completes flow (form → generate → listen)
- 10-min playback with smooth background audio
- Session feels calming, personal, and intuitive
