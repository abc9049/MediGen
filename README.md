# 🧠 MediGen - Personalized Meditation Generator

> Generate personalized guided meditations tailored to your goals, dreams, and desired state. Merge neuroscience and meditation in a calming digital experience.

![MediGen Screenshot](https://via.placeholder.com/800x400/6366f1/ffffff?text=MediGen+Meditation+Generator)

## ✨ Features

- **🎯 Personalized Meditations**: 4-step questionnaire creates unique meditation scripts
- **🎵 Theta Frequency Audio**: 4-7Hz theta waves with healing frequencies (417Hz, 639Hz)
- **🗣️ Text-to-Speech**: Browser-based voice narration with preferred voice selection
- **🎨 Glassmorphism Design**: Beautiful, calming interface with breathing animations
- **📱 Responsive**: Works perfectly on desktop and mobile devices
- **🚀 No Backend Required**: 100% client-side, instant deployment

## 🌟 Experience

MediGen creates a personalized meditation experience by:

1. **Understanding Your Goals** - What brings you here today?
2. **Assessing Your State** - How are you feeling right now?
3. **Defining Outcomes** - How do you want to feel afterward?
4. **Setting the Scene** - What visualization environment calls to you?

Then generates a unique 10-minute guided meditation with:
- Personalized script based on your responses
- Calming TTS voice narration
- Theta frequency background music
- Synchronized breathing animation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/medigen.git
cd medigen

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to experience MediGen.

### Adding Audio
Place your theta frequency audio file as:
```
/public/audio/pure-theta-4-7hz-with-417hz-639hz-music-351389.mp3
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom glassmorphism theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Audio**: Web Audio API + HTML5 Audio
- **Voice**: Browser SpeechSynthesis API
- **Deployment**: Vercel

## 🎨 Design Philosophy

MediGen embraces a **glassmorphism aesthetic** with:
- Soft indigo/lavender gradients
- Frosted glass effects with backdrop blur
- Breathing animations synchronized with meditation
- Ambient particle effects
- Smooth, calming transitions

## 🧘‍♀️ Usage

1. **Start the Experience**: Visit the landing page
2. **Share Your Intention**: Fill out the 4-step questionnaire
3. **Wait for Generation**: Watch the breathing animation while your meditation is created
4. **Experience Your Session**: Listen to your personalized meditation with theta frequencies
5. **Reflect and Repeat**: Complete the journey and create new meditations anytime

## 🔧 Configuration

### Audio Settings
- **Voice Volume**: Adjustable TTS narration level
- **Background Volume**: Theta frequency audio mixing
- **Voice Selection**: Prefer calm, feminine voices when available

### Meditation Themes
- Serene ocean waves
- Peaceful forest glade  
- Mountain summit at sunrise
- Cosmic starfield
- Healing light sanctuary
- Inner temple of wisdom

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment
```bash
# Build for production
npm run build

# Export static files
npm run export
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎵 Audio Credits

Theta frequency audio files should be royalty-free or properly licensed. Recommended sources:
- [Pixabay](https://pixabay.com/music/) - Royalty-free audio
- [Freesound](https://freesound.org/) - Creative Commons audio
- Custom generation with audio software

## 🧠 Inspiration

MediGen is inspired by:
- Dr. Joe Dispenza's work on neuroplasticity and meditation
- Theta brainwave research for deep relaxation
- The healing frequencies of 417Hz (change) and 639Hz (connection)
- Modern digital wellness practices

## ⚡ Performance

- **Lighthouse Score**: 95+ for Performance, Accessibility, Best Practices
- **Bundle Size**: Optimized for fast loading
- **Mobile First**: Responsive design with touch interactions
- **Offline Capable**: Service worker for meditation session caching

## 🔮 Future Enhancements

- [ ] User accounts and session history
- [ ] Multiple meditation lengths (5, 15, 20 minutes)
- [ ] Advanced audio mixing controls
- [ ] Custom voice uploads
- [ ] Binaural beats integration
- [ ] Progress tracking and insights
- [ ] Social sharing of favorite sessions

---

**Made with 💜 for inner peace and digital wellness**

*Transform your inner landscape, one meditation at a time.*