"use client"

import React, {JSX} from 'react';
import ImageGallery from '@/components/ImageGallery';
import HoverText from '@/components/HoverText';


interface SkillsCardProps {
    backgroundColor?: string
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ backgroundColor = "transparent" }) => {

    return (
        <div 
            className="fade-in div-scroll" 
            style={{
                /* Positioning */
                position: "relative",
                zIndex: 1,
                
                /* Layout */
                display: "grid",
                gridTemplateColumns: "55% 1fr",
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
            {/* Left Section - Skills Content */}
            <div style={{
                alignSelf: "center", 
                backgroundColor: "rgba(0, 0, 0, 0.47)", // white tint - temporary
                width: "100%",
               
            }}>


                    <h1 style={{ margin: 0, marginBottom: "1rem" }}>
                        <HoverText text="My Skills" className="header-styling" />
                    </h1>

                    
                    {/* Skills Categories Section */}
                    <div style={{
                        backgroundColor: "rgba(0, 255, 0, 0.2)", // Green tint - temporary
                        padding: "1rem",
                        marginBottom: "1rem"
                    }}>
                        <h2>Category 1 - Languages</h2>
                        <p className='paragraph-styling'>Skills content here...</p>
                    </div>


                    <div style={{
                        backgroundColor: "rgba(0, 0, 255, 0.2)", // Blue tint - temporary
                        padding: "1rem",
                        marginBottom: "1rem"
                    }}>

                        <h2>Category 2 - Frameworks</h2>
                        <p className='paragraph-styling'>Skills content here...</p>
                    </div>


                    <div style={{
                        backgroundColor: "rgba(255, 255, 0, 0.2)", // Yellow tint - temporary
                        padding: "1rem",
                        marginBottom: "1rem"
                    }}>
                        <h2>Category 3 - Tools</h2>
                        <p className='paragraph-styling'>Skills content here...</p>
                    </div>

                    
            </div>

            


            {/* Right Section - Visual/Interactive Element */}
            <div style={{
                display: "grid", 
                gridTemplateRows:"30% 1fr",
                alignItems:"center" , 
                justifyContent: "center", 
                width: "100%",
                backgroundColor: "rgba(105, 105, 105, 0.77)" 
            }}>


                <div style={{
                    backgroundColor: "rgba(0, 255, 255, 0.3)", // Cyan tint - temporary
                    padding: "2rem",
                    textAlign: "center",
                    height:"30%"
                }}>
                    <p>Category Controller</p>
                </div>

                <div style={{
                    backgroundColor: "rgba(0, 255, 255, 0.3)", // Cyan tint - temporary
                    padding: "2rem",
                    textAlign: "center",
                    height:"70%"
                }}>
                    <p>Visual element / Icon grid / Chart goes here</p>
                </div>

            </div>
        </div>
    );

}

