import ServicePage from '../../components/ServicePage';
import { TrendingUp, Users, Mail, Search, Share2, Target, BarChart } from 'lucide-react';

const DigitalMarketing = () => {
    return (
        <ServicePage
            seo={{
                title: "Digital Marketing Agency | SEO, PPC & Growth Strategies",
                description: "Grow your online presence with data-driven digital marketing. SEO, PPC, social media marketing, and content strategies that deliver ROI.",
                keywords: "digital marketing agency, seo services india, ppc management, social media marketing, content strategy, growth hacking, conversion rate optimization",
                url: "/services/digital-marketing",
                schema: {
                    name: "Digital Marketing",
                    description: "Comprehensive digital marketing and growth hacking services."
                }
            }}
            hero={{
                title: <>Drive Traffic & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Acquire Customers</span></>,
                description: "Building a great product isn't enough. We put your business in front of the right audience at the right time to generate high-quality leads.",
                primaryCta: "Start Growing",
                secondaryCta: "See Results"
            }}
            intro={{
                title: "Data-Driven Growth",
                description: "Stop guessing. We use advanced analytics to track every click and conversion, optimizing your campaigns for maximum Return on Ad Spend (ROAS)."
            }}
            features={[
                {
                    icon: <Search size={24} />,
                    title: "SEO Optimization",
                    description: "Rank higher on Google for high-intent keywords to drive consistent organic traffic."
                },
                {
                    icon: <Target size={24} />,
                    title: "PPC Advertising",
                    description: "Targeted Google and Facebook ad campaigns that generate immediate leads and sales."
                },
                {
                    icon: <Share2 size={24} />,
                    title: "Social Media Marketing",
                    description: "Build a community and brand loyalty across LinkedIn, Instagram, and Twitter."
                },
                {
                    icon: <Mail size={24} />,
                    title: "Email Marketing",
                    description: "Nurture leads and retain customers with personalized, automated email sequences."
                },
                {
                    icon: <BarChart size={24} />,
                    title: "Conversion Optimization",
                    description: "A/B test landing pages and flows to turn more visitors into paying customers."
                },
                {
                    icon: <TrendingUp size={24} />,
                    title: "Content Strategy",
                    description: "Create valuable content that establishes thought leadership and attracts inbound leads."
                }
            ]}
            techStack={{
                title: "Marketing Tech",
                description: "Tools needed to analyze, track, and optimize performance.",
                benefits: [
                    "Real-time Dashboards",
                    "Audience Segmentation",
                    "Automated Reporting"
                ],
                logos: [
                    { name: "Google Ads", icon: <Search /> },
                    { name: "Analytics", icon: <BarChart /> },
                    { name: "HubSpot", icon: <Users /> },
                    { name: "Semrush", icon: <TrendingUp /> },
                    { name: "Mailchimp", icon: <Mail /> },
                    { name: "Meta Ads", icon: <Share2 /> }
                ]
            }}
            cta={{
                title: "Boost Your Revenue",
                description: "Get a free marketing audit and a custom growth strategy for your business.",
                buttonText: "Get Marketing Audit"
            }}
        />
    );
};

export default DigitalMarketing;
