"use client"

import { JSX, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import SideBarComponent from '@/components/cards/sideBar';
import LoadingScreen from '@/components/LoadingScreen';
import { isMobileDevice } from '@/utils/isMobile';

// Dynamically import RoomCanvas only on desktop (prevents loading on mobile)
const RoomCanvas = dynamic(() => import("./RoomCanvas"), {
    ssr: false,
    loading: () => null
});

const ROOM_ALERT_KEY = 'room-webgl-alert-accepted';

function Page(): JSX.Element | null {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean | null>(null); // null = checking
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertAccepted, setAlertAccepted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = "Taha's Portfolio - My Room";
    }, []);

    // Check for mobile FIRST, before anything else loads
    useEffect(() => {
        // Check mobile immediately on mount
        const mobile = isMobileDevice();
        setIsMobile(mobile);

        // If mobile, don't proceed with any other logic - return early
        if (mobile) {
            return;
        }

        // Only continue if NOT mobile
        // Show loading screen at the very start, then check sessionStorage
        const timer = setTimeout(() => {
            setIsLoading(false);
            // After loading screen, check if user has previously accepted
            const accepted = sessionStorage.getItem(ROOM_ALERT_KEY) === 'true';
            
            if (accepted) {
                // If they accepted before, they're coming back - show loading screen again
                setAlertAccepted(true);
                setIsLoading(true);
                // Hide loading screen after scene loads
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            } else {
                // If not accepted, show the alert
                setShowAlert(true);
            }
        }, 1200); // Show initial loading screen for 1.2 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        // Store acceptance in sessionStorage (persists during this browser session, cleared when tab/window closes)
        sessionStorage.setItem(ROOM_ALERT_KEY, 'true');
        setShowAlert(false);
        setAlertAccepted(true);
        // Don't show loading screen when they accept - they're already here
        setIsLoading(false);
    };

    const handleReject = () => {
        // Don't store rejection - they'll see alert again if they come back
        router.back();
    };

    // MOBILE BLOCK - Check FIRST before anything else
    // If still checking, show loading
    if (isMobile === null) {
        return (
            <div
                className="page-container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "50px 1fr",
                    height: "100vh",
                    width: "100vw",
                    overflow: "hidden", 
                }}
            >
                <div className="sidebar-container" style={{height: "100%" }}>
                    <SideBarComponent />
                </div>
                <div className="content-container gradient" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <LoadingScreen isLoading={true} />
                </div>
            </div>
        );
    }

    // If mobile detected, show blocking popup - prevent ALL room access
    if (isMobile) {
        return (
            <div
                className="page-container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "50px 1fr",
                    height: "100vh",
                    width: "100vw",
                    overflow: "hidden", 
                }}
            >
                {/* Left side: sidebar */}
                <div className="sidebar-container" style={{height: "100%" }}>
                    <SideBarComponent />
                </div>

                {/* Right side: Mobile Block Popup */}
                <div className="content-container gradient" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    position: "relative"
                }}>
                    <div style={{
                        backgroundColor: 'rgba(11, 2, 2, 0.95)',
                        padding: '2.5rem',
                        borderRadius: '12px',
                        maxWidth: '600px',
                        width: '90%',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        textAlign: 'center',
                        zIndex: 10000
                    }}>
                        <h2 style={{
                            fontFamily: "'Stack Sans Notch', sans-serif",
                            fontWeight: 600,
                            color: 'white',
                            fontSize: 'xx-large',
                            margin: 0
                        }}>
                            Mobile Access Restricted
                        </h2>
                        
                        <p style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 400,
                            color: 'rgb(232, 229, 229)',
                            fontSize: '16px',
                            lineHeight: '1.6',
                            margin: 0
                        }}>
                            You're on a mobile device. The 3D room experience is not available on mobile devices due to performance limitations and hardware requirements.
                        </p>
                        
                        <p style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 400,
                            color: 'rgb(232, 229, 229)',
                            fontSize: '16px',
                            lineHeight: '1.6',
                            margin: 0
                        }}>
                            To access the room, please use a desktop or laptop computer with a modern GPU.
                        </p>
                        
                        <p style={{
                            fontFamily: "'Stack Sans Notch', sans-serif",
                            fontWeight: 400,
                            color: 'white',
                            fontSize: 'large',
                            margin: 0,
                            marginTop: '0.5rem'
                        }}>
                            This prevents unnecessary resource usage and ensures the best experience.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            marginTop: '0.5rem'
                        }}>
                            <button
                                onClick={handleReject}
                                style={{
                                    fontFamily: "'Stack Sans Notch', sans-serif",
                                    fontWeight: 600,
                                    fontSize: 'medium',
                                    padding: '0.75rem 2rem',
                                    backgroundColor: 'rgba(172, 114, 6, 0.8)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(172, 114, 6, 1)';
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(172, 114, 6, 0.8)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show alert if not accepted yet
    if (showAlert) {
        return (
            <div
                className="page-container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "50px 1fr",
                    height: "100vh",
                    width: "100vw",
                    overflow: "hidden", 
                }}
            >
                {/* Left side: sidebar */}
                <div className="sidebar-container" style={{height: "100%" }}>
                    <SideBarComponent />
                </div>

                {/* Right side: Alert centered */}
                <div className="content-container gradient" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    position: "relative"
                }}>
                    <LoadingScreen isLoading={isLoading} />
                    <div style={{
                        backgroundColor: 'rgba(11, 2, 2, 0.95)',
                        padding: '2.5rem',
                        borderRadius: '12px',
                        maxWidth: '600px',
                        width: '90%',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        textAlign: 'center'
                    }}>
                    <h2 style={{
                        fontFamily: "'Stack Sans Notch', sans-serif",
                        fontWeight: 600,
                        color: 'white',
                        fontSize: 'xx-large',
                        margin: 0
                    }}>
                        WebGL Performance Warning
                    </h2>
                    
                    <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 400,
                        color: 'rgb(232, 229, 229)',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        margin: 0
                    }}>
                        This is a 3D render of my room built with TypeScript and Three.js. It uses WebGL and requires a relatively strong or modern GPU to run smoothly.
                    </p>
                    
                    <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 400,
                        color: 'rgb(232, 229, 229)',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        margin: 0
                    }}>
                        It is possible to run this on an older computer (I built the room on a really old one), but it will be laggy, take quite some time to load, and overall will have performance issues.
                    </p>
                    
                    <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 400,
                        color: 'rgb(232, 229, 229)',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        margin: 0,
                        marginTop: '0.5rem'
                    }}>
                        We recommend against using this on mobile devices due to performance limitations.
                    </p>
                    
                    <p style={{
                        fontFamily: "'Stack Sans Notch', sans-serif",
                        fontWeight: 400,
                        color: 'white',
                        fontSize: 'large',
                        margin: 0,
                        marginTop: '0.5rem'
                    }}>
                        Proceed if you're okay with that or have a good GPU.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        marginTop: '0.5rem'
                    }}>
                        <button
                            onClick={handleAccept}
                            style={{
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontWeight: 600,
                                fontSize: 'medium',
                                padding: '0.75rem 2rem',
                                backgroundColor: 'rgba(172, 114, 6, 0.8)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(172, 114, 6, 1)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(172, 114, 6, 0.8)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            Yes, Proceed
                        </button>
                        
                        <button
                            onClick={handleReject}
                            style={{
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontWeight: 600,
                                fontSize: 'medium',
                                padding: '0.75rem 2rem',
                                backgroundColor: 'rgba(125, 12, 12, 0.8)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(125, 12, 12, 1)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(125, 12, 12, 0.8)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            No, Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }

    // Show room content only if alert was accepted AND not on mobile
    if (!alertAccepted) {
        // Still loading/checking - show sidebar with loading screen
        return (
            <div
                className="page-container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "50px 1fr",
                    height: "100vh",
                    width: "100vw",
                    overflow: "hidden", 
                }}
            >
                <div className="sidebar-container" style={{height: "100%" }}>
                    <SideBarComponent />
                </div>
                <div className="content-container gradient" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <LoadingScreen isLoading={isLoading} />
                </div>
            </div>
        );
    }

    // Final safeguard: Only render RoomCanvas if not on mobile (should never reach here on mobile, but extra protection)
    if (isMobile) {
        return null;
    }

    return (
        <div
          className="page-container"
          style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr",
            height: "100vh",
            width: "100vw",
            overflow: "hidden", 
          }}
        >
            {/* Left side: sidebar */}
            <div className="sidebar-container" style={{height: "100%" }}>
                <SideBarComponent />
            </div>

            {/* Right side: 3D Room Canvas - Only loads on desktop */}
            <div className="content-container" style={{ backgroundColor: '#000000', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                <RoomCanvas/>
                <LoadingScreen isLoading={isLoading} />
            </div>
        </div>
    )

}

export default Page