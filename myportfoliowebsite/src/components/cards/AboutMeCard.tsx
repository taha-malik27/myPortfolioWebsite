"use client"

import React from 'react';
import ImageGallery from '@/components/image/ImageGallery';
import HoverText from '@/components/HoverText';

interface AboutMeCardProps {
    backgroundColor?: string;
}

const AboutMeCard: React.FC<AboutMeCardProps> = ({ backgroundColor = "transparent" }) => {
    
    
    const images = [
        '/images/about/TMHeadshot.JPG',
        '/images/about/KualaLumpur.jpg',
        '/images/about/SnowHike.jpg',
        '/images/about/FallHike.jpg',
        '/images/about/HaGiangLoop.jpg',
        '/images/about/SynthwaveAesthetic.png',
        '/images/about/GreatWallofChina.jpg',
        '/images/about/CyberpunkAesthetic.png',
        '/images/about/KidMe.JPG'
    ];

    const descriptions = [
        "Professional headshot",
        "Chillin' in Kuala Lumpur",
        "Solo hiking in the mountains",
        "Pastoral fall hiking adventure",
        "Ha Giang Loop, Vietnam",
        "Synthwave aesthetic vibes",
        "Taking in the Great Wall of China",
        "Cyberpunk cityscape aesthetic",
        "Sneaky lil' childhood vibe check"
    ];

    return (
        <div 
            className="fade-in div-scroll about-me-card" 
            style={{
                /* Positioning */
                position: "relative",
                zIndex: 1,
                
                /* Layout */
                display: "grid",
                gridTemplateColumns: "50% 1fr",
                justifyContent: "center",
                justifyItems: "center",
                
                /* Sizing */
                height: "calc(100vh - 2rem)",
                
                /* Spacing */
                marginTop: "-0.5%",
                paddingRight: "2rem",
                
                /* Overflow */
                overflowY: "auto",
                overflowX: "hidden",
                
                /* Appearance */
                backgroundColor: backgroundColor
            }}
        >
            {/* Text Content Section */}
            <div className="about-me-text-section" style={{
                alignSelf: "center", 
                paddingLeft:"10%",
                paddingRight: "5%",
                width: "100%",
                boxSizing: "border-box"
            }}>
                <h1 className="about-me-header" style={{margin: 0, marginBottom: "1rem"}}>
                    <HoverText text="About Me" className="header-styling" />
                </h1>

                <p className='paragraph-styling'>
                    Hey! I'm Taha. I study Computer Science and Finance at the University of Calgary, and I spend a lot of time building things, breaking them, and then trying to remember what I did.
                </p>

                <p className='paragraph-styling'>
                    I like projects that start as questionable ideas and somehow turn into something real. That mindset is what pushed me to help create MIND, a small but growing neurotech space where we work with EEG, EMG, and brain computer interaction. It feels like a sci fi workshop that somehow made it onto campus.
                </p>

                <p className='paragraph-styling'>
                    I have always loved cyberpunk and futurewave worlds. Neon cities and experimental tech are a huge influence on me, and they are part of why I picked Singapore for my Winter 2026 exchange. That one is in the books now, and seeing how places like Singapore, China, and Japan actually build their future was very different from reading about it.
                </p>

                <p className='paragraph-styling'>
                    The exchange also turned me into a proper traveler. I am at ten countries at 21 and already working on the next one, because every new place changes how I think about the one I came from.
                </p>

                <p className='paragraph-styling'>
                    When I am not coding or testing signals, I am usually lifting weights, hiking, taking photos, or listening to synthwave far too late at night. I enjoy challenges, I like learning fast, and I try to build things that pull me a little closer to the future I imagine.
                </p>

                {/* TLDR Section */}
                <div className="about-me-tldr" style={{
                    marginTop: "30px",
                    padding: "20px",
                    borderLeft: "3px solid #fc8803",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "8px",
                    marginBottom: "20px"
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
                            ✈️ Ten countries at 21 after my Singapore exchange, and counting
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

            {/* Image Gallery Section */}
            <div className="about-me-gallery" style={{
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                paddingRight: "10%", 
                paddingTop: "5%", 
                paddingLeft: "12%", 
                width: "100%"
            }}>
                <ImageGallery 
                    images={images} 
                    descriptions={descriptions} 
                    maxWidth="420px" 
                    minWidth="220px" 
                />
            </div>
        </div>
    );
};

export default AboutMeCard;

