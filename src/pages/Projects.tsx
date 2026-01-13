import { useEffect, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchProjects();
  }, []);

  const fallbackProjects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'E-Commerce',
      description: 'A full-featured online store with payment integration, inventory management, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1470',
      tags: ['Next.js', 'Stripe', 'Tailwind CSS'],
      link: '#'
    },
    {
      id: 2,
      title: 'Healthcare App',
      category: 'Mobile',
      description: 'Patient management system with appointment scheduling and telemedicine features.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1470',
      tags: ['Flutter', 'Firebase', 'WebRTC'],
      link: '#'
    },
    {
      id: 3,
      title: 'Real Estate Portal',
      category: 'Web',
      description: 'Property listing platform with advanced search, virtual tours, and agent portal.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1373',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      id: 4,
      title: 'FinTech Dashboard',
      category: 'Design',
      description: 'Modern financial analytics dashboard with real-time data visualization.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1470',
      tags: ['UI/UX', 'Figma', 'React'],
      link: '#'
    },
    {
      id: 5,
      title: 'Social Media App',
      category: 'Mobile',
      description: 'Community platform connecting users with similar interests.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1374',
      tags: ['React Native', 'GraphQL', 'AWS'],
      link: '#'
    },
    {
      id: 6,
      title: 'Corporate Website',
      category: 'Web',
      description: 'Professional corporate identity website for a multinational firm.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1470',
      tags: ['Gatsby', 'Sanity', 'Animation'],
      link: '#'
    }
  ];

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        // If error (e.g. missing credentials), fall back to static data
        console.warn('Supabase fetch failed, using fallback data:', error);
        setProjects(fallbackProjects);
      } else if (data && data.length > 0) {
        setProjects(data);
      } else {
        // If no data, use fallback
        setProjects(fallbackProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Web', 'Mobile', 'Design', 'E-Commerce'];

  // Calculate filtered projects based on state
  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="bg-white">
      <SEO
        title="Our Portfolio"
        description="Explore Mobintix Infotech's portfolio of successful projects across Web, Mobile, Design, and E-commerce industries."
        url="/projects"
      />
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
                className={`px-6 py-2 font-semibold uppercase tracking-wider transition-all duration-300 rounded-full ${filter === category
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-black cursor-pointer block rounded-3xl"
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
                          className="text-xs bg-white/20 text-white px-3 py-1 backdrop-blur-sm rounded-full"
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
          )}
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
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl"
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
