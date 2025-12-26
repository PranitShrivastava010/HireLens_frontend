
// import './App.css'
import { useEffect, useRef } from 'react';
import HomeNavbar from './component/layout/HomeNavbar'
import HomePage from './pages/HomePage'
import ParalaxPage from './pages/ParalaxPage'
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import FeaturesPage from './pages/FeaturesPage';
import CardPage from './pages/CardPage';

function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.75,
    });

    return () => scroll.destroy();
  }, []);

  return (
    <>
      <div ref={scrollRef} data-scroll-container>
        <HomeNavbar />
        <HomePage />
        <ParalaxPage />
        <FeaturesPage/>
        <CardPage/>
      </div>
    </>
  )
}

export default App
