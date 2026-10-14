"use client";

import SideBarComponent from "@/components/cards/sideBar";
import CityScene from "@/components/city/CityScene";
import LoadingScreen from "@/components/LoadingScreen";
import ParticlesBackground from "@/components/ParticlesBackground";
import { usePageLoader } from "@/hooks/usePageLoader";

function HomePage() {
  const isLoading = usePageLoader(1200);

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
      <div className="sidebar-container" style={{ height: "100%" }}>
        <SideBarComponent />
      </div>

      <div
        className="content-container gradient home-city"
        style={{
          position: "relative",
          color: "white",
          overflow: "hidden",
          minHeight: 0,
          height: "100%",
        }}
      >
        <ParticlesBackground />
        <LoadingScreen isLoading={isLoading} />
        <div
          className="home-city-stage"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.3s ease-in",
          }}
        >
          <CityScene />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
