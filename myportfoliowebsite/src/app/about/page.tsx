"use client"

import SideBarComponent from '@/components/cards/sideBar';
import React from 'react'
import ParticlesBackground from '@/components/ParticlesBackground';
import AboutMeCard from '@/components/cards/AboutMeCard';

function AboutMePage() {
    return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr",
            height: "100vh",
            width: "100vw",
            overflow: "hidden", 
          }}
        >
            {/* Left side: sidebar */}
            <div style={{height: "100%" }}>
                <SideBarComponent />
            </div>

            {/* Right side: main content */}
            <div 
                className={"gradient"} 
                style={{ 
                    position: "relative",
                    padding: "1rem",
                    paddingRight: "0",
                    overflow: "hidden",
                    color: "white"
                }}
            >
                <ParticlesBackground />
                
                {/* About Me Info Card, reusable since in Room it will also be available*/}
                <AboutMeCard backgroundColor="transparent" />


            </div>
        </div>
    )
}

export default AboutMePage;
