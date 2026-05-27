import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechAreas from './components/TechAreas';
import ProductShowcase from './components/ProductShowcase';
import TechStackMarquee from './components/TechStackMarquee';
import AILabs from './components/AILabs';
import ImpactStats from './components/ImpactStats';
import IITTeamSection from './components/IITTeamSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {/* Splash loader — disappears after ~4.2s */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Main site — renders underneath, visible after splash exits */}
      <div className="relative min-h-screen text-white bg-cyber-bg overflow-x-hidden">
        {/* 1. HTML5 Particle Plexus Canvas */}
        <ParticleBackground />

        {/* 2. Fixed top Navbar */}
        <Navbar />

        {/* 3. Immersive Hero layout */}
        <Hero />

        
        {/* 5. Core Tech areas */}
        <TechAreas />

        {/* 6. Flagship Immersive Product Showcase */}
        <ProductShowcase />

        {/* Horizontal Infinite Auto-scrolling Tech Stack Marquee */}
        <TechStackMarquee />

        {/* 7. AI Labs Command Center */}
        <AILabs />

        {/* 8. Impact stats trackers */}
        <ImpactStats />

        {/* Elite IITian Engineering Force Section */}
        <IITTeamSection />

        {/* 9. Transmit Securely Contact form */}
        <Contact />

        {/* 10. System Status Brand Footer */}
        <Footer />
      </div>
    </>
  );
}