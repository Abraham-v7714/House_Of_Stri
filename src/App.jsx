import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specializations from './components/Specializations';
import Process from './components/Process';
import Gallery from './components/Gallery';
import LoveWall from './components/LoveWall';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Contact from './components/Contact';

function Home() {
  return (
    <>
      <Hero />
      <Specializations />
      <Process />
      <LoveWall />
      <Contact />
    </>
  );
}

function LookbookPage() {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <Gallery />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen text-charcoal flex flex-col font-sans w-full overflow-hidden">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lookbook" element={<LookbookPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
