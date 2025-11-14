"use client"

import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link"

export default function SideBarComponent():JSX.Element {
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
    

    return(
    
    <div className={"sidebar"}>

        <Image src="/images/TMLogoTransparent.png" alt="TM Logo" width={50} height={50} priority />

        <div className={"sidebar-content"} >


            {/* Home */}
            <Link href= "/">
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
                        priority
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
            </Link>


            {/* Room */}
            <Link href= "/room">
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
                            src="/images/3DRoomIcon.png" 
                            alt="My Room" 
                            priority
                            width={34} 
                            height={34}
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
            </Link>

            {/* Skills */}
            <Link href= "/skills">
                <div 
                    className={"sidebar-item"} 
                    onMouseEnter={() => setHoveredItem('skills')}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{ 
                        display: 'grid',
                        placeItems: 'center'  // centers both elements
                    }}
                >
                    <Image 
                        src= "/images/SkillsIcon.png" 
                        alt="Skills" 
                        priority
                        width= {30} 
                        height={30}
                    
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
            </Link>

            {/* Projects */}
            <Link href= "/projects">
                <div 
                    className={"sidebar-item"}
                    onMouseEnter={() => setHoveredItem('projects')}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{ 
                        display: 'grid',
                        placeItems: 'center'  // centers both elements
                    }} 
                >
                    <Image 
                        src= "/images/ProjectsIcon.png" 
                        alt="Projects" 
                        priority
                        width= {30} 
                        height={30}
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
            </Link>

            {/* Work */}
            <Link href="/work">
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
                        priority
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
            </Link>

            {/* Contact */}
            <Link href="/contact">
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
                        priority
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
            </Link>


        </div>

    </div>
    
    )
}