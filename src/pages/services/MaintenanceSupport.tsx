import ServicePage from '../../components/ServicePage';
import { Wrench, Clock, ShieldCheck, Activity, RotateCcw, Settings } from 'lucide-react';

const MaintenanceSupport = () => {
    return (
        <ServicePage
            seo={{
                title: "App Maintenance & Support Services | 24/7 SLA",
                description: "Keep your software running smoothly with Mobintix maintenance services. We offer bug fixes, performance monitoring, updates, and 24/7 technical support.",
                keywords: "app maintenance services, website support, software maintenance, bug fixing, legacy system support, server monitoring, sla support",
                url: "/services/maintenance-support",
                schema: {
                    name: "Maintenance & Support",
                    description: "Software maintenance, support, and optimization services."
                }
            }}
            hero={{
                title: <>Reliability & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Peace of Mind</span></>,
                description: "Software launch is just the beginning. We ensure your applications remain secure, updated, and bug-free tailored SLAs.",
                primaryCta: "Get Support Plan",
                secondaryCta: "View SLAs"
            }}
            intro={{
                title: "Proactive, Not Reactive",
                description: "Downtime costs money. Our dedicated support team monitors your systems 24/7 to catch issues before they impact your users."
            }}
            features={[
                {
                    icon: <Activity size={24} />,
                    title: "24/7 Monitoring",
                    description: "Real-time tracking of server health, uptime, and API latency."
                },
                {
                    icon: <Wrench size={24} />,
                    title: "Bug Fixes",
                    description: "Prioritized resolution of critical bugs and minor glitches to ensure stability."
                },
                {
                    icon: <RotateCcw size={24} />,
                    title: "Regular Updates",
                    description: "OS patches, library upgrades, and dependency management to prevent obsolescence."
                },
                {
                    icon: <ShieldCheck size={24} />,
                    title: "Security Patching",
                    description: "Immediate application of security patches to protect against new vulnerabilities."
                },
                {
                    icon: <Clock size={24} />,
                    title: "SLA Guarantees",
                    description: "Defined response times tailored to your business criticality (up to 1-hour response)."
                },
                {
                    icon: <Settings size={24} />,
                    title: "Performance Optimization",
                    description: "Continuous code refactoring and database tuning to maintain speed as data grows."
                }
            ]}
            techStack={{
                title: "Monitoring Tools",
                description: "We use enterprise-grade tools to keep an eye on your infrastructure.",
                benefits: [
                    "Instant Alerts",
                    "Root Cause Analysis",
                    "Uptime Reporting"
                ],
                logos: [
                    { name: "New Relic", icon: <Activity /> },
                    { name: "Datadog", icon: <BarChart /> },
                    { name: "Sentry", icon: <AlertTriangle /> },
                    { name: "PagerDuty", icon: <Clock /> },
                    { name: "JIRA", icon: <Wrench /> },
                    { name: "Slack", icon: <MessageSquare /> }
                ]
            }}
            cta={{
                title: "Ensure Business Continuity",
                description: "Don't let technical debt slow you down. Let us handle the maintenance while you focus on growth.",
                buttonText: "Get Maintenance Quote"
            }}
        />
    );
};
import { BarChart, AlertTriangle, MessageSquare } from 'lucide-react'; // Added imports

export default MaintenanceSupport;
