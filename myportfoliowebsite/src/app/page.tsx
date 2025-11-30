"use client"

import SideBarComponent from '@/components/cards/sideBar';
import React, { useState } from 'react'
import Image from "next/image";
import { backgroundBlurriness } from 'three/tsl';
import { useRouter } from 'next/navigation';
import ParticlesBackground from '@/components/ParticlesBackground';
import HoverText from '@/components/HoverText';
import LoadingScreen from '@/components/LoadingScreen';
import { usePageLoader } from '@/hooks/usePageLoader';


function HomePage() {
    const router = useRouter();
    const [hoveredItem,setHoveredItem] = useState<string|null>(null)
    const isLoading = usePageLoader(1200); // 1.2 seconds

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
            <div className="content-container gradient" style={{ position: "relative", padding: "1rem", color: "white", overflow: "hidden"}}>
                    
                    {/* Particles Background with Parallax */}
                    <ParticlesBackground />
                    
                    {/* Loading screen overlays content area while children load */}
                    <LoadingScreen isLoading={isLoading} />
                    
                    {/* Home page content fades in after loading */}
                    <div style={{
                        opacity: isLoading ? 0 : 1,
                        visibility: isLoading ? 'hidden' : 'visible',
                        transition: 'opacity 0.3s ease-in, visibility 0s linear',
                        transitionDelay: isLoading ? '0s' : '0.3s',
                    }}>
                      <div className="fade-in home-content-wrapper" style={{position: "relative", zIndex: 1, marginTop:"3%", display:"grid", justifyContent: "center", justifyItems:"center", textAlign:"center"}}>

                      <Image src={"/images/SynthSun.gif"} alt = "Sun" width={200} height={200} className="home-sun-image"></Image>
                      
                      <div className="home-divider" style={{backgroundColor:"white", height: "1.5px", width:"100%"}}></div>


                      <div className="home-header-container" style={{display:"grid", gridTemplateColumns: "1.15fr 1fr", backgroundColor:"transparent"}}>

                          <h1 className="home-header-1" style={{marginTop:"25px", marginBottom: "0", marginLeft:"0", marginRight:"0"}}>
                              <HoverText text="Hey there!" className='header-styling' />
                          </h1>
                          
                          <h1 className="home-header-2" style={{marginBottom:"-1.5px", paddingTop:"80px", margin: 0}}>
                              <HoverText text="I'm Taha!" className='header-styling' />
                          </h1>

                      </div>


                      <p className='interim-header-styling underline-slide' style={{marginBottom:"-10px"}}>Software Engineer</p>
                      <p className='interim-header-styling underline-slide' style={{marginBottom:"-10px"}}>Finance & Investing Ethusiast</p>
                      <p className='interim-header-styling underline-slide'>Synthwave & Cyberpunk Enjoyer</p>
                      <p className='subheader-styling'>Computer Science and Finance Student at the University of Calgary</p>

                      <br/>
                      
                      <div className="contact-me-button-container" style={{position: "relative", display: "inline-block"}}>
                        
                        <div className="contact-me-button-background" style={{position: "absolute", top: 0, left: 0, pointerEvents: "none"}}></div>
                        
                          <button 
                            className = "contact-me-button" 
                            style={{position: "relative"}}
                            onClick={() => router.push('/contact')}
                          >
                            <span className='contact-me-button-text'>Contact Me</span>
                          </button>
                      
                      </div>
                      <br/>

                      <div
                        className="home-logo-container"
                        onMouseEnter={() => setHoveredItem("hovering")}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{position: "relative", width: "70px", height: "70px"}}
                      >
                        
                        <Image 
                          src="/images/LogoWhite.png" 
                          alt="TM" 
                          width={70} 
                          height={70}
                          style={{
                            position: "absolute", 
                            top: 0, 
                            left: 0,
                            opacity: hoveredItem === "hovering" ? 0 : 1,
                            transition: "opacity 0.3s ease-in-out"
                          }}

                        />
                        
                        <Image 
                          src="/images/Logo.png" 
                          alt="TM" 
                          width={68} 
                          height={68}
                          className="home-logo-colored"
                          style={{
                            position: "absolute", 
                            top: 0, 
                            left: 0,
                            opacity: hoveredItem === "hovering" ? 1 : 0,
                            transform: "translate(0.75px, -0.25px)",
                            transition: "opacity 0.3s ease-in-out"
                          }}
                        />
                      </div>

                      </div>
                    </div>
                    
                    
            </div>

        </div>
      );
    }

export default HomePage;