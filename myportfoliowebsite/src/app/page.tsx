"use client"

import SideBarComponent from '@/components/cards/sideBar';
import React, { useState } from 'react'
import Image from "next/image";
import { backgroundBlurriness } from 'three/tsl';
import { useRouter } from 'next/navigation';


function HomePage() {
    const router = useRouter();
    const [hoveredItem,setHoveredItem] = useState<string|null>(null)

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
            <div className = {"gradient"} style={{ padding: "1rem", color: "white"}}>
                    
                    <div style={{marginTop:"5%", display:"grid", justifyContent: "center", justifyItems:"center", textAlign:"center"}}>

                      <Image src={"/images/SynthSun.gif"} alt = "Sun" width={200} height={200} ></Image>
                      
                      <div style={{backgroundColor:"white", height: "1.5px", width:"75%"}}></div>

                      <h1 className='header-styling' style={{marginBottom:"10px"}}>Hey there! I'm Taha!</h1>
                      <p className='interim-header-styling'>Software Engineer<br/>Finance & Investing Ethusiast<br/>Synthwave & Cyberpunk Enjoyer </p>
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
      );
    }

export default HomePage;