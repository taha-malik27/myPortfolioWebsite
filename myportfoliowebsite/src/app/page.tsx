import SideBarComponent from '@/components/cards/sideBar';
import React from 'react'
import Image from "next/image";
import { backgroundBlurriness } from 'three/tsl';


function HomePage() {
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

                      
                      <div className="contact-me-button-container" style={{position: "relative", display: "inline-block"}}>
                        
                        <div className="contact-me-button-background" style={{position: "absolute", top: 0, left: 0, pointerEvents: "none"}}></div>
                        
                          <button className = "contact-me-button" style={{position: "relative"}}>
                          
                          <span className='contact-me-button-text'>Contact Me</span>

                        </button>
                      
                      </div>


                    </div>
                    
                    
            </div>

        </div>
      );
    }

export default HomePage;