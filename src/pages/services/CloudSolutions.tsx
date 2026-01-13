import ServicePage from '../../components/ServicePage';
import { Cloud, Server, Shield, Globe, Database, Cpu, BarChart } from 'lucide-react';

const CloudSolutions = () => {
    return (
        <ServicePage
            seo={{
                title: "Cloud Solutions & DevOps Services | AWS & Azure Experts",
                description: "Scale your business with Mobintix's cloud solutions. We specialize in AWS, Azure, cloud migration, serverless architecture, and DevOps automation.",
                keywords: "cloud solutions, aws services, azure consultants, cloud migration, devops agency, serverless architecture, scalable infrastructure",
                url: "/services/cloud-solutions",
                schema: {
                    name: "Cloud Solutions",
                    description: "Enterprise cloud infrastructure, migration, and DevOps services."
                }
            }}
            hero={{
                title: <>Scale Infinitely with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Cloud Architecture</span></>,
                description: "Modernize your infrastructure. We help businesses migrate, optimize, and manage scalable cloud environments on AWS and Azure.",
                primaryCta: "Cloud Consultation",
                secondaryCta: "Case Studies"
            }}
            intro={{
                title: "Future-Proof Infrastructure",
                description: "Move away from legacy servers. Embrace the power, flexibility, and cost-efficiency of the cloud with our expert guidance."
            }}
            features={[
                {
                    icon: <Cloud size={24} />,
                    title: "Cloud Migration",
                    description: "Seamlessly move your existing applications and data to the cloud with zero downtime strategies."
                },
                {
                    icon: <Server size={24} />,
                    title: "DevOps & CI/CD",
                    description: "Automate your deployment pipelines for faster, more reliable software delivery cycles."
                },
                {
                    icon: <Shield size={24} />,
                    title: "Cloud Security",
                    description: "Implement robust IAM policies, firewalls, and encryption to secure your cloud assets."
                },
                {
                    icon: <Cpu size={24} />,
                    title: "Serverless Architecture",
                    description: "Build functions-as-a-service (Lambda/Functions) to reduce operational costs and management overhead."
                },
                {
                    icon: <BarChart size={24} />,
                    title: "Cost Optimization",
                    description: "Audit and optimize resource usage to significantly reduce your monthly cloud bill."
                },
                {
                    icon: <Database size={24} />,
                    title: "Managed Services",
                    description: "24/7 monitoring and management of your cloud environment to ensure high availability."
                }
            ]}
            techStack={{
                title: "Cloud Experts",
                description: "We work with top-tier cloud providers and tools to deliver enterprise-grade reliability.",
                benefits: [
                    "99.99% Uptime SLA",
                    "Global CDN Distribution",
                    "Automated Scaling"
                ],
                logos: [
                    { name: "AWS", icon: <Cloud /> },
                    { name: "Azure", icon: <Cloud /> },
                    { name: "Google Cloud", icon: <Cloud /> },
                    { name: "Docker", icon: <Server /> },
                    { name: "Kubernetes", icon: <Globe /> },
                    { name: "Terraform", icon: <Database /> }
                ]
            }}
            cta={{
                title: "Move to the Cloud Today",
                description: "Schedule a free architecture review to see how the cloud can accelerate your business.",
                buttonText: "Book Architecture Review"
            }}
        />
    );
};

export default CloudSolutions;
