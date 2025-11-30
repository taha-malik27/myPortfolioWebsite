"use client"

import React, { useState } from 'react';
import HoverText from '@/components/HoverText';
import Image from 'next/image';

interface ContactCardProps {
    backgroundColor?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ backgroundColor = "transparent" }) => {
    const [resultMsg, setResultMsg] = useState("");
    const [msgColor, setMsgColor] = useState("");
    const [isLinkedInHovered, setIsLinkedInHovered] = useState(false);
    const [isGmailHovered, setIsGmailHovered] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData.entries());
        
        // Add Web3Forms required fields
        payload.access_key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ""; //be safe haha
        payload.subject = `FROM PORTFOLIO - ${payload.subject}`;
        payload.to_email = "tahammalikbo3@gmail.com";

        setResultMsg("Please wait...");
        setMsgColor("");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.status === 200) {
                setResultMsg(data.message || "Message sent successfully!");
                setMsgColor("success");
            } else {
                setResultMsg(data.message || "Submission failed. Please try again.");
                setMsgColor("error");
            }
        } catch (error) {
            setResultMsg("Something went wrong! Please try again.");
            setMsgColor("error");
        }

        (e.target as HTMLFormElement).reset();
        setTimeout(() => setResultMsg(""), 5000);
    };

    return (
        <div 
            className="fade-in div-scroll contact-card-container" 
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
            <div className="contact-left-section" style={{
                
                paddingLeft:"10%",
                paddingRight: "5%",
                paddingBottom:"5%",
                width: "100%",
                boxSizing: "border-box",
                display:"flex",
                flexDirection:"column",
                // alignItems:"center",
                // backgroundColor:"rgba(100,100,100,0.5)" //DEBUG
            }}>

                {/* Header - Matches other pages */}
                <h1 className="contact-header" style={{margin: 0, marginTop: "2rem", marginBottom: "1rem", alignSelf:"start"}}>
                    <HoverText text="Contact Me!" className="header-styling" />
                </h1>


                {/* Sub Box for Socials - 3 rows: intro text, then 2x2 grid */}
                <div className="contact-socials-section" style={{
                    width:"90%",
                    height:"50%",
                    display:"grid",
                    gridTemplateRows:"auto 1fr 1fr",
                    gridTemplateColumns:"1fr 70%",
                    textAlign:"left",
                    marginBottom:"2vh",
                    // backgroundColor: "rgba(0, 0, 0, 0.3)", //DEBUG
                    // borderRadius: "12px",
                    // padding: "1.5rem",
                    gap: "1rem"
                }}>

                    {/* Intro Text - Full Width Row */}
                    <div className="contact-description" style={{
                        gridColumn: "1 / -1",
                        width: "100%",
                        marginBottom: "0.5rem",
                        paddingRight: "1.8rem",
                        boxSizing: "border-box",
                        
                    }}>
                        <p style={{
                            color: "white",
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "clamp(0.8rem, 2.3vw, 0.95rem)",
                            lineHeight: "1.5",
                            margin: 0,
                            opacity: 0.9
                        }}>
                            Got questions, ideas, opportunities, or something you want to collaborate on? I'm always open to hearing from people who want to build, create, or just wanna reachout. Drop a message through the form and I'll get back to you as soon as I can!
                        </p>
                </div>

                    {/* Email Icon */}
                <div className="contact-gmail-icon" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        width: "100%",
                        height: "100%"
                    }}>
                        <a 
                            href="mailto:tahammalikbo3@gmail.com"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textDecoration: "none",
                                position: "relative"
                            }}
                            onMouseEnter={() => setIsGmailHovered(true)}
                            onMouseLeave={() => setIsGmailHovered(false)}
                        >
                            <div style={{ position: "relative", width: "clamp(60px, 8vw, 100px)", height: "clamp(60px, 8vw, 100px)" }}>
                                <Image
                                    src="/images/contact/GmailIconWhite.png"
                                    alt="Gmail"
                                    width={100}
                                    height={100}
                                    style={{
                                        position: "absolute",
                                        width: "clamp(60px, 8vw, 100px)",
                                        height: "clamp(60px, 8vw, 100px)",
                                        opacity: isGmailHovered ? 0 : 1,
                                        transition: "opacity 0.5s ease",
                                        cursor: "pointer"
                                    }}
                                />
                                <Image
                                    src="/images/contact/GmailIcon.png"
                                    alt="Gmail"
                                    width={100}
                                    height={100}
                                    style={{
                                        position: "absolute",
                                        width: "clamp(60px, 8vw, 100px)",
                                        height: "clamp(60px, 8vw, 100px)",
                                        opacity: isGmailHovered ? 1 : 0,
                                        transition: "opacity 0.5s ease",
                                        cursor: "pointer"
                                    }}
                                />
                            </div>
                        </a>
                    </div>

                    {/* Email Text/Link */}
                    <div className="contact-gmail-text" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "100%",
                        height: "100%",
                        paddingRight: "2rem",
                        boxSizing: "border-box",
                        overflow: "hidden"
                    }}>
                        <a 
                            href="mailto:tahammalikbo3@gmail.com"
                            style={{
                                textDecoration: "none",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
                                wordBreak: "break-all",
                                overflowWrap: "break-word",
                                display: "inline-block",
                                position: "relative",
                                transition: "transform 0.2s ease",
                                maxWidth: "100%",
                                width: "100%",
                                boxSizing: "border-box"
                            }}
                            onMouseEnter={() => setIsGmailHovered(true)}
                            onMouseLeave={() => setIsGmailHovered(false)}
                            onClick={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                setTimeout(() => {
                                    e.currentTarget.style.transform = "scale(1)";
                                }, 200);
                            }}
                        >
                            <span style={{
                                color: "white",
                                opacity: isGmailHovered ? 0 : 1,
                                transition: "opacity 0.5s ease"
                }}>
                                tahammalikbo3@gmail.com
                            </span>
                            <span style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                backgroundImage: "linear-gradient(120deg, rgb(255, 168, 7), rgb(223, 21, 21), rgb(255, 168, 7))",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                opacity: isGmailHovered ? 1 : 0,
                                transition: "opacity 0.5s ease",
                                maxWidth: "100%",
                                wordBreak: "break-all",
                                overflowWrap: "break-word"
                            }}>
                                tahammalikbo3@gmail.com
                            </span>
                        </a>
                    </div>

                    {/* LinkedIn Icon */}
                    <div className="contact-linkedin-icon" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        width: "100%",
                        height: "100%"
                    }}>
                        <a 
                            href="https://www.linkedin.com/in/taha--malik/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textDecoration: "none",
                                position: "relative"
                            }}
                            onMouseEnter={() => setIsLinkedInHovered(true)}
                            onMouseLeave={() => setIsLinkedInHovered(false)}
                        >
                            <div style={{ position: "relative", width: "clamp(60px, 8vw, 100px)", height: "clamp(60px, 8vw, 100px)" }}>
                                <Image
                                    src="/images/contact/LinkedInIconWhite.png"
                                    alt="LinkedIn"
                                    width={100}
                                    height={100}
                                    style={{
                                        position: "absolute",
                                        width: "clamp(60px, 8vw, 100px)",
                                        height: "clamp(60px, 8vw, 100px)",
                                        opacity: isLinkedInHovered ? 0 : 1,
                                        transition: "opacity 0.5s ease",
                                        cursor: "pointer"
                                    }}
                                />
                                <Image
                                    src="/images/contact/LinkedInIcon.png"
                                    alt="LinkedIn"
                                    width={100}
                                    height={100}
                                    style={{
                                        position: "absolute",
                                        width: "clamp(60px, 8vw, 100px)",
                                        height: "clamp(60px, 8vw, 100px)",
                                        opacity: isLinkedInHovered ? 1 : 0,
                                        transition: "opacity 0.5s ease",
                                        cursor: "pointer"
                                    }}
                                />
                            </div>
                        </a>
                    </div>

                    {/* LinkedIn Text/Link */}
                    <div className="contact-linkedin-text" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "100%",
                        height: "100%",
                        paddingRight: "2rem",
                        boxSizing: "border-box",
                        overflow: "hidden"
                    }}>
                        <a 
                            href="https://www.linkedin.com/in/taha--malik/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: "none",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                                display: "inline-block",
                                position: "relative",
                                transition: "transform 0.2s ease",
                                maxWidth: "100%",
                                width: "100%",
                                boxSizing: "border-box"
                            }}
                            onMouseEnter={() => setIsLinkedInHovered(true)}
                            onMouseLeave={() => setIsLinkedInHovered(false)}
                            onClick={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                setTimeout(() => {
                                    e.currentTarget.style.transform = "scale(1)";
                                }, 200);
                            }}
                        >
                            <span style={{
                                color: "white",
                                opacity: isLinkedInHovered ? 0 : 1,
                                transition: "opacity 0.5s ease"
                            }}>
                                LinkedIn Profile
                            </span>
                            <span style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                backgroundImage: "linear-gradient(120deg, rgb(255, 168, 7), rgb(223, 21, 21), rgb(255, 168, 7))",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                opacity: isLinkedInHovered ? 1 : 0,
                                transition: "opacity 0.5s ease",
                                maxWidth: "100%",
                                wordBreak: "break-word",
                                overflowWrap: "break-word"
                            }}>
                                LinkedIn Profile
                            </span>
                        </a>
                    </div>

                </div>

                {/* Resume Box - Single rectangle split 50/50 */}
                <div className="contact-resume-section" style={{
                    marginTop:"5vh",
                    width: "85%",
                    height: "10%",
                    display: "flex",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "12px",
                    padding: "clamp(0.75rem, 2vw, 1.5rem)",
                    gap: "clamp(0.5rem, 1.5vw, 1rem)"
                }}>
                    {/* SENG Resume */}
                    <a
                        href="/downloads/contact/Taha Malik Resume SENG.pdf"
                        download
                        style={{
                            flex: "1 1 0",
                            minWidth: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            color: "white",
                            fontFamily: "'Stack Sans Notch', sans-serif",
                            fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            textAlign: "center",
                            padding: "clamp(0.5rem, 1vw, 1rem)",
                            wordBreak: "break-word",
                            borderRadius: "12px",
                            overflowWrap: "break-word"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                            e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "white";
                        }}
                    >
                        Resume<br/> - <br/>SENG
                    </a>

                    {/* Vertical Divider */}
                    <div style={{
                        width: "1px",
                        flexShrink: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        margin: "clamp(0.25rem, 1vw, 0.5rem) 0"
                    }} />

                    {/* Finance Resume */}
                    <a
                        href="/downloads/contact/Taha Malik Resume Finance.pdf"
                        download
                        style={{
                            flex: "1 1 0",
                            minWidth: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            color: "white",
                            fontFamily: "'Stack Sans Notch', sans-serif",
                            fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            textAlign: "center",
                            padding: "clamp(0.5rem, 1vw, 1rem)",
                            wordBreak: "break-word",
                            borderRadius: "12px",
                            overflowWrap: "break-word"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                            e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "white";
                        }}
                    >
                        Resume<br/> - <br/>Finance
                    </a>
                </div>

            </div>



            <div className="contact-spacer"></div>


            {/* Right Section - Contact Card Message Sender - Outer Container */}
            <div className="contact-form-section" style={{
                width:"100%",
                height:"100%",
                display:'flex',
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
                }}>
            

                {/* Contact Form */}
                <form 
                    onSubmit={handleSubmit}
                    style = {{
                 width:"80%",
                        height:"80%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        padding: "2rem",
                        borderRadius: "12px",
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}
                    className="div-scroll"
                >
                    {/* Web3Forms hidden fields */}
                    <input type="hidden" name="botcheck" value="" />

                    {/* Name Field */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label 
                            htmlFor="name" 
                            style={{
                                color: "white",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontSize: "1rem",
                                fontWeight: 600
                            }}
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter your name"
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                color: "white",
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.3s ease"
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255, 140, 0, 1)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"}
                        />
                    </div>

                    {/* Email Field */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label 
                            htmlFor="email" 
                            style={{
                                color: "white",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontSize: "1rem",
                                fontWeight: 600
                            }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="your.email@example.com"
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                color: "white",
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.3s ease"
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255, 140, 0, 1)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"}
                        />
                    </div>

                    {/* Subject Field */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label 
                            htmlFor="subject" 
                            style={{
                                color: "white",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontSize: "1rem",
                                fontWeight: 600
                            }}
                        >
                            Subject
                        </label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            placeholder="What is this about?"
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                color: "white",
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.3s ease"
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255, 140, 0, 1)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"}
                        />
                    </div>

                    {/* Message Field */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                        <label 
                            htmlFor="message" 
                            style={{
                                color: "white",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontSize: "1rem",
                                fontWeight: 600
                            }}
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            placeholder="Tell me about your project or just say hello!"
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                color: "white",
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "0.9rem",
                                outline: "none",
                                resize: "vertical",
                                transition: "border-color 0.3s ease",
                                minHeight: "120px",
                                width: "100%",
                                boxSizing: "border-box"
                }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255, 140, 0, 1)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"}
                        />
                </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            padding: "0.75rem 1.5rem",
                            borderRadius: "8px",
                            border: "2px solid white",
                            backgroundColor: "transparent",
                            color: "white",
                            fontFamily: "'Stack Sans Notch', sans-serif",
                            fontSize: "1rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            marginTop: "0.5rem"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.borderColor = "rgba(255, 140, 0, 1)";
                            e.currentTarget.style.color = "rgba(255, 140, 0, 1)";
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderColor = "white";
                            e.currentTarget.style.color = "white";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        Send Message
                    </button>

                    {/* Result Message */}
                    {resultMsg && (
                        <p 
                            style={{
                                color: msgColor === "success" ? "rgba(144, 238, 144, 1)" : "rgba(255, 99, 99, 1)",
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "0.9rem",
                                margin: 0,
                                padding: "0.5rem",
                                textAlign: "center"
                            }}
                        >
                            {resultMsg}
                        </p>
                    )}
                </form>

            </div>


        </div>
            )
}


export default ContactCard;