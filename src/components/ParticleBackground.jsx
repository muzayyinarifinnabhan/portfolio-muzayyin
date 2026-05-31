import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: { enable: false },
                        onHover: { enable: false },
                        resize: true,
                    },
                },
                particles: {
                    color: { value: "#0F3D2E" },
                    links: {
                        color: "#C45A1A",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        outModes: { default: "bounce" },
                        speed: 1,
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 20,
                    },
                    opacity: { value: 0.4 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: false,
            }}
            className="absolute inset-0 z-0 h-full w-full"
        />
    );
};

export default ParticleBackground;
