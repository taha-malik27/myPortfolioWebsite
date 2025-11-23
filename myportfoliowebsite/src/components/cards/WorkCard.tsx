"use client"

import React, { useState, useEffect } from 'react';
import HoverText from '@/components/HoverText';
import ProjectImageGallery from '@/components/image/ProjectImageGallery';

interface WorkCardProps {
    backgroundColor?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ backgroundColor = "transparent" }) => {

    return(



        <div 
            className="fade-in div-scroll" 
            style={{
                /* Positioning */
                position: "relative",
                zIndex: 1,
                
                /* Layout */
                display: "grid",
                gridTemplateColumns: "48% 4% 48%",
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

            {/* Left Section - Work Experience Details*/}
            <div style={{
                alignSelf: "center", 
                paddingLeft:"10%",
                paddingRight: "5%",
                width: "100%",
                boxSizing: "border-box",
                height:"100%",
                backgroundColor:"darkblue"
                
            }}>

            {/* Header - Matches other pages */}
            <h1 style={{margin: 0, marginTop: "2rem", marginBottom: "1rem"}}>

                    <HoverText text="My Work Expierience" className="header-styling" />

            </h1>





            </div>

            {/* Middle Section, just a spacer*/ }
            <div>

            </div>


            {/*Right Section, Visual Vertical Timeline*/}
            <div className='div-scroll' style={{
                overflowY: "scroll",
                height:"100%", 
                width:"100%",
                backgroundColor:'darkgreen',
                display: "grid",
                gridTemplateColumns:" 45% 10% 45%",
                
                
                                
                }}>


                <div style={{border:"black 1px solid",
                    display:"grid",
                    gridAutoRows: "1fr"
                }}>

                    <div style={{border:"black 1px solid"}}>3</div>
                    <div style={{border:"black 1px solid"}}>3</div>
                    <div style={{border:"black 1px solid"}}>3</div>
                    <div style={{border:"black 1px solid"}}>3</div>
                    
                </div>

                
                <div style={{border:"black 1px solid",
                    display:"grid",
                    gridAutoRows: "1fr"
                }}>2</div>


                <div style={{border:"black 1px solid",
                    display:"grid",
                    gridAutoRows: "1fr"
                }}>
                    
                    <div style={{border:"black 1px solid"}}>3</div>
                    <div style={{border:"black 1px solid"}}>3</div>
                    <div style={{border:"black 1px solid"}}>3</div>
                    <div style={{border:"black 1px solid"}}>3</div>

                </div>

                


            </div>




        </div>)
}


export default WorkCard;