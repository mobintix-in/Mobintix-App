import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled || location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service'
        ? 'bg-black shadow-lg py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold text-white tracking-wider hover:scale-105 transition-transform duration-300"
            title="Mobintix Infotech Home"
          >
            Mobintix Infotech<span className="text-gray-400">.</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-wider font-medium transition-all duration-300 relative group ${location.pathname === link.path
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                ></span>
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            title="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black z-40 md:hidden transition-all duration-500 ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl uppercase tracking-wider font-medium transition-all duration-300 ${location.pathname === link.path ? 'text-white' : 'text-gray-400'
                }`}
              style={{
                animation: isMobileMenuOpen
                  ? `slideIn 0.5s ease-out ${index * 0.1}s both`
                  : 'none',
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
