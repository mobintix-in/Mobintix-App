import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wider">
              Mobintix Infotech<span className="text-gray-400">.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Innovative technology solutions for modern businesses. We transform ideas into digital reality.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Web Development</li>
              <li>Mobile Apps</li>
              <li>UI/UX Design</li>
              <li>Cloud Solutions</li>
              <li>Consulting</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@mobintix.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+91 94093 83803</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span> 95, Krishna Residency, Surat, Gujarat 394190</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.linkedin.com/company/mobintix/"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/mobintix-in"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.instagram.com/mobintix.infotech"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/mobintix"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Mobintix Infotech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
