import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
      />
      <div
        className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        <div className="mb-8 relative">
          <h1 className="text-[200px] md:text-[300px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-gray-900 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl animate-pulse">
              <Search className="text-gray-600" size={80} />
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="group inline-flex items-center justify-center space-x-2 bg-white text-black px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300"
          >
            <Home size={20} />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'Portfolio', path: '/projects' }, // Changed from /portfolio to /projects based on routes
            { name: 'Contact', path: '/contact' },
          ].map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
