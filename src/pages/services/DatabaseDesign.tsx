import ServicePage from '../../components/ServicePage';
import { Database, TrendingUp, HardDrive, Share2, Shield, Search, Server, Settings } from 'lucide-react';

const DatabaseDesign = () => {
    return (
        <ServicePage
            seo={{
                title: "Database Design & Optimization Services | SQL & NoSQL",
                description: "Expert database architecture and management services. We design scalable SQL and NoSQL databases optimized for speed and data integrity.",
                keywords: "database design services, sql optimization, nosql architecture, database migration, postgresql experts, mongodb consulting, data warehouses",
                url: "/services/database-design",
                schema: {
                    name: "Database Design",
                    description: "Database architecture design, optimization, and migration services."
                }
            }}
            hero={{
                title: <>Power Your Data with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Smart Architecture</span></>,
                description: "Data is your most valuable asset. We design robust, scalable, and secure database schemas that ensure fast retrieval and data integrity.",
                primaryCta: "Optimize My DB",
                secondaryCta: "Learn More"
            }}
            intro={{
                title: "The Foundation of Performance",
                description: "A poorly designed database bottlenecks your entire application. We build normalized, indexed, and sharded architectures ready for millions of records."
            }}
            features={[
                {
                    icon: <Database size={24} />,
                    title: "Schema Design",
                    description: "Logical and physical modeling ensuring strict data integrity and efficient storage."
                },
                {
                    icon: <TrendingUp size={24} />,
                    title: "Performance Tuning",
                    description: "Query optimization, indexing strategies, and caching implementation for sub-millisecond responses."
                },
                {
                    icon: <Share2 size={24} />,
                    title: "Data Migration",
                    description: "Zero-data-loss migration strategies when moving between providers or upgrading versions."
                },
                {
                    icon: <HardDrive size={24} />,
                    title: "Backup & Recovery",
                    description: "Automated backup pipelines and disaster recovery planning to prevent data loss."
                },
                {
                    icon: <Search size={24} />,
                    title: "Data Warehousing",
                    description: "ETL processes and OLAP structures for complex reporting and analytics."
                },
                {
                    icon: <Shield size={24} />,
                    title: "Database Security",
                    description: "Encryption at rest, transit security, and audit logging to meet compliance standards."
                }
            ]}
            techStack={{
                title: "Database Technologies",
                description: "We are proficient in both relational and non-relational database systems.",
                benefits: [
                    "ACID Compliance",
                    "Horizontal Scaling",
                    "High Availability"
                ],
                logos: [
                    { name: "PostgreSQL", icon: <Database /> },
                    { name: "MySQL", icon: <Database /> },
                    { name: "MongoDB", icon: <Server /> },
                    { name: "Redis", icon: <Settings /> },
                    { name: "Supabase", icon: <Database /> },
                    { name: "Firebase", icon: <Database /> }
                ]
            }}
            cta={{
                title: "Fix Your Database Performance",
                description: "Experiencing slow queries? Let our experts audit and optimize your database architecture.",
                buttonText: "Request Database Audit"
            }}
        />
    );
};

export default DatabaseDesign;
