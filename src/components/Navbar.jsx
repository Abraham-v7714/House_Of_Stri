import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isDarkBg = location.pathname === '/'; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-4 ${
        isScrolled || isOpen
          ? 'py-4 bg-white/80 backdrop-blur-lg shadow-sm text-charcoal' 
          : `py-8 ${isDarkBg ? 'text-white' : 'text-charcoal'}`
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center transition-all duration-500">
          <Link to="/" className="text-xl font-medium tracking-widest uppercase hover:opacity-80 transition-opacity z-[70]">
            House of Stri
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <Link 
              to="/" 
              className={`text-sm uppercase tracking-wide transition-colors ${location.pathname === '/' ? 'opacity-100 font-medium' : 'opacity-60 hover:opacity-100'}`}
            >
              Home
            </Link>
            <Link 
              to="/lookbook" 
              className={`text-sm uppercase tracking-wide transition-colors ${location.pathname === '/lookbook' ? 'opacity-100 font-medium' : 'opacity-60 hover:opacity-100'}`}
            >
              Lookbook
            </Link>
            <a 
              href="/#specializations" 
              className="text-sm uppercase tracking-wide opacity-60 hover:opacity-100 transition-colors"
            >
              Services
            </a>
            <a 
              href="/#contact" 
              className="text-sm uppercase tracking-wide opacity-60 hover:opacity-100 transition-colors"
            >
              Contact
            </a>
            <a 
              href="https://www.instagram.com/stri_by_sudha/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-colors border-l border-current pl-8 ml-2"
            >
              Instagram
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-[70] p-2 -mr-2 flex flex-col gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 transition-colors ${isDarkBg && !isScrolled && !isOpen ? 'bg-white' : 'bg-charcoal'}`}
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-6 h-0.5 transition-colors ${isDarkBg && !isScrolled && !isOpen ? 'bg-white' : 'bg-charcoal'}`}
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 transition-colors ${isDarkBg && !isScrolled && !isOpen ? 'bg-white' : 'bg-charcoal'}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[50] bg-white pt-32 px-6 flex flex-col gap-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <Link to="/" className="text-3xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                Home <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </Link>
              <Link to="/lookbook" className="text-3xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                Lookbook <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </Link>
              <a href="/#specializations" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                Services <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </a>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                Contact <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </a>
            </div>

            <div className="mt-auto pb-12 border-t border-gray-100 pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Stay Connected</p>
              <a 
                href="https://www.instagram.com/stri_by_sudha/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-medium text-charcoal flex items-center gap-3"
              >
                Instagram <span className="text-sage text-sm font-light">@stri_by_sudha</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
