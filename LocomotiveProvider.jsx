import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useLocation } from "react-router-dom";

export default function LocomotiveProvider({ children }) {
  const containerRef = useRef(null);
  const scrollInstance = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Destroy previous instance
    if (scrollInstance.current) {
      scrollInstance.current.destroy();
      scrollInstance.current = null;
    }

    // Init new instance
    scrollInstance.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 0.75,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    // Update after layout settles
    setTimeout(() => {
      scrollInstance.current?.update();
    }, 300);

    return () => {
      scrollInstance.current?.destroy();
      scrollInstance.current = null;
    };
  }, [location.pathname]); // 🔥 KEY FIX

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}
