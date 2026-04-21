import confetti from "canvas-confetti";

export function fireFullScreenCelebration() {
    const duration = 2200;
    const animationEnd = Date.now() + duration;

    // Sidebar-safe cutoff (28%)
    const SIDEBAR_CUTOFF = 0.50;

    const colors = [
        "#00FF00", // lime
        "#00FFFF", // cyan
        "#FFFF00", // yellow
        "#FF00FF", // magenta
        "#FF0040", // hot pink
        "#00FFAA", // turquoise
        "#FFD700", // gold
    ];

    // 🔥 Immediate first blast (lighter)
    confetti({
        particleCount: 26,
        angle: 90,
        spread: 110,          // ⬅ wider spread
        startVelocity: 72,
        gravity: 1.35,
        ticks: 520,
        scalar: 2.1,
        origin: {
            x: SIDEBAR_CUTOFF + Math.random() * (1 - SIDEBAR_CUTOFF),
            y: -0.1,
        },
        colors,
        zIndex: 9999,
    });

    let lastFrame = 0;

    (function frame(now) {
        // Emit only every ~120ms → visual breathing room
        if (now - lastFrame > 120) {
            confetti({
                particleCount: 9,      // ⬅ fewer particles
                angle: 90,
                spread: 120,           // ⬅ more horizontal separation
                startVelocity: 62,
                gravity: 1.35,
                ticks: 520,
                scalar: 2.0,
                origin: {
                    x: SIDEBAR_CUTOFF + Math.random() * (1 - SIDEBAR_CUTOFF),
                    y: -0.1,
                },
                colors,
                zIndex: 9999,
            });

            lastFrame = now;
        }

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    })(performance.now());
}
