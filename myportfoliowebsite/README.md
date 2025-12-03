# Taha's Portfolio Website

A modern, interactive portfolio website featuring a fully 3D-rendered room experience, built with Next.js, React Three Fiber, and TypeScript. This portfolio showcases my work, skills, and projects through an immersive 3D environment with a synthwave/cyberpunk aesthetic.

## 🌟 Features

### 3D Interactive Room Experience
- **Fully Rendered 3D Room**: Explore a detailed 3D model of my room with interactive objects
- **Dual Camera Modes**:
  - **Orbit Mode**: Navigate around the room with constrained camera controls
  - **First Person Mode**: Walk through the room in first-person view with pointer lock controls
- **Interactive Hotspots**: Hover over and click on various objects (laptop, PlayStation, etc.) to navigate to different sections
- **Physics Integration**: Realistic physics simulation using Rapier physics engine
- **Visual Effects**: Post-processing effects including shadows and lighting
- **Performance Optimized**: WebGL performance warnings and mobile device detection

### Playable Snake Game
- **Embedded Game**: Play a classic Snake game directly within the 3D room
- **Accessible via PlayStation**: Click on the PlayStation 5 model in the room to launch the game
- **Full Game Controls**: WASD movement controls with game state management
- **Standalone Page**: Also available as a dedicated page at `/snake` (hidden page)

### Portfolio Sections
- **Home**: Welcome page with animated particles background and personal introduction
- **About**: Learn more about me, my background, and interests
- **Skills**: Interactive skills showcase with visual representations
- **Work/Experience**: Professional experience and career highlights
- **Projects**: Portfolio of personal and professional projects with detailed descriptions
- **Contact**: Get in touch through various contact methods

### Design & UX
- **Synthwave Aesthetic**: Gradient backgrounds and cyberpunk-inspired color schemes
- **Particle Effects**: Animated particle backgrounds across all pages
- **Smooth Transitions**: Loading screens and fade-in animations for polished user experience
- **Responsive Sidebar**: Persistent navigation sidebar on all pages
- **Mobile Optimization**: Graceful degradation for mobile devices (3D room restricted to desktop)

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** (App Router) - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type-safe development

### 3D Graphics & Physics
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/rapier** - Physics engine integration

### Styling & Effects
- **Tailwind CSS** - Utility-first CSS framework
- **TSParticles** - Particle effects library
- **Custom CSS** - Synthwave gradient themes and animations

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd myportfoliowebsite
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
myportfoliowebsite/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── projects/          # Projects showcase
│   │   ├── skills/            # Skills page
│   │   ├── work/              # Work/Experience page
│   │   ├── room/              # 3D room experience
│   │   │   ├── RoomCanvas.tsx # Main 3D canvas
│   │   │   ├── Scene.tsx      # 3D scene setup
│   │   │   ├── Models.tsx     # 3D model components
│   │   │   ├── effects.tsx    # Post-processing effects
│   │   │   └── ...
│   │   └── snake/             # Snake game page
│   ├── components/            # Reusable React components
│   │   ├── cards/            # Content card components
│   │   ├── games/            # Game components
│   │   └── ...
│   ├── utils/                # Utility functions
│   └── hooks/                # Custom React hooks
├── public/                   # Static assets
│   ├── models/              # 3D GLB model files
│   └── images/              # Image assets
└── ...
```

## 🎮 Key Capabilities

### 3D Room Navigation
- **Orbit Controls**: Click and drag to orbit around the room, scroll to zoom
- **First Person Mode**: Switch to first-person view and use WASD to move
- **Interactive Objects**: Click on objects like the laptop to navigate to skills page, or PlayStation to play Snake
- **Visual Feedback**: Hover effects with gold glow on interactive elements

### Performance Features
- **Mobile Detection**: Automatically detects mobile devices and restricts 3D room access
- **WebGL Warnings**: Alerts users about GPU requirements before loading heavy 3D content
- **Lazy Loading**: Models and assets are loaded on demand
- **Optimized Rendering**: Efficient 3D rendering with performance monitoring

### User Experience
- **Loading Screens**: Smooth loading transitions between pages
- **Particle Backgrounds**: Animated particle effects for visual appeal
- **Responsive Design**: Adapts to different screen sizes
- **Keyboard Navigation**: Full keyboard support for accessibility

## 🎨 Design Philosophy

This portfolio combines technical prowess with creative expression:
- **Immersive Experience**: The 3D room provides a unique way to explore my work
- **Performance First**: Optimized for smooth 60 FPS on modern hardware
- **Accessibility**: Graceful fallbacks for devices that can't handle 3D rendering
- **Modern Aesthetics**: Synthwave/cyberpunk theme reflects my interests in retro-futurism

## 📝 Notes

- The 3D room requires a modern GPU and is optimized for desktop experiences
- Mobile users are automatically redirected or shown alternative content
- All 3D models are in GLB format and loaded via `useGLTF` from `@react-three/drei`
- The Snake game is fully playable and integrated into the 3D experience


Built with by Taha - Computer Science and Finance Student at the University of Calgary
