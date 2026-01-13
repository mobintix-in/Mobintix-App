import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="block">
                <img
                  src="/Mobintix.png"
                  alt="Mobintix Infotech"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <h3 className="text-2xl font-bold tracking-wider">
                Mobintix Infotech<span className="text-gray-400">.</span>
              </h3>
            </div>
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
            <ul className="space-y-2">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud Solutions', 'Consulting'].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:mobintix@gmail.com"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  <Mail size={16} />
                  <span>mobintix@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mobintix@zohomail.in"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  <Mail size={16} />
                  <span>mobintix@zohomail.in</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:919409383803"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  <Phone size={16} />
                  <span>+91 94093 83803</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/6kx8gkDQSUka9UxY6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  <MapPin size={16} className="flex-shrink-0" />
                  <span>95, Krishna Residency, Surat, Gujarat 394190</span>
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.linkedin.com/company/mobintix/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/mobintix-in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.instagram.com/mobintix.infotech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/mobintix/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">&copy; {currentYear} Mobintix Infotech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
