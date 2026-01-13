import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Check, Code, Globe, Layers, ArrowRight, Tablet, Cloud, Database } from 'lucide-react';
import SEO from '../../components/SEO';

const MobileAppDevelopment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            icon: <Code size={24} />,
            title: 'Cross-Platform development',
            description: 'Write once, run everywhere. We use Flutter and React Native to build apps that work flawlessly on iOS and Android.'
        },
        {
            icon: <Smartphone size={24} />,
            title: 'Native iOS & Android',
            description: 'For maximum performance, we build native applications using Swift (iOS) and Kotlin (Android) tailored to each platform.'
        },
        {
            icon: <Layers size={24} />,
            title: 'Intuitive UI/UX Design',
            description: 'User-centric design that ensures your app is easy to navigate, beautiful to look at, and engaging to use.'
        },
        {
            icon: <Cloud size={24} />,
            title: 'Cloud & API Integration',
            description: 'Seamlessly connect your mobile app to backend servers, third-party APIs, and cloud databases.'
        },
        {
            icon: <Database size={24} />,
            title: 'Offline Capabilities',
            description: 'Apps that work even without internet. We implement smart caching and local databases for uninterrupted usage.'
        },
        {
            icon: <Tablet size={24} />,
            title: 'Tablet & iPad Optimization',
            description: 'Custom layouts optimized for larger screens to provide a great experience on tablets and iPads.'
        }
    ];

    const techStack = [
        { name: 'Flutter', icon: <Smartphone /> },
        { name: 'React Native', icon: <Code /> },
        { name: 'Swift', icon: <Smartphone /> },
        { name: 'Kotlin', icon: <Smartphone /> },
        { name: 'Firebase', icon: <Database /> },
        { name: 'Node.js', icon: <Globe /> }
    ];

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Mobile App Development | Flutter & React Native Experts - Mobintix"
                description="Mobintix builds high-performance mobile apps for iOS and Android using Flutter and React Native. Turn your idea into a feature-rich mobile application."
                keywords="mobile app development, flutter development company, react native developers, ios app development, android app development, cross-platform apps"
                url="/services/mobile-apps"
            >
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Mobile App Development",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Mobintix Infotech"
                        },
                        "description": "Custom mobile application development for iOS and Android using Flutter and React Native.",
                        "areaServed": "Worldwide",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Mobile App Services",
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flutter App Development" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "React Native App Development" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Native iOS/Android Apps" } }
                            ]
                        }
                    })}
                </script>
            </SEO>

            {/* Hero Section */}
            <section className="bg-black text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}></div>

                <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Mobile Apps that Users <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Love to Use</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                            From startups to enterprises, we engineer engaging, high-performance mobile experiences for iOS and Android.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/contact" className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
                                Build My App
                            </Link>
                            <Link to="/projects" className="border border-white text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 blur-2xl animate-pulse"></div>
                            <Smartphone size={200} className="text-white relative z-10" strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro/Expertise */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Mobile-First Excellence</h2>
                        <p className="text-gray-600 text-lg">
                            We don't just port websites to mobile. We build native-feeling experiences that leverage the full power of the device.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 mb-6">
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
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built with Leading Frameworks</h2>
                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                We specialize in cross-platform technologies like Flutter and React Native to reduce development time and cost without compromising quality.
                            </p>
                            <ul className="space-y-3">
                                {['Single Codebase for iOS & Android', 'Native Performance', 'Faster Time to Market'].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <Check className="text-green-400 mr-3" size={20} /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 flex flex-wrap justify-center gap-6">
                            {techStack.map((tech, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-center bg-gray-800 w-28 h-28 rounded-2xl border border-gray-700 hover:border-green-500 transition-colors">
                                    <span className="text-green-400 mb-2">{tech.icon}</span>
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
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Got a Mobile App Idea?</h2>
                            <p className="text-gray-300 mb-10 text-lg">
                                Let's discuss how we can bring your app to life and get it on the App Store and Play Store.
                            </p>
                            <Link to="/contact" className="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-green-600 transition-colors shadow-lg">
                                Launch Your App <ArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MobileAppDevelopment;
