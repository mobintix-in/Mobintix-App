import ServicePage from '../../components/ServicePage';
import { Lock, ShieldCheck, FileKey, EyeOff, Server, AlertTriangle, Key, Shield } from 'lucide-react';

const Security = () => {
    return (
        <ServicePage
            seo={{
                title: "Cybersecurity & Compliance Services | GDPR & Penetration Testing",
                description: "Protect your business with Mobintix's security services. vulnerability assessments, penetration testing, and compliance (GDPR, HIPAA, SOC2) implementation.",
                keywords: "cybersecurity services, penetration testing, gdpr compliance, web application security, soc2 audit preparation, data protection, secure coding",
                url: "/services/security",
                schema: {
                    name: "Security Services",
                    description: "Cybersecurity auditing, penetration testing, and compliance consulting."
                }
            }}
            hero={{
                title: <>Secure Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Before Attacks Happen</span></>,
                description: "In a digital world, trust is built on security. We identify vulnerabilities and harden your infrastructure against modern threats.",
                primaryCta: "Get Security Audit",
                secondaryCta: "Compliance Info"
            }}
            intro={{
                title: "Proactive Defense Strategies",
                description: "Don't wait for a breach to think about security. Our proactive approach ensures your applications, data, and users are protected by design."
            }}
            features={[
                {
                    icon: <ShieldCheck size={24} />,
                    title: "Penetration Testing",
                    description: "Ethical hacking simulation to find weak spots in your web and mobile applications."
                },
                {
                    icon: <FileKey size={24} />,
                    title: "Compliance Readiness",
                    description: "Prepare for GDPR, HIPAA, and SOC2 audits with our gap analysis and remediation services."
                },
                {
                    icon: <EyeOff size={24} />,
                    title: "Data Privacy",
                    description: "Design systems that respect user privacy with end-to-end encryption and proper data handling."
                },
                {
                    icon: <AlertTriangle size={24} />,
                    title: "Vulnerability Scans",
                    description: "Automated and manual scanning of your infrastructure to detect known CVEs."
                },
                {
                    icon: <Key size={24} />,
                    title: "Identity Management",
                    description: "Implement secure authentication (OAuth, OIDC) and authorization flows."
                },
                {
                    icon: <Server size={24} />,
                    title: "Infrastructure Hardening",
                    description: "Secure your servers and cloud environments against unauthorized access."
                }
            ]}
            techStack={{
                title: "Security Toolset",
                description: "We use industry-standard tools for assessment and protection.",
                benefits: [
                    "OWASP Top 10 Mitigation",
                    "Zero Trust Architecture",
                    "Real-time Monitoring"
                ],
                logos: [
                    { name: "OWASP", icon: <Shield /> },
                    { name: "Burp Suite", icon: <Lock /> },
                    { name: "SonarQube", icon: <Key /> },
                    { name: "Cloudflare", icon: <Shield /> },
                    { name: "Auth0", icon: <Key /> },
                    { name: "Let's Encrypt", icon: <Lock /> }
                ]
            }}
            cta={{
                title: "Is Your App Secure?",
                description: "Schedule a comprehensive security assessment to identify and fix critical vulnerabilities.",
                buttonText: "Schedule Security Scan"
            }}
        />
    );
};

export default Security;
