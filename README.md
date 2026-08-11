# 🚀 Rohan Prajapati — Portfolio

A premium, interactive personal portfolio website built with **React 18**, **Three.js**, and **Vite**. Features a cinematic loading sequence, 3D WebGL particle backgrounds, scroll-triggered animations, an embedded CLI terminal, and anti-tamper protection.

> **Schema to Shipped.** — Building full-stack, real-time systems end to end.

---

## ✨ Features

### 🎬 Cinematic Experience
- **Animated Loading Screen** — Custom preloader with progress bar and pulsing gradient monogram on every page load
- **Grand Name Reveal** — Playfair Display serif typography (6–7rem) with gradient text animation
- **3D Particle Field** — Interactive Three.js WebGL particle background with mouse parallax

### 🧭 Navigation & UX
- **Scroll-Spy Active Highlighting** — Navbar dynamically highlights the current section with a glowing blue pill indicator as you scroll
- **Smooth Scroll** — CSS `scroll-behavior: smooth` across all anchor links
- **Cursor Spotlight** — Dual-color radial glow orb that follows mouse movement
- **Scroll Reveal Animations** — Fade-up entrance animations that re-trigger on every scroll into view

### 💻 Interactive CLI Terminal
- **Embedded Command Palette** — Full interactive terminal accessible via `Ctrl+K` shortcut or floating button
- **9 Commands** — `help`, `bio`, `skills`, `projects`, `drone`, `highlights`, `contact`, `cv`, `clear`
- **Quick Command Pills** — One-click buttons for all available commands

### 📱 Fully Responsive
- **Mobile-First Design** — Optimized for iOS Safari, Android Chrome, and all viewports (320px–2560px)
- **Touch-Optimized** — 44px minimum tap targets, momentum scrolling, iOS zoom-prevention
- **Adaptive Layouts** — Grid collapse from 4-col → 2-col → 1-col at breakpoints
- **Safe Area Support** — `viewport-fit=cover` for iPhone notch and Android camera cutout displays

### 🔒 Anti-Tamper Protection
- Right-click context menu disabled
- DevTools keyboard shortcuts blocked (F12, Ctrl+Shift+I/J/C, Ctrl+U)
- Text selection and drag prevention
- Console security warning message

### 📄 Sections
| Section | Description |
|---------|-------------|
| **Hero** | Name reveal, rotating designations, CTA buttons, 3D profile card with mouse tilt |
| **Stats Bar** | Animated count-up numbers (Intern Status, 4 Certs, 7 Projects, 1 Hardware) |
| **About** | Philosophy, Mission, Vision with profile image |
| **Skills** | Frontend, Backend, Database/Infra, Security & Testing categories |
| **Projects** | 7 shipped project cards with detail modals and tech stack badges |
| **Highlights** | Deep-dive case studies (Race Condition Fix, Auth Security) |
| **Experience** | Software Engineering Intern timeline |
| **Certifications** | AWS, Claude Code, Deloitte, Commonwealth Bank |
| **Contact** | Direct mailto integration, social links, contact form |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **3D Graphics** | Three.js |
| **Icons** | Lucide React |
| **Fonts** | Google Fonts (Inter, Space Grotesk, JetBrains Mono, Playfair Display) |
| **Styling** | Vanilla CSS with CSS Variables design system |
| **Language** | JavaScript (ES Modules) |

---

## 🎨 Design System

```
Background:       #0A0A0A (Near Black)
Surface/Cards:    #161616 / #222222
Primary Accent:   #4F9CFF (Electric Blue)
Secondary Accent: #00D9A5 (Mint Green)
Text Primary:     #EDEDED
Text Secondary:   #8A8A8A
```

---

## 📂 Project Structure

```
Portfolio/
├── index.html                    # Entry HTML with meta tags & fonts
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite configuration
├── public/
│   ├── Portfolio_pic.png         # Profile picture
│   └── Rohan_Prajapati_CV.pdf   # Downloadable resume
├── src/
│   ├── main.jsx                  # React DOM entry point
│   ├── App.jsx                   # Root component with routing & state
│   ├── index.css                 # Global design system & responsive rules
│   ├── data/
│   │   └── portfolioData.js      # Centralized content data store
│   └── components/
│       ├── Navbar.jsx            # Fixed navbar with scroll-spy highlighting
│       ├── HeroSection.jsx       # Hero with name reveal & 3D profile card
│       ├── StatsBar.jsx          # Animated count-up statistics
│       ├── AboutSection.jsx      # Philosophy, Mission, Vision
│       ├── SkillsSection.jsx     # Technology stack grid
│       ├── ProjectsSection.jsx   # Project cards with detail modals
│       ├── HighlightsSection.jsx # Technical case studies
│       ├── ExperienceSection.jsx # Work experience timeline
│       ├── CertificationsSection.jsx # Certification cards
│       ├── ContactSection.jsx    # Contact form with mailto integration
│       ├── Footer.jsx            # Footer with social links
│       ├── InteractiveTerminal.jsx # CLI command palette modal
│       ├── LoadingScreen.jsx     # Animated preloader
│       ├── ScrollReveal.jsx      # IntersectionObserver scroll animation wrapper
│       ├── CursorSpotlight.jsx   # Mouse-following radial glow effect
│       ├── DevToolsGuard.jsx     # Anti-tamper protection layer
│       └── 3d/
│           └── Hero3DCanvas.jsx  # Three.js WebGL particle field
└── dist/                         # Production build output
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Rohan33833/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173` (or the next available port).

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment

The `dist/` folder contains the production-ready static files. Deploy to any static hosting:

- **Vercel**: `npx vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push `dist/` to `gh-pages` branch
- **Firebase Hosting**: `firebase deploy`

---

## 📧 Contact

- **Email**: r0164ohan@gmail.com
- **GitHub**: [github.com/Rohan33833](https://github.com/Rohan33833)
- **LinkedIn**: [linkedin.com/in/rohan-prajapati-b4390631a](https://www.linkedin.com/in/rohan-prajapati-b4390631a/)
- **Location**: Virar, Maharashtra, India

---

## 📜 License

© 2026 Rohan Prajapati. All rights reserved.
