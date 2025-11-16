"use client"

import SideBarComponent from '@/components/cards/sideBar';
import React from 'react'
import ParticlesBackground from '@/components/ParticlesBackground';

function ContactPage() {
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
            <div className={"gradient"} style={{ position: "relative", padding: "1rem", color: "black", overflow: "hidden"}}>
                <ParticlesBackground />
                <div style={{position: "relative", zIndex: 1}}>
                    <h1>Contact Page</h1>
                </div>
            </div>
        </div>
    )
}

export default ContactPage;