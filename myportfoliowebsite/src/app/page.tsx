import SideBarComponent from '@/components/cards/sideBar';
import React from 'react'



function HomePage() {
    return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr",
            height: "100vh",
            width: "100vw",
            overflow: "hidden", 
          }}
        >
          {/* Left side: sidebar */}
          <div style={{height: "100%" }}>
            <SideBarComponent />
          </div>
    
          {/* Right side: main content */}
          <div className = {"gradient"} style={{ padding: "1rem", color: "black"}}>
            <h1>Home Page</h1>
            <p>Whatever content you want here.</p>
          </div>
        </div>
      );
    }

export default HomePage;