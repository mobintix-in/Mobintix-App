import { useEffect, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = ['All', 'Web', 'Mobile', 'Design', 'E-Commerce'];

  const projects = [
    {
      title: 'E-Commerce Website',
      category: 'Web',
      description: 'A comprehensive financial analytics platform with real-time data visualization',
      image: 'https://lh3.googleusercontent.com/p/AF1QipMrkIkUSNWST_0pZSzOSl8_bMQhG3OWtb3Ogclh=h305-no',
      tags: ['Wordpress', 'PHP', 'woocommerce'],
      link: 'https://kgmediastudio.com/',
    },
    {
      title: 'FinTech Dashboard',
      category: 'Web',
      description: 'A comprehensive financial analytics platform with real-time data visualization',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'TypeScript', 'D3.js'],
      link: 'https://linktr.ee/mobintix',
    },
    {
      title: 'E-Commerce Mobile App',
      category: 'Mobile',
      description: 'Cross-platform shopping app with seamless checkout experience',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React Native', 'Redux', 'Stripe'],
      link: 'https://linktr.ee/mobintix',
    },
    {
      title: 'Healthcare Portal',
      category: 'Web',
      description: 'Patient management system with appointment scheduling and telemedicine',
      image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Vue.js', 'Node.js', 'MongoDB'],
      link: 'https://linktr.ee/mobintix',
    },
    {
      title: 'Brand Identity System',
      category: 'Design',
      description: 'Complete brand identity and design system for a tech startup',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Figma', 'UI/UX', 'Brand Design'],
      link: 'https://linktr.ee/mobintix',
    },
    {
      title: 'Fitness Tracking App',
      category: 'Mobile',
      description: 'iOS and Android app for tracking workouts and nutrition',
      image: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Flutter', 'Firebase', 'HealthKit'],
      link: 'https://linktr.ee/mobintix',
    },
    {
      title: 'Luxury Fashion Store',
      category: 'E-Commerce',
      description: 'High-end e-commerce platform with AR try-on features',
      image: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Next.js', 'Shopify', 'AR'],
      link: 'https://linktr.ee/mobintix',
    },
    {
      title: 'SaaS Analytics Platform',
      category: 'Web',
      description: 'Business intelligence platform for enterprise clients',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Angular', 'Python', 'PostgreSQL'],
      link: 'https://linktr.ee/mobintix',
    },
    {
      title: 'Restaurant Booking System',
      category: 'Web',
      description: 'Online reservation platform with table management',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Express', 'MySQL'],
      link: 'https://linktr.ee/mobintix',
    },
    {
      title: 'Travel Planning App',
      category: 'Mobile',
      description: 'AI-powered travel itinerary planner with booking integration',
      image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Swift', 'Kotlin', 'AI/ML'],
      link: 'https://linktr.ee/mobintix',
    },
  ];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="bg-white">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our portfolio of successful projects across various industries and technologies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 font-semibold uppercase tracking-wider transition-all duration-300 ${filter === category
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-black cursor-pointer block"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/20 text-white px-3 py-1 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-white text-sm font-semibold">
                    <span>View Project</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-5xl font-bold mb-2">150+</h3>
                <p className="text-gray-400 uppercase text-sm tracking-wider">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold mb-2">98%</h3>
                <p className="text-gray-400 uppercase text-sm tracking-wider">Client Satisfaction</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold mb-2">25+</h3>
                <p className="text-gray-400 uppercase text-sm tracking-wider">Industries Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Let's work together to bring your vision to life with cutting-edge technology and creative solutions
          </p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 group"
          >
            <span>Start Your Project</span>
            <ExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Projects;
