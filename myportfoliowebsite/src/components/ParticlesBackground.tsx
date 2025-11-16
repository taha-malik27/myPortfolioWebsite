"use client"

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: ["grab", "bubble"],
            parallax: {
              enable: true,
              force: 40,
              smooth: 15,
            },
          },
        },
        modes: {
          push: {
            quantity: 3,
          },
          grab: {
            distance: 180,
            links: {
              blink: false,
              consent: false,
              opacity: 0.3,
            },
          },
          bubble: {
            distance: 150,
            size: 6,
            duration: 2,
            opacity: 0.6,
          },
        },
      },
      particles: {
        color: {
          value: ["#ffffff", "#e0e0e0", "#c0c0c0", "#f5f5f5"],
        },
        links: {
          color: "#ffffff",
          distance: 140,
          enable: true,
          opacity: 0.15,
          width: 0.8,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 1.2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 70,
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 0.8,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3.5 },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 0.6,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
    );
  }

  return null;
};

export default ParticlesBackground;

