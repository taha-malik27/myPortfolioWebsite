"use client"

import React from 'react';
import HoverText from '@/components/HoverText';

interface ProjectCardProps {
    backgroundColor?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ backgroundColor = "transparent" }) => {
    
    return (
        <div 
            className="fade-in div-scroll" 
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
                paddingRight: "1rem",
                
                /* Overflow */
                overflowY: "auto",
                overflowX: "hidden",
                
                /* Appearance */
                backgroundColor: backgroundColor
            }}
        >
            {/* Text Content Section */}
            <div style={{
                alignSelf: "center", 
                paddingLeft:"10%",
                paddingRight: "5%",
                width: "100%",
                boxSizing: "border-box",
                overflowY:"scroll"
               
            }}>
                <h1 style={{margin: 0, marginBottom: "1rem"}}>
                    <HoverText text="My Projects" className="header-styling" />
                </h1>


                <div style={{
                    display:"grid",
                    gridTemplateColumns: "1fr 1fr"
                }}>

                    <div className='card' >
                        PROJECT 1

                    </div>

                    <div className='card' >
                        PROJECT 2

                    </div >

                    <div className='card' >
                        PROJECT 3

                    </div>

                    <div className='card'>
                        PROJECT 4

                    </div>


                </div>


            </div>

            {/* Right Section - Visual Element */}
            <div style={{
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                paddingRight: "10%", 
                paddingTop: "5%", 
                paddingLeft: "12%", 
                width: "100%",
                
            }}>
                <div style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.9rem"
                    
                }}>
                    Visual content placeholder
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

