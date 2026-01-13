import ServicePage from '../../components/ServicePage';
import { Building2, Workflow, Link, PieChart, Users, Lock, Server, BarChart } from 'lucide-react';

const EnterpriseSolutions = () => {
    return (
        <ServicePage
            seo={{
                title: "Enterprise Software Development | Custom ERP & CRM Solutions",
                description: "Custom enterprise software that streamlines complex business processes. Mobintix builds scalable ERP, CRM, and automation tools for large organizations.",
                keywords: "enterprise software development, custom erp development, crm solutions, business process automation, enterprise application modernization, b2b software",
                url: "/services/enterprise-solutions",
                schema: {
                    name: "Enterprise Solutions",
                    description: "Custom software development for enterprise resource planning (ERP) and customer relationship management (CRM)."
                }
            }}
            hero={{
                title: <>Transform Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Efficiency</span></>,
                description: "Streamline operations with custom software built for your specific workflows. Scalable, secure, and integrated enterprise solutions.",
                primaryCta: "Discuss Requirements",
                secondaryCta: "Our Approach"
            }}
            intro={{
                title: "Built for Scale & Complexity",
                description: "Off-the-shelf software rarely fits large organizations perfectly. We engineer custom solutions that adapt to your business, not the other way around."
            }}
            features={[
                {
                    icon: <Workflow size={24} />,
                    title: "Custom ERP Systems",
                    description: "Centralize your data and operations across finance, HR, supply chain, and manufacturing."
                },
                {
                    icon: <Users size={24} />,
                    title: "CRM Solutions",
                    description: "Tailored customer relationship platforms to boost sales productivity and retention."
                },
                {
                    icon: <Link size={24} />,
                    title: "Legacy Integration",
                    description: "Bridge modern applications with existing legacy systems to maximize ROI."
                },
                {
                    icon: <PieChart size={24} />,
                    title: "Business Intelligence",
                    description: "Custom dashboards and reporting tools for real-time actionable insights."
                },
                {
                    icon: <Lock size={24} />,
                    title: "Enterprise Security",
                    description: "Role-based access control (RBAC), SSO, and audit logs for strict compliance."
                },
                {
                    icon: <Server size={24} />,
                    title: "Process Automation",
                    description: "Identify and automate repetitive manual tasks to increase operational efficiency."
                }
            ]}
            techStack={{
                title: "Enterprise Stack",
                description: "Robust, enterprise-grade technologies selected for stability and long-term maintainability.",
                benefits: [
                    "SOC2 Compliance Ready",
                    "High Availability",
                    "Microservices Architecture"
                ],
                logos: [
                    { name: "Java", icon: <Building2 /> },
                    { name: ".NET", icon: <Server /> },
                    { name: "Oracle", icon: <Database /> },
                    { name: "Salesforce", icon: <Users /> },
                    { name: "SAP", icon: <BarChart /> },
                    { name: "Python", icon: <PieChart /> }
                ]
            }}
            cta={{
                title: "Modernize Your Enterprise",
                description: "Book a consultation with our enterprise architects to map out your digital transformation.",
                buttonText: "Contact Enterprise Team"
            }}
        />
    );
};
import { Database } from 'lucide-react'; // Added import

export default EnterpriseSolutions;
