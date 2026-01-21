import confetti from "canvas-confetti";

export function fireFullScreenCelebration() {
    const duration = 1400;
    const animationEnd = Date.now() + duration;

    // Adjust this based on your sidebar width
    // Example: sidebar ≈ 260px on a 1440px screen → ~18%
    const SIDEBAR_CUTOFF = 0.22;

    const colors = [
        "#04e648", // neon green
        "#1c04f3", // electric cyan
        "#FFD700", // gold
        "#7a03e9", // vivid purple
        "#dd0606", // hot pink
    ];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 90,               // straight down
            spread: 75,              // controlled spread
            startVelocity: 58,       // strong downward push
            gravity: 1.35,           // ensures it reaches bottom
            ticks: 280,              // long enough to exit screen
            scalar: 1.45,            // 🔥 BIGGER particles
            origin: {
                x: SIDEBAR_CUTOFF + Math.random() * (1 - SIDEBAR_CUTOFF),
                y: -0.08,            // slightly above top
            },
            colors,
            zIndex: 9999,            // above content, below modals
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    })();
}
