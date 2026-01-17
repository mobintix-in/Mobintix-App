import ServicePage from '../../components/ServicePage';
import { Users, Briefcase, TrendingUp, Lightbulb, Target, CheckCircle, BarChart } from 'lucide-react';

const Consulting = () => {
    return (
        <ServicePage
            seo={{
                title: "IT Consulting & Digital Strategy Services | Mobintix",
                description: "Strategic IT consulting to align technology with your business goals. We provide digital transformation, tech roadmap planning, and process optimization.",
                keywords: "it consulting, digital strategy, technology roadmap, business process optimization, digital transformation, tech audit",
                url: "/services/consulting",
                schema: {
                    name: "Consulting Services",
                    description: "Strategic technology consulting and digital transformation services."
                }
            }}
            hero={{
                title: <>Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Technology Consulting</span></>,
                description: "Navigate the complex digital landscape with confidence. We help you make informed technology decisions that drive growth and efficiency.",
                primaryCta: "Get a Strategy Session",
                secondaryCta: "Success Stories"
            }}
            intro={{
                title: "Align Tech with Business",
                description: "Technology should be an enabler, not a bottleneck. Our consulting services ensure your tech stack supports your long-term business objectives."
            }}
            features={[
                {
                    icon: <Briefcase size={24} />,
                    title: "Digital Strategy",
                    description: "Develop a comprehensive roadmap for digital transformation tailored to your industry."
                },
                {
                    icon: <Target size={24} />,
                    title: "Technology Roadmap",
                    description: "Plan your technology investments and upgrades with a clear, phased approach."
                },
                {
                    icon: <TrendingUp size={24} />,
                    title: "Process Optimization",
                    description: "Analyze and streamline your business workflows using the latest automation tools."
                },
                {
                    icon: <Lightbulb size={24} />,
                    title: "Innovation Workshops",
                    description: "Brainstorm and validate new product ideas or features with our expert facilitators."
                },
                {
                    icon: <Users size={24} />,
                    title: "Team Augmentation",
                    description: "Assess your team's skills and fill gaps with expert temporary or permanent talent."
                },
                {
                    icon: <CheckCircle size={24} />,
                    title: "Tech Audits",
                    description: "Review your current infrastructure and codebases to identify risks and opportunities."
                }
            ]}
            techStack={{
                title: "Strategic Expertise",
                description: "We bring a wealth of experience across various industries and technologies.",
                benefits: [
                    "ROI-Focused Approach",
                    "Vendor Agnostic Advice",
                    "Scalable Solutions"
                ],
                logos: [
                    { name: "Agile", icon: <Briefcase /> },
                    { name: "Scrum", icon: <Users /> },
                    { name: "Lean", icon: <TrendingUp /> },
                    { name: "Jira", icon: <Target /> },
                    { name: "Analytics", icon: <BarChart /> }
                ]
            }}
            cta={{
                title: "Transform Your Business",
                description: "Let's discuss your challenges and how our consulting services can help.",
                buttonText: "Schedule Consultation"
            }}
        />
    );
};

export default Consulting;
