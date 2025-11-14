"use client"

import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function SideBarComponent():JSX.Element {
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
    const pathname = usePathname();
    

    return(
    
    <div className={"sidebar"}>
        <Link href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <Image src="/images/Logo.png" alt="TM Logo" width={45} height={45} priority />
        
        </Link>

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
                        src={pathname === '/' ? "/images/HomeIcon.png" : "/images/HomeIconWhite.png"}
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
                            color: pathname === '/' ? 'orange' : 'white',
                            backgroundImage: pathname === '/' ? 'linear-gradient(120deg,rgb(223, 21, 21) 25%, rgb(255, 168, 7))' : 'none',
                            backgroundClip: pathname === '/' ? 'text' : 'unset',
                            WebkitBackgroundClip: pathname === '/' ? 'text' : 'unset',
                            WebkitTextFillColor: pathname === '/' ? 'transparent' : 'white'
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
                            src={pathname === '/room' ? "/images/3DRoomIcon.png" : "/images/3DRoomIconWhite.png"}
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
                                color: pathname === '/room' ? 'orange' : 'white',
                                backgroundImage: pathname === '/room' ? 'linear-gradient(120deg,rgb(223, 21, 21) 25%, rgb(255, 168, 7))' : 'none',
                                backgroundClip: pathname === '/room' ? 'text' : 'unset',
                                WebkitBackgroundClip: pathname === '/room' ? 'text' : 'unset',
                                WebkitTextFillColor: pathname === '/room' ? 'transparent' : 'white'
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
                        src={pathname === '/skills' ? "/images/SkillsIcon.png" : "/images/SkillsIconWhite.png"}
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
                                color: pathname === '/skills' ? 'orange' : 'white',
                                backgroundImage: pathname === '/skills' ? 'linear-gradient(120deg,rgb(223, 21, 21) 25%, rgb(255, 168, 7))' : 'none',
                                backgroundClip: pathname === '/skills' ? 'text' : 'unset',
                                WebkitBackgroundClip: pathname === '/skills' ? 'text' : 'unset',
                                WebkitTextFillColor: pathname === '/skills' ? 'transparent' : 'white'
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
                        src={pathname === '/projects' ? "/images/ProjectsIcon.png" : "/images/ProjectsIconWhite.png"}
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
                                color: pathname === '/projects' ? 'orange' : 'white',
                                backgroundImage: pathname === '/projects' ? 'linear-gradient(120deg,rgb(223, 21, 21) 25%, rgb(255, 168, 7))' : 'none',
                                backgroundClip: pathname === '/projects' ? 'text' : 'unset',
                                WebkitBackgroundClip: pathname === '/projects' ? 'text' : 'unset',
                                WebkitTextFillColor: pathname === '/projects' ? 'transparent' : 'white'
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
                        src={pathname === '/work' ? "/images/WorkIcon.png" : "/images/WorkIconWhite.png"}
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
                            color: pathname === '/work' ? 'orange' : 'white',
                            backgroundImage: pathname === '/work' ? 'linear-gradient(120deg,rgb(223, 21, 21) 25%, rgb(255, 168, 7))' : 'none',
                            backgroundClip: pathname === '/work' ? 'text' : 'unset',
                            WebkitBackgroundClip: pathname === '/work' ? 'text' : 'unset',
                            WebkitTextFillColor: pathname === '/work' ? 'transparent' : 'white'
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
                        src={pathname === '/contact' ? "/images/ContactIcon.png" : "/images/ContactIconWhite.png"}
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
                            color: pathname === '/contact' ? 'orange' : 'white',
                            backgroundImage: pathname === '/contact' ? 'linear-gradient(120deg,rgb(223, 21, 21) 25%, rgb(255, 168, 7))' : 'none',
                            backgroundClip: pathname === '/contact' ? 'text' : 'unset',
                            WebkitBackgroundClip: pathname === '/contact' ? 'text' : 'unset',
                            WebkitTextFillColor: pathname === '/contact' ? 'transparent' : 'white'
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