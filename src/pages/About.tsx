import { useEffect, useState } from 'react';
import { Target, Eye, Award, Users, Zap, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: <Zap size={32} />,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative solutions to stay ahead of the curve.',
    },
    {
      icon: <Award size={32} />,
      title: 'Excellence',
      description: 'We deliver nothing but the highest quality in every project we undertake.',
    },
    {
      icon: <Users size={32} />,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners to achieve shared success.',
    },
    {
      icon: <Heart size={32} />,
      title: 'Passion',
      description: 'We are passionate about technology and driven by the desire to make a difference.',
    },
  ];

  const team = [
    { role: 'Leadership', count: '5+' },
    { role: 'Developers', count: '15+' },
    { role: 'Designers', count: '5+' },
    { role: 'Support', count: '3+' },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="About Us"
        description="Learn about Mobintix Infotech, a leading technology company delivering innovative digital solutions. Discover our story, mission, and values."
        url="/about"
      />
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Mobintix</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              A leading technology company dedicated to delivering innovative digital solutions that empower businesses to thrive in the modern world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className="space-y-6"
              style={{ animation: 'fadeInLeft 0.8s ease-out both' }}
            >
              <h2 className="text-4xl font-bold text-black">Our Story</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Founded with a vision to bridge the gap between technology and business, Mobintix Infotech has grown into a trusted partner for companies seeking digital transformation.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our journey began with a simple belief: technology should empower, not complicate. Today, we serve clients across industries, delivering solutions that are as elegant as they are effective.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                With a team of passionate innovators, we continue to push boundaries and redefine what's possible in the digital realm.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-4"
              style={{ animation: 'fadeInRight 0.8s ease-out both' }}
            >
              {team.map((item, index) => (
                <div
                  key={index}
                  className="bg-black text-white p-8 text-center hover:bg-gray-900 transition-colors duration-300 rounded-2xl"
                >
                  <h3 className="text-4xl font-bold mb-2">{item.count}</h3>
                  <p className="text-gray-400 uppercase text-sm tracking-wider">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="bg-black text-white p-4 group-hover:scale-110 transition-transform duration-300 rounded-2xl">
                  <Target size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To deliver cutting-edge technology solutions that drive business growth, enhance user experiences, and create lasting value for our clients and their customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-black text-white p-4 group-hover:scale-110 transition-transform duration-300 rounded-2xl">
                  <Eye size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the world's most trusted technology partner, known for innovation, excellence, and our commitment to transforming businesses through digital solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black p-12 text-white rounded-3xl">
              <h3 className="text-3xl font-bold mb-8">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  'Proven track record of successful projects',
                  'Expert team with diverse skill sets',
                  'Agile methodology for faster delivery',
                  'Client-centric approach',
                  '24/7 support and maintenance',
                  'Competitive pricing',
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white"></div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="inline-block bg-black text-white p-6 mb-4 group-hover:scale-110 transition-transform duration-300 rounded-2xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
