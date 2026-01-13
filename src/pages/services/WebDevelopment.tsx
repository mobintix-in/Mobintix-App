import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Code, Globe, Layout, Smartphone, Zap, ArrowRight, Database, Server, Shield, Cloud } from 'lucide-react';
import SEO from '../../components/SEO';

const WebDevelopment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            icon: <Layout size={24} />,
            title: 'Custom Web Applications',
            description: 'Tailored solutions built from scratch using React, Next.js, and modern frameworks to meet your specific business needs.'
        },
        {
            icon: <Smartphone size={24} />,
            title: 'Responsive & Mobile-First',
            description: 'Flawless experiences across all devices. We ensure your site looks and performs perfectly on phones, tablets, and desktops.'
        },
        {
            icon: <Zap size={24} />,
            title: 'High Performance & Speed',
            description: 'Optimized for Core Web Vitals. We build lightning-fast websites that rank better and convert more visitors.'
        },
        {
            icon: <Globe size={24} />,
            title: 'SaaS & Cloud Platforms',
            description: 'Scalable Software-as-a-Service platforms designed to handle thousands of users with robust cloud infrastructure.'
        },
        {
            icon: <Database size={24} />,
            title: 'API Integration',
            description: 'Seamless integration with third-party tools, payment gateways, CRMs, and complex backend systems.'
        },
        {
            icon: <Shield size={24} />,
            title: 'Secure & Compliant',
            description: 'Enterprise-grade security standards (SSL, encryption) to protect your data and build user trust.'
        }
    ];

    const techStack = [
        { name: 'React', icon: <Code /> },
        { name: 'Next.js', icon: <Globe /> },
        { name: 'TypeScript', icon: <Code /> },
        { name: 'Node.js', icon: <Server /> },
        { name: 'PostgreSQL', icon: <Database /> },
        { name: 'AWS', icon: <Cloud /> }
    ];

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Web Development Company India | Custom React & Next.js Solutions - Mobintix"
                description="Mobintix Infotech is a top web development company in India. We build scalable, high-performance websites and web apps using React, Next.js, and Node.js."
                keywords="web development company india, custom web apps, React developers india, Next.js agency, frontend development, backend development"
                url="/services/web-development"
            >
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Web Development",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Mobintix Infotech"
                        },
                        "description": "Custom web application development using modern technologies like React and Node.js.",
                        "areaServed": "Worldwide",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Web Development Services",
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Apps" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Solutions" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS Platform Development" } }
                            ]
                        }
                    })}
                </script>
            </SEO>

            {/* Hero Section */}
            <section className="bg-black text-white py-20 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}></div>

                <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Custom Web Development that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Drives Growth</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                            We don't just write code. We build scalable, high-speed digital products that solving real business problems.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/contact" className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
                                Start Project
                            </Link>
                            <Link to="/projects" className="border border-white text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                                Our Work
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30 blur-2xl animate-pulse"></div>
                            <Code size={200} className="text-white relative z-10" strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro/Expertise */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Why Choose Us for Web Dev?</h2>
                        <p className="text-gray-600 text-lg">
                            In a digital-first world, your website is your headquarters. We ensure it's built on a solid foundation that can scale with your ambition.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Modern Tech Stack</h2>
                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                We use the latest technologies to ensure your application is fast, secure, and future-proof. No legacy code, no bloat.
                            </p>
                            <ul className="space-y-3">
                                {['Single Page Applications (SPA)', 'Server-Side Rendering (SSR)', 'Progressive Web Apps (PWA)'].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <Check className="text-green-400 mr-3" size={20} /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 flex flex-wrap justify-center gap-6">
                            {techStack.map((tech, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-center bg-gray-800 w-28 h-28 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors">
                                    <span className="text-blue-400 mb-2">{tech.icon}</span>
                                    <span className="font-medium">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="bg-gradient-to-r from-black to-gray-900 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Build Your Platform?</h2>
                            <p className="text-gray-300 mb-10 text-lg">
                                From concept to launch, we are your technical partner. Let's turn your vision into reality.
                            </p>
                            <Link to="/contact" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-lg">
                                Get a Quote <ArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebDevelopment;
