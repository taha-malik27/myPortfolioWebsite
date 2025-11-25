"use client"

import React, { useState, useEffect } from 'react';
import HoverText from '@/components/HoverText';
import ProjectImageGallery from '@/components/image/ProjectImageGallery';

interface ContactCardProps {
    backgroundColor?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ backgroundColor = "transparent" }) => {


    return (
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
            }}>


            {/* Left Section - Contact Cards Socials*/}
            <div style={{
                // alignSelf: "center", 
                paddingLeft:"10%",
                paddingRight: "5%",
                paddingBottom:"5%",
                width: "100%",
                boxSizing: "border-box",
                display:"flex",
                flexDirection:"column",
                backgroundColor:"rgba(100,200,100,0.5)",
                // gap:"1.5rem"
            }}>

                {/* Header - Matches other pages */}
                <h1 style={{margin: 0, marginTop: "2rem", marginBottom: "1rem"}}>
                    <HoverText text="Contact Me!" className="header-styling" />
                </h1>


                {/* Sub Box for Socials, will be 2x2 grid, 30-70 between icon and text */}
                <div style={{
                    backgroundColor:"rgba(200,150,150,0.5)", //DEBUG
                    justifySelf:"center",
                    width:"100%",
                    height:"50%",
                    display:"grid",
                    gridTemplateColumns:"1fr 70%",
                    justifyItems:"center",
                    alignItems:"center",
                    textAlign:"center",
                    marginBottom:"2vh"
                }}>

                <div>Email - Icon</div>
                <div>Email - Text/Link</div>
                <div>LinkedIn - Icon</div>
                <div>LinkedIn - Text/Link</div>
                
                </div>


                {/* Resume Box - needs to contain 2 identical buttons with Resume - SENG and Resume - Finance on each */}
                <div style={{
                    backgroundColor:"rgba(100,100,200,0.5)", //DEBUG
                    justifySelf:"center",
                    width:"100%",
                    flex: 1,
                    height:"100%",
                    display:"grid",
                    gridTemplateColumns:"50% 50%",
                    justifyItems:"center",
                    alignItems:"center"
                    

                }}>


                    {/* Download Button 1 - SENG Resume */}
                    <div style={{
                        backgroundColor:"rgba(200,100,100,0.5)", //DEBUG
                        width:"85%",
                        height:"85%"
                    }}>
                        Resume 1 - Software Engineering
                    </div>



                    {/* Download Button 2 - Finance Resume */}
                    <div style={{
                        backgroundColor:"rgba(200,100,100,0.5)", //DEBUG
                        width:"85%",
                        height:"85%"
                    }}>
                        Resume 2 - Finance
                    </div>


                </div>

            </div>



            <div></div>


            {/* Right Section - Contact Card Message Sender - Outer Container */}
            <div style={{
                backgroundColor:"rgba(100,100,100,0.5)", //DEBUG
                width:"100%",
                height:"100%",
                display:'flex',
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
                }}>
            

                {/* this is gonna be the form box, replace with actual form code */}
                <div style = {{
                 backgroundColor:"rgba(100,100,100,0.5)", //DEBUG
                 width:"80%",
                 height:"80%"
                }}
                >
                FORM
                </div>

            </div>


        </div>
            )
}


export default ContactCard;