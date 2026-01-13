import ServicePage from '../../components/ServicePage';
import { BarChart2, PieChart, TrendingUp, Table, Database, LineChart } from 'lucide-react';

const BusinessIntelligence = () => {
    return (
        <ServicePage
            seo={{
                title: "Business Intelligence & Analytics Services | Data Visualization",
                description: "Turn data into decisions with Mobintix BI services. Custom dashboards, data warehousing, and predictive reporting using PowerBI and Tableau.",
                keywords: "business intelligence services, data analytics company, powerbi developers, tableau consultants, data visualization, predictive modeling, kpi dashboards",
                url: "/services/business-intelligence",
                schema: {
                    name: "Business Intelligence Services",
                    description: "Data analytics, visualization, and business intelligence consulting."
                }
            }}
            hero={{
                title: <>Turn Data Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Decisions</span></>,
                description: "Stop drowning in spreadsheets. We build interactive dashboards that give you real-time visibility into your key performance indicators.",
                primaryCta: "Visualize My Data",
                secondaryCta: "See Examples"
            }}
            intro={{
                title: "From Raw Data to Strategy",
                description: "Your business generates massive amounts of data. We organize, clean, and visualize it so you can spot trends and make confident moves."
            }}
            features={[
                {
                    icon: <PieChart size={24} />,
                    title: "Interactive Dashboards",
                    description: "Drill-down capabilities allowing you to explore data by region, product, or timeframe."
                },
                {
                    icon: <Database size={24} />,
                    title: "Data Warehousing",
                    description: "Centralize data from CRM, ERP, and Marketing tools into a single source of truth."
                },
                {
                    icon: <TrendingUp size={24} />,
                    title: "Predictive Modeling",
                    description: "Use historical data to forecast future sales, inventory needs, and market shifts."
                },
                {
                    icon: <Table size={24} />,
                    title: "Automated Reporting",
                    description: "Schedule daily or weekly PDF/Excel reports sent directly to management inboxes."
                },
                {
                    icon: <BarChart2 size={24} />,
                    title: "KPI Tracking",
                    description: "Real-time monitoring of critical metrics like CAC, LTV, MRR, and churn."
                },
                {
                    icon: <LineChart size={24} />,
                    title: "Data Governance",
                    description: "Ensure data accuracy, consistency, and security across the organization."
                }
            ]}
            techStack={{
                title: "BI Platforms",
                description: "We work with the market-leading tools to deliver stunning visualizations.",
                benefits: [
                    "Real-time Data Sync",
                    "Mobile-Friendly Views",
                    "Custom Connectors"
                ],
                logos: [
                    { name: "PowerBI", icon: <BarChart2 /> },
                    { name: "Tableau", icon: <PieChart /> },
                    { name: "Looker", icon: <Search /> },
                    { name: "Snowflake", icon: <Database /> },
                    { name: "BigQuery", icon: <Database /> },
                    { name: "Python", icon: <Code /> }
                ]
            }}
            cta={{
                title: "Unlock Your Data's Potential",
                description: "Let us build the dashboard you've always wanted but didn't have the time to create.",
                buttonText: "Get BI Consultation"
            }}
        />
    );
};
import { Search, Code } from 'lucide-react'; // Added imports

export default BusinessIntelligence;
