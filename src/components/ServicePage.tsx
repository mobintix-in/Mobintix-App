import { useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import SEO from './SEO';

interface ServiceFeature {
    icon: ReactNode;
    title: string;
    description: string;
}

interface TechItem {
    name: string;
    icon: ReactNode;
}

interface ServicePageProps {
    seo: {
        title: string;
        description: string;
        keywords: string;
        url: string;
        schema: {
            name: string;
            description: string;
        };
    };
    hero: {
        title: ReactNode; // allow TSX for gradients
        description: string;
        primaryCta: string;
        secondaryCta: string;
    };
    intro: {
        title: string;
        description: string;
    };
    features: ServiceFeature[];
    techStack: {
        title: string;
        description: string;
        benefits: string[];
        logos: TechItem[];
    };
    cta: {
        title: string;
        description: string;
        buttonText: string;
    };
}

const ServicePage = ({ seo, hero, intro, features, techStack, cta }: ServicePageProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={seo.title}
                description={seo.description}
                keywords={seo.keywords}
                url={seo.url}
            >
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": seo.schema.name,
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Mobintix Infotech"
                        },
                        "description": seo.schema.description,
                        "areaServed": "Worldwide"
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
                    <div className="md:w-3/4 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            {hero.title}
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                            {hero.description}
                        </p>
                        <div className="flex gap-4">
                            <Link to="/contact" className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
                                {hero.primaryCta}
                            </Link>
                            <Link to="/projects" className="border border-white text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                                {hero.secondaryCta}
                            </Link>
                        </div>
                    </div>
                    {/* Optional visualization could go here */}
                </div>
            </section>

            {/* Intro/Expertise */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">{intro.title}</h2>
                        <p className="text-gray-600 text-lg">
                            {intro.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
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
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">{techStack.title}</h2>
                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                {techStack.description}
                            </p>
                            <ul className="space-y-3">
                                {techStack.benefits.map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <Check className="text-green-400 mr-3" size={20} /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 flex flex-wrap justify-center gap-6">
                            {techStack.logos.map((tech, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-center bg-gray-800 w-28 h-28 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors">
                                    <span className="text-blue-400 mb-2">{tech.icon}</span>
                                    <span className="font-medium text-sm text-center px-1">{tech.name}</span>
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
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{cta.title}</h2>
                            <p className="text-gray-300 mb-10 text-lg">
                                {cta.description}
                            </p>
                            <Link to="/contact" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-lg">
                                {cta.buttonText} <ArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicePage;
