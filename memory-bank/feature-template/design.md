# Design & Architecture — MediGen

## System Overview
MediGen runs fully client-side using Next.js, TypeScript, and browser Text-to-Speech.  
All assets (like audio and background images) are served from the `public/` folder for speed and simplicity.

## Architecture Diagram (Mermaid)
```mermaid
flowchart TD
  subgraph UI["🧘 User Interface (Next.js / React)"]
    QF["Questionnaire Form"]
    SP["Session Player"]
    AB["Audio Background"]
  end

  subgraph Logic["💡 Logic Layer"]
    BS["Script Builder (personalized content generator)"]
  end

  subgraph Assets["🎵 Assets"]
    MP3["/public/audio/pure_theta.mp3"]
  end

  QF --> BS
  BS --> SP
  SP --> AB
  AB --> MP3
