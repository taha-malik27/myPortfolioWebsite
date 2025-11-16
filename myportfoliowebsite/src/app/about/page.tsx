"use client"

import SideBarComponent from '@/components/cards/sideBar';
import React from 'react'
import ParticlesBackground from '@/components/ParticlesBackground';

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
            <div className={"gradient"} style={{ position: "relative", padding: "1rem", color: "white", overflow: "hidden"}}>
                <ParticlesBackground />
                <div className= "fade-in" style={{position: "relative", zIndex: 1, marginTop:"3%", display:"grid", justifyContent: "center", justifyItems:"center", textAlign:"center"}}>
                    <h1 className = "header-styling">About Me </h1>
                </div>
            </div>
        </div>
    )
}

export default AboutMePage;

