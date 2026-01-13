import ServicePage from '../../components/ServicePage';
import { Palette, PenTool, Layout, Layers, UserCheck, Figma, Eye, MousePointer, Smartphone, Zap } from 'lucide-react';

const UiUxDesign = () => {
    return (
        <ServicePage
            seo={{
                title: "UI/UX Design Agency | Mobile App & Web Design Services",
                description: "Mobintix Infotech creates intuitive, engaging UI/UX designs. We transform complex ideas into beautiful, user-friendly digital experiences using Figma and Adobe XD.",
                keywords: "ui ux design agency, mobile app experience design, web design company, figma experts, user interface design, user experience optimization",
                url: "/services/ui-ux-design",
                schema: {
                    name: "UI/UX Design Services",
                    description: "User-centric UI/UX design services for web and mobile applications."
                }
            }}
            hero={{
                title: <>Design that <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Engages & Converts</span></>,
                description: "We don't just design screens; we craft user journeys that drive retention and growth. Beautiful, intuitive, and built for humans.",
                primaryCta: "Start Designing",
                secondaryCta: "View Portfolio"
            }}
            intro={{
                title: "User-Centric Design Philosophy",
                description: "A great product starts with understanding the user. Our design process ensures your application is not only visually stunning but also logical and easy to navigate."
            }}
            features={[
                {
                    icon: <UserCheck size={24} />,
                    title: "User Research & Personas",
                    description: "Deep dive into your target audience to understand their needs, pain points, and behaviors."
                },
                {
                    icon: <Layout size={24} />,
                    title: "Wireframing & Prototyping",
                    description: "Rapidly visualize ideas and test flows before writing a single line of code with interactive prototypes."
                },
                {
                    icon: <Palette size={24} />,
                    title: "Visual Design System",
                    description: "Create consistent, scalable design systems (Typography, Color, Components) for brand uniformity."
                },
                {
                    icon: <Smartphone size={24} />,
                    title: "Mobile-First Design",
                    description: "Optimized interfaces for touch targets, gestures, and smaller screens to ensure mobile engagement."
                },
                {
                    icon: <Eye size={24} />,
                    title: "Usability Testing",
                    description: "Validate design decisions with real users to identify friction points and optimize the experience."
                },
                {
                    icon: <MousePointer size={24} />,
                    title: "Interaction Design",
                    description: "Add life to your app with subtle animations and micro-interactions that delight users."
                }
            ]}
            techStack={{
                title: "Our Design Toolkit",
                description: "We use industry-standard tools to collaborate seamlessly with developers and stakeholders.",
                benefits: [
                    "Pixel-Perfect Handoffs",
                    "Design Token Integration",
                    "Component-Based Workflows"
                ],
                logos: [
                    { name: "Figma", icon: <Figma /> },
                    { name: "Adobe XD", icon: <PenTool /> },
                    { name: "Sketch", icon: <Layers /> },
                    { name: "Photoshop", icon: <Eye /> },
                    { name: "Illustrator", icon: <PenTool /> },
                    { name: "Zeplin", icon: <Zap /> }
                ]
            }}
            cta={{
                title: "Ready to Redesign Your Product?",
                description: "Let's turn your complex requirements into a simple, elegant user interface.",
                buttonText: "Get a Design Quote"
            }}
        />
    );
};

export default UiUxDesign;
