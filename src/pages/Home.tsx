import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Palette, Cloud, TrendingUp, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Code size={40} />,
      title: 'Web Development',
      description: 'Cutting-edge web solutions built with modern technologies',
      link: '/web-development',
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
      link: '/mobile-apps',
    },
    {
      icon: <Palette size={40} />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love',
      link: '/ui-ux-design',
    },
    {
      icon: <Cloud size={40} />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment',
      link: '/cloud-solutions',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Digital Strategy',
      description: 'Strategic planning for digital transformation',
      link: '/digital-strategy',
    },
    {
      icon: <Shield size={40} />,
      title: 'Security',
      description: 'Enterprise-grade security and data protection',
      link: '/security',
    },
  ];

  const stats = [
    { number: '150+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '10+', label: 'Years Experience' },
    { number: '25+', label: 'Team Members' },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="Innovative Technology Solutions"
        description="Transforming ideas into digital excellence with cutting-edge technology solutions. Web Development, Mobile Apps, Cloud Solutions, and more."
      />
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 z-10">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              MOBINTIX INFOTECH<span className="text-gray-400">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Transforming Ideas Into Digital Excellence
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              We craft innovative technology solutions that drive business growth and deliver exceptional user experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="group bg-white text-black px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
                title="View Our Work"
              >
                <span>View Our Work</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/contact"
                className="group border-2 border-white text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                title="Get In Touch"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-105 transition-transform duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <h3 className="text-4xl md:text-5xl font-bold text-black mb-2">{stat.number}</h3>
                <p className="text-gray-600 uppercase text-sm tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">What We Do</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white p-8 hover:bg-black transition-all duration-500 cursor-pointer block"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="text-black group-hover:text-white transition-colors duration-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-black group-hover:text-white transition-colors duration-500 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with cutting-edge technology
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-black px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300"
            title="Contact Us Today"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
