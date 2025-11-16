"use client"

import SideBarComponent from '@/components/cards/sideBar';
import React from 'react'
import ParticlesBackground from '@/components/ParticlesBackground';
import ImageGallery from '@/components/ImageGallery';

function AboutMePage() {
    const images = [
        '/images/Headshot.jpg',
        '/images/SnowHike.jpg',
        '/images/FallHike.jpg',
        '/images/SynthwaveAesthetic.png',
        '/images/CyberpunkAesthetic.png',
        '/images/KidMe.JPG'
    ];

    const descriptions = [
        "Professional headshot",
        "Solo hiking in the mountains",
        "Pastoral fall hiking adventure",
        "Synthwave aesthetic vibes",
        "Cyberpunk cityscape aesthetic",
        "Sneaky lil' childhood vibe check"
    ];
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
            <div className={"gradient div-scroll"} style={{ position: "relative", padding: "1rem", color: "white", overflowY: "scroll", overflowX: "hidden"}}>
                <ParticlesBackground />
                <div className= "fade-in" style={{position: "relative", zIndex: 1, marginTop:"3%", display:"grid", gridTemplateColumns:"50% 1fr", justifyContent: "center", justifyItems:"center", backgroundColor:"transparent"}}>
                    
                    <div style={{paddingLeft:"10%"}}>

                        <h1 className = "header-styling">About Me </h1>


                        <p className='paragraph-styling'>
                            Hey. I am Taha. I study Computer Science and Finance at the University of Calgary, and I spend a lot of time building things, breaking them, and then trying to remember what I did.
                        </p>

                        <p className='paragraph-styling'>
                            I like projects that start as questionable ideas and somehow turn into something real. That mindset is what pushed me to help create MIND, a small but growing neurotech space where we work with EEG, EMG, and brain computer interaction. It feels like a sci fi workshop that somehow made it onto campus.
                        </p>

                        <p className='paragraph-styling'>
                            I have always loved cyberpunk and futurewave worlds. Neon cities and experimental tech are a huge influence on me, and they are part of why I am heading to Singapore for my Winter 2026 exchange. I want to see how places like Singapore, China, and Japan shape their future through design and culture.
                        </p>

                        <p className='paragraph-styling'>
                            When I am not coding or testing signals, I am usually lifting weights, hiking, taking photos, or listening to synthwave far too late at night. I enjoy challenges, I like learning fast, and I try to build things that pull me a little closer to the future I imagine.
                        </p>

                        {/* TLDR Section */}
                        <div style={{
                            marginTop: "30px",
                            padding: "20px",
                            borderLeft: "3px solid #fc8803",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            borderRadius: "8px"
                        }}>
                            <h2 style={{
                                fontFamily: 'Stack Sans Notch, sans-serif',
                                fontWeight: 600,
                                fontSize: "large",
                                color: "#fc8803",
                                marginBottom: "15px",
                                marginTop: 0
                            }}>
                                TL;DR
                            </h2>
                            
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px"
                            }}>
                                <p className='paragraph-styling' style={{margin: 0}}>
                                    🧠 Co founder of a student sci fi style neurotech club
                                </p>
                                <p className='paragraph-styling' style={{margin: 0}}>
                                    🌆 Obsessed with cyberpunk, synthwave, and neon cities
                                </p>
                                <p className='paragraph-styling' style={{margin: 0}}>
                                    ✈️ Heading to Singapore for exchange, with China and Japan on the list
                                </p>
                                <p className='paragraph-styling' style={{margin: 0}}>
                                    🛠 Builds things that should not work but somehow do
                                </p>
                                <p className='paragraph-styling' style={{margin: 0}}>
                                    🏋️ Hiking, lifting, photography, and late night playlists
                                </p>
                            </div>
                        </div>
                
                    </div>

                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", paddingRight:"10%", paddingTop:"5%", paddingLeft:"8%", width: "100%"}}>
                        <ImageGallery images={images} descriptions={descriptions} maxWidth="420px" minWidth="260px" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutMePage;
