import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Palette, Cloud, TrendingUp, Shield, Check, Globe, DollarSign, Clock, Headphones } from 'lucide-react';
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
    { number: '50+', label: 'Clients in India' },
    { number: '30+', label: 'Worldwide Clients' },
    { number: '2+', label: 'Years Experience' },
    { number: '25+', label: 'Team Members' },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="Mobintix Infotech | Web & Mobile App Development Company"
        description="We build scalable web and mobile applications using React, Flutter, and modern technologies. Trusted by global clients."
        keywords="web development company, mobile app development, Flutter developers, React agency, Mobintix Infotech"
        url="/"
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
                className="group bg-white text-black px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                title="View Our Work"
              >
                <span>View Our Work</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/contact"
                className="group border-2 border-white text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 rounded-xl"
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
            {features.map((feature, index) => {
              const bgColors = [
                'bg-blue-50',
                'bg-purple-50',
                'bg-pink-50',
                'bg-sky-50',
                'bg-orange-50',
                'bg-green-50'
              ];
              const colorClass = bgColors[index % bgColors.length];

              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden block"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`}></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Service Packages</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We offer flexible, scalable solutions tailored to startups, businesses, and enterprises worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Starter Plan */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">💼 Starter Plan</h3>
                <p className="text-gray-500 mb-4">Best for small businesses & startups getting online.</p>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-black">$499 – $999</span>
                  <span className="text-gray-500 text-sm">(One-time)</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {[
                  'Responsive Website (up to 5 pages)',
                  'Modern UI/UX Design',
                  'Contact Form Integration',
                  'Basic SEO Setup',
                  'Fast Performance Optimization',
                  '1 Month Free Support'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-6 mb-8 space-y-3 text-sm">
                <p><span className="font-semibold text-black">Best For:</span> Landing pages, small business websites, MVPs</p>
                <p><span className="font-semibold text-black">👉 Delivery:</span> 7–10 Days</p>
              </div>
              <Link
                to="/contact"
                className="block w-full text-center bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-black text-white p-8 rounded-2xl border border-gray-800 shadow-2xl transform scale-105 z-10 flex flex-col">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">📱 Business Plan</h3>
                <p className="text-gray-400 mb-4">Ideal for growing businesses that need custom functionality.</p>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">$1,499 – $2,499</span>
                  <span className="text-gray-400 text-sm">(One-time)</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {[
                  'Web or Mobile App (Flutter / React)',
                  'Custom UI/UX Design',
                  'Backend & API Development',
                  'Database Integration',
                  'Authentication (Login / Signup)',
                  'Admin Panel (Basic)',
                  'Deployment & Hosting Setup',
                  '2 Months Free Support'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <Check className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-800 pt-6 mb-8 space-y-3 text-sm text-gray-300">
                <p><span className="font-semibold text-white">Best For:</span> Business apps, dashboards, service platforms</p>
                <p><span className="font-semibold text-white">👉 Delivery:</span> 3–5 Weeks</p>
              </div>
              <Link
                to="/contact"
                className="block w-full text-center bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl"
              >
                Choose Business Plan
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">🧠 Enterprise Plan</h3>
                <p className="text-gray-500 mb-4">Built for startups and enterprises needing scalable, advanced systems.</p>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-black">Starting at $3,999+</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {[
                  'Custom Web + Mobile Application',
                  'Advanced Backend Architecture',
                  'Cloud Deployment',
                  'Automation & SaaS Solutions',
                  'Third-Party API Integrations',
                  'Payment Gateway Integration',
                  'Security & Performance Optimization',
                  'Dedicated Project Manager',
                  '3–6 Months Support'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-6 mb-8 space-y-3 text-sm">
                <p><span className="font-semibold text-black">Best For:</span> SaaS platforms, automation systems, large-scale apps</p>
                <p><span className="font-semibold text-black">👉 Delivery:</span> Custom Timeline</p>
              </div>
              <Link
                to="/contact"
                className="block w-full text-center bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Why Choose Us Section - New UI */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                WHY CHOOSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MOBINTIX?</span>
              </h2>
              <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {/* Feature 1 */}
              <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    <Globe size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">Global Experience</h3>
                  <p className="text-gray-600">Trusted by clients across US, Canada, Australia, and Europe.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    <Code size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">Clean & Secure Code</h3>
                  <p className="text-gray-600">Scalable architecture with enterprise-grade security standards.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    <DollarSign size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">Transparent Pricing</h3>
                  <p className="text-gray-600">No hidden costs. Clear, upfront pricing for every project.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    <Clock size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">On-time Delivery</h3>
                  <p className="text-gray-600">Strict adherence to timelines and project milestones.</p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    <Headphones size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">Long-term Support</h3>
                  <p className="text-gray-600">Dedicated maintenance and support for peace of mind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let’s Build Your Product</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Have a custom requirement?
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-black px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
            title="Contact Us Today"
          >
            Contact us today for a free consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
