import { useEffect, useState } from 'react';
import {
  Code,
  Smartphone,
  Palette,
  Cloud,
  ShoppingCart,
  Database,
  Lock,
  Cpu,
  Globe,
  Layers,
  Settings,
  BarChart,
} from 'lucide-react';
import SEO from '../components/SEO';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Code size={28} />,
      title: 'Web Development',
      description: 'Custom web applications built with React, Vue, Angular, and modern frameworks.',
      features: ['Responsive Design', 'SEO Optimization', 'Progressive Web Apps', 'API Integration'],
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile solutions for iOS and Android.',
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment'],
    },
    {
      icon: <Palette size={28} />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that enhance user engagement and satisfaction.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    },
    {
      icon: <Cloud size={28} />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment on AWS, Azure, and Google Cloud.',
      features: ['Cloud Migration', 'DevOps', 'Serverless', 'Auto Scaling'],
    },
    {
      icon: <ShoppingCart size={28} />,
      title: 'E-Commerce Solutions',
      description: 'Complete e-commerce platforms with payment integration and inventory management.',
      features: ['Shopping Cart', 'Payment Gateway', 'Order Management', 'Analytics'],
    },
    {
      icon: <Database size={28} />,
      title: 'Database Design',
      description: 'Robust database architecture and optimization for high-performance applications.',
      features: ['SQL/NoSQL', 'Data Modeling', 'Performance Tuning', 'Data Migration'],
    },
    {
      icon: <Lock size={28} />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security solutions to protect your digital assets.',
      features: ['Security Audits', 'Penetration Testing', 'GDPR Compliance', 'Encryption'],
    },
    {
      icon: <Cpu size={28} />,
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
      features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Chatbots'],
    },
    {
      icon: <Globe size={28} />,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      features: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Email Campaigns'],
    },
    {
      icon: <Layers size={28} />,
      title: 'Enterprise Solutions',
      description: 'Custom enterprise software tailored to your business processes and needs.',
      features: ['ERP Systems', 'CRM Solutions', 'Workflow Automation', 'Integration'],
    },
    {
      icon: <Settings size={28} />,
      title: 'Maintenance & Support',
      description: '24/7 technical support and maintenance to keep your systems running smoothly.',
      features: ['Bug Fixes', 'Performance Monitoring', 'Updates', 'Technical Support'],
    },
    {
      icon: <BarChart size={28} />,
      title: 'Business Intelligence',
      description: 'Data-driven insights and analytics to inform your business decisions.',
      features: ['Data Visualization', 'Reporting', 'Predictive Analytics', 'KPI Dashboards'],
    },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="Our Services"
        description="Explore our comprehensive technology solutions including Web Development, Mobile Apps, UI/UX Design, Cloud Solutions, AI, and Digital Marketing."
        url="/services"
      />
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Comprehensive technology solutions designed to drive your business forward and deliver measurable results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
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
                <div
                  key={index}
                  className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`}></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                      {/* Clone element to override size prop if needed, though Lucide icons ideally adapt */}
                      {/* Since we can't easily cloneElement with new props in this specific text structure without changing data, 
                          we will rely on the SVG scaling or just accept the predefined size which might need adjustment in the data array if 48 is too big.
                          Actually, let's update the data array in a separate chunk to size 28 to match the design perfectly. */}
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Process</h2>
            <p className="text-gray-400 text-lg mb-16">
              A streamlined approach to delivering exceptional results
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
                { step: '02', title: 'Planning', description: 'Strategy and roadmap development' },
                { step: '03', title: 'Execution', description: 'Building and iterating solutions' },
                { step: '04', title: 'Delivery', description: 'Launch and ongoing support' },
              ].map((phase, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                  }}
                >
                  <div className="text-6xl font-bold text-gray-800 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-gray-400 text-sm">{phase.description}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-800"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with our technology solutions
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
          >
            Request a Consultation
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
