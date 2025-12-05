# Design Vibe — MediGen

## Overall Mood
Calm. Hypnotic. Dreamlike.

MediGen should feel like stepping into a quiet digital temple — gentle colors, soft motion, no sharp edges.  
Every element should breathe slowly, matching the pace of the meditation.  
We’re not building an app — we’re building a **feeling**.

---

## Layout & Spacing
- **Container Width:** Max 640px on desktop, centered.
- **Padding:** `p-6` on mobile, `p-12` on desktop.
- **Gaps:** Use `gap-6` between sections, `gap-2` inside components.
- **Alignment:** Always vertical center (use Flexbox or Grid).
- **Card Border Radius:** `rounded-2xl`
- **Shadow:** `shadow-[0_4px_30px_rgba(0,0,0,0.1)]`

---

## Color Palette
| Use | Color | Description |
|------|-------|-------------|
| Background | `#0b0c1d` → `#5a5fff` gradient | Night sky into dream light |
| Primary | `#b8b6ff` | Lavender glow |
| Accent | `#a3ffe7` | Breath spark |
| Text | `rgba(255,255,255,0.85)` | Gentle contrast |
| Glass blur | `backdrop-blur-xl bg-white/5` | Light diffusion effect |

---

## Typography
- **Font Family:** `Inter, sans-serif` (fallback `system-ui`)
- **Font Weights:** 300 → 500 only
- **Line Height:** 1.8 for body
- **Letter Spacing:** +0.02em for headlines
- **Example style:**
  ```css
  h1 { font-size: 2rem; font-weight: 500; }
  p { font-size: 1rem; color: rgba(255,255,255,0.85); }
