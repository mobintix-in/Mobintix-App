import { useEffect, useState } from 'react';
import { Target, Eye, Award, Users, Zap, Heart, Star } from 'lucide-react';
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
    { role: 'Projects Delivered', count: '30+' },
    { role: 'Technologies Used', count: '10+' },
    { role: 'Industries Served', count: '5+' },
    { role: 'Countries Served', count: '3+' },
  ];

  const reviews = [
    {
      name: 'John D.',
      country: 'United States',
      rating: 5,
      review:
        'Mobintix Infotech delivered our project on time with excellent quality. Communication was smooth and the team was very professional.',
    },
    {
      name: 'Sarah M.',
      country: 'Australia',
      rating: 5,
      review:
        'Great experience working with Mobintix. Clean code, modern UI, and very responsive support.',
    },
    {
      name: 'David R.',
      country: 'Canada',
      rating: 5,
      review:
        'Highly recommend Mobintix Infotech for web and app development. They understood our requirements perfectly.',
    },
    {
      name: 'Emma L.',
      country: 'United Kingdom',
      rating: 5,
      review:
        'Professional, reliable, and skilled. They transformed our vision into a seamless digital experience.',
    },
    {
      name: 'Michael B.',
      country: 'Germany',
      rating: 5,
      review:
        'Impressive technical expertise and project management. The final product exceeded our expectations.',
    },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="About Mobintix Infotech | Web & Mobile App Development Company"
        description="Mobintix Infotech is an India-based web and mobile app development company delivering scalable digital solutions for startups and businesses worldwide."
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
              A trusted technology partner delivering scalable digital solutions.
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
                Founded with a mission to help businesses scale through technology, we empower clients across industries with solutions that are as elegant as they are effective.
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

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-sm mb-6">
              <span className="flex items-center gap-1 font-bold text-sm px-3">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
                <span className="text-gray-600 ml-1">Reviews</span>
              </span>
              <div className="flex border-l pl-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Trusted by Clients
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See why businesses across the globe choose Mobintix Infotech.
            </p>
          </div>

          <div
            className="flex overflow-x-auto gap-6 pb-10 -mx-4 px-4 md:mx-0 md:px-0 md:gap-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="hide-scrollbar flex-shrink-0 w-[85vw] md:w-[400px] snap-center group relative bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col"
              >
                <div className="absolute top-8 right-8 text-6xl text-gray-100 font-serif leading-none select-none">"</div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                    style={{ backgroundColor: index % 3 === 0 ? '#3b82f6' : index % 3 === 1 ? '#a855f7' : '#22c55e' }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black leading-tight">{review.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{review.country}</p>
                  </div>
                </div>

                <div className="flex mb-4 relative z-10">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed relative z-10">
                  {review.review}
                </p>

                <div className="mt-6 flex items-center text-xs text-gray-400 font-medium">
                  <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center mr-2">
                    <svg className="w-2 h-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  </div>
                  Verified Review
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full font-semibold text-black hover:bg-gray-50 transition shadow-sm hover:shadow"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Read more reviews on Google
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let’s Build Something Great Together
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you’re a startup or an established business, Mobintix Infotech is ready to turn your ideas into powerful digital products.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
          >
            Get a Free Consultation
          </a>
        </div>
      </section>
    </div >
  );
};

export default About;