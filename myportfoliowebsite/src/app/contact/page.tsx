"use client"

import SideBarComponent from '@/components/cards/sideBar';
import React, { useEffect } from 'react'
import ParticlesBackground from '@/components/ParticlesBackground';
import LoadingScreen from '@/components/LoadingScreen';
import { usePageLoader } from '@/hooks/usePageLoader';
import ContactCard from '@/components/cards/ContactCard';

function ContactPage() {
    const isLoading = usePageLoader(1200); // 1.2 seconds

    useEffect(() => {
        document.title = "Taha's Portfolio - Contact";
    }, []);

    return (
        <div
          className="page-container"
          style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr",
            height: "100vh",
            width: "100vw",
            overflow: "hidden", 
          }}
        >
            {/* Left side: sidebar */}
            <div className="sidebar-container" style={{height: "100%" }}>
                <SideBarComponent />
            </div>

            {/* Right side: main content */}
            <div className="content-container gradient" style={{ position: "relative", padding: "1rem", color: "black", overflow: "hidden"}}>
                {/* Gradient and Particles load immediately */}
                <ParticlesBackground />
                
                {/* Loading screen overlays content area while children load */}
                <LoadingScreen isLoading={isLoading} />
                
                {/* Contact page content fades in after loading */}
                <div style={{
                    position: "relative",
                    zIndex: 1,
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease-in',
                }}>
                    <ContactCard backgroundColor = "transparent" />
                </div>
            </div>
        </div>
    )
}

export default ContactPage;