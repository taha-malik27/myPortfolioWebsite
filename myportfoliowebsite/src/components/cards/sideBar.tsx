"use client"

import React, { JSX } from "react";
import Image from "next/image";

export default function SideBarComponent():JSX.Element {
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);


    return(<div className={"sidebar"}>

        <Image src="/images/TMLogoTransparent.png" alt="TM Logo" width={50} height={50} />

        <div className={"sidebar-content"} >


            {/* Home */}
            <div 
                className={"sidebar-item"} 
                onMouseEnter={() => setHoveredItem('home')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ 
                    display: 'grid',
                    placeItems: 'center'
                }}
            >
                <Image 
                    src="/images/HomeIcon.png" 
                    alt="Home" 
                    width={30} 
                    height={30}
                    style={{
                        gridArea: '1 / 1',
                        opacity: hoveredItem === 'home' ? 0 : 1,
                        transition: 'opacity 0.25s ease-in-out'
                    }}
                />
                <span 
                    style={{ 
                        gridArea: '1 / 1',
                        opacity: hoveredItem === 'home' ? 1 : 0,
                        transition: 'opacity 0.25s ease-in-out',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600
                    }}
                >
                    Home
                </span>
            </div>


            {/* Room */}
            <div 
                className={"sidebar-item"} 
                onMouseEnter={() => setHoveredItem('room')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ 
                    display: 'grid',
                    placeItems: 'center'  // centers both elements
                }}
            >
                    <Image 
                        src="/images/3DRoomIcon.png" alt="My Room" width={34} height={34}
                        style={{
                            gridArea: '1 / 1',  // both occupy the same grid cell
                            opacity: hoveredItem === 'room' ? 0 : 1,
                            transition: 'opacity 0.25s ease-in-out'
                        }}
                    />
                    <span 
                        style={{ 
                            gridArea: '1 / 1',
                            opacity: hoveredItem === 'room' ? 1 : 0,
                            transition: 'opacity 0.25s ease-in-out',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600
                        }}
                    >
                        Room
                    </span>
            </div>


            {/* Skills */}
            <div 
                className={"sidebar-item"} 
                onMouseEnter={() => setHoveredItem('skills')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ 
                    display: 'grid',
                    placeItems: 'center'  // centers both elements
                }}
            >
                <Image src= "/images/SkillsIcon.png" alt="Skills" width= {30} height={30}
                
                    style={{
                        gridArea: '1 / 1',  // both occupy the same grid cell
                        opacity: hoveredItem === 'skills' ? 0 : 1,
                        transition: 'opacity 0.25s ease-in-out'
                    }}
                    />
                    <span 
                        style={{ 
                            gridArea: '1 / 1',
                            opacity: hoveredItem === 'skills' ? 1 : 0,
                            transition: 'opacity 0.25s ease-in-out',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600
                        }}
                    >
                        Skills
                    </span>

            </div>
        

            {/* Projects */}
            <div 
                className={"sidebar-item"}
                onMouseEnter={() => setHoveredItem('projects')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ 
                    display: 'grid',
                    placeItems: 'center'  // centers both elements
                }} 
            >
                <Image src= "/images/ProjectsIcon.png" alt="Projects" width= {30} height={30}
                    style={{
                        gridArea: '1 / 1',  // both occupy the same grid cell
                        opacity: hoveredItem === 'projects' ? 0 : 1,
                        transition: 'opacity 0.25s ease-in-out'
                    }}             
                    />
                    <span 
                        style={{ 
                            gridArea: '1 / 1',
                            opacity: hoveredItem === 'projects' ? 1 : 0,
                            transition: 'opacity 0.25s ease-in-out',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600
                        }}
                    >
                        Projects
                    </span>


            </div>


            {/* Work */}
            <div 
                className={"sidebar-item"}
                onMouseEnter={() => setHoveredItem('work')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ 
                    display: 'grid',
                    placeItems: 'center'
                }}
            >
                <Image 
                    src="/images/WorkIcon.png" 
                    alt="Work" 
                    width={29} 
                    height={29}
                    style={{
                        gridArea: '1 / 1',
                        opacity: hoveredItem === 'work' ? 0 : 1,
                        transition: 'opacity 0.25s ease-in-out'
                    }}
                />
                <span 
                    style={{ 
                        gridArea: '1 / 1',
                        opacity: hoveredItem === 'work' ? 1 : 0,
                        transition: 'opacity 0.25s ease-in-out',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600
                    }}
                >
                    Work
                </span>
            </div>


            {/* Contact */}
            <div 
                className={"sidebar-item"}
                onMouseEnter={() => setHoveredItem('contact')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ 
                    display: 'grid',
                    placeItems: 'center'
                }}
            >
                <Image 
                    src="/images/ContactIcon.png" 
                    alt="Contact" 
                    width={30} 
                    height={30}
                    style={{
                        gridArea: '1 / 1',
                        opacity: hoveredItem === 'contact' ? 0 : 1,
                        transition: 'opacity 0.25s ease-in-out'
                    }}
                />
                <span 
                    style={{ 
                        gridArea: '1 / 1',
                        opacity: hoveredItem === 'contact' ? 1 : 0,
                        transition: 'opacity 0.25s ease-in-out',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600
                    }}
                >
                    Contact
                </span>
            </div>
        
        

        </div>

    </div>)
}