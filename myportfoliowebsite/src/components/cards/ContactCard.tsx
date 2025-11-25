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
                width: "100%",
                boxSizing: "border-box",
                display:"flex",
                flexDirection:"column",
                backgroundColor:"rgba(100,200,100,0.5)"
            }}>

                {/* Header - Matches other pages */}
                <h1 style={{margin: 0, marginTop: "2rem", marginBottom: "1rem"}}>
                    <HoverText text="Contact Me!" className="header-styling" />
                </h1>


                {/* Sub Box for Socials, will be 2x2 grid, 30-70 between icon and text */}
                <div style={{}}>


                </div>


            </div>



            <div></div>


            {/* Right Section - Contact Card Message Sender */}
            <div style={{
                backgroundColor:"rgba(100,100,100,0.5)",
                width:"100%",
                height:"100%",
                display:'flex',
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
                }}>
            

                {/* this is gonna be the form box, replace with actual form code */}
                <div style = {{
                 backgroundColor:"rgba(100,100,100,0.5)",
                 width:"80%",
                 height:"80%"
                }}
                >

                </div>

            </div>


        </div>
            )
}


export default ContactCard;