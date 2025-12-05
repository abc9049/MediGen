# System Patterns — MediGen

## Audio Handling Pattern
Use React hooks for controlling sound and fade transitions.

```tsx
useEffect(() => {
  const audio = new Audio("/audio/pure_theta.mp3");
  audio.loop = true;
  audio.volume = 0;
  let volume = 0;
  audio.play();
  const fadeIn = setInterval(() => {
    if (volume < 0.2) {
      volume += 0.01;
      audio.volume = volume;
    } else clearInterval(fadeIn);
  }, 200);
  return () => audio.pause();
}, []);
<motion.div
  animate={{ scale: [1, 1.3, 1] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-600/30 blur-lg"
/>

---

# 🚀 **🔟 whats-done.md**

```markdown
# Progress & Next Steps — MediGen

## ✅ Done
- Project setup (Next.js + TypeScript + Vercel)
- Memory bank docs created
- Audio file sourced and licensed
- Core design direction defined
- Basic architecture planned

## 🛠 In Progress
- Build Questionnaire Form
- Implement Script Builder logic
- Connect TTS and Audio Background
- Add Breathing Animation component
- Test responsive layout

## ⏳ Next
- Volume controls for voice/background
- UI refinement (padding + typography polish)
- Add “Save Session” (localStorage)
- Write README instructions for contributors

## 🚧 Blockers
- SpeechSynthesis variation across browsers
- iOS autoplay restrictions
- Need fallback audio loading for slow networks

## 📆 Short-Term Goals
- Finish MVP flow: Questionnaire → Generate → Play
- Deploy to Vercel
- Test across mobile and desktop

## 🌠 Long-Term Vision
A personalized meditation experience where users co-create their reality through voice and visualization.
