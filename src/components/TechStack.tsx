import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaJava, FaAws, FaDocker, FaJenkins, FaGoogle, FaLinux, FaGitAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import {
    SiAndroid, SiApple, SiSwift, SiIonic, SiFlutter, SiReact, SiKotlin,
    SiHtml5, SiCss3, SiJavascript, SiTypescript, SiVuedotjs, SiAngular,
    SiNodedotjs, SiPython, SiGo, SiPhp,
    SiLaravel, SiDjango, SiSpring, SiExpress,
    SiWordpress, SiDrupal, SiJoomla, SiWix,
    SiMysql, SiPostgresql, SiMongodb, SiFirebase, SiRedis,
    SiSqlite, SiMariadb, SiOracle, SiApachecassandra, SiElasticsearch, SiAmazondynamodb, SiSupabase, SiNeo4J, SiCouchbase,
    SiKubernetes, SiTerraform, SiAnsible,
    SiShopify, SiMagento, SiWoocommerce, SiBigcommerce,
    SiTensorflow, SiPytorch, SiOpencv, SiPandas, SiNumpy, SiScikitlearn, SiKeras, SiHuggingface, SiOpenai, SiJupyter, SiApachespark, SiDatabricks,
    SiFigma, SiAdobexd, SiSketch, SiCanva, SiAdobephotoshop, SiAdobeillustrator, SiInvision,
    SiDotnet, SiRubyonrails, SiRust, SiElixir, SiScala, SiGraphql,
    SiNextdotjs, SiTailwindcss, SiBootstrap, SiMui, SiRedux, SiWebpack, SiVite, SiGatsby, SiThreedotjs, SiSvelte,
    SiNestjs, SiFastapi, SiFlask, SiSymfony, SiExpo, SiStrapi, SiContentful, SiPrestashop,
    SiRabbitmq, SiApachekafka, SiNginx, SiApache
} from 'react-icons/si';

const categories = [
    { id: 'mobile', label: 'Mobile App' },
    { id: 'frontend', label: 'Front End' },
    { id: 'backend', label: 'Backend' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'ai_ml', label: 'AI & ML' },
    { id: 'cms', label: 'CMS' },
    { id: 'database', label: 'Database' },
    { id: 'devops', label: 'DevOps' },
    { id: 'design', label: 'Design' },
    { id: 'ecommerce', label: 'Ecommerce' },
];

interface Technology {
    name: string;
    icon: IconType;
    color: string;
}

interface TechnologyDictionary {
    [key: string]: Technology[];
}

const technologies: TechnologyDictionary = {
    mobile: [
        { name: 'Android', icon: SiAndroid, color: '#3DDC84' },
        { name: 'iOS', icon: SiApple, color: '#A2AAAD' },
        { name: 'Swift', icon: SiSwift, color: '#F05138' },
        { name: 'Ionic', icon: SiIonic, color: '#3880FF' },
        { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
        { name: 'React Native', icon: SiReact, color: '#61DAFB' },
        { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
        { name: 'Expo', icon: SiExpo, color: '#000020' },
    ],
    frontend: [
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
        { name: 'Angular', icon: SiAngular, color: '#DD0031' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
        { name: 'Material UI', icon: SiMui, color: '#007FFF' },
        { name: 'Redux', icon: SiRedux, color: '#764ABC' },
        { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' },
        { name: 'Gatsby', icon: SiGatsby, color: '#663399' },
        { name: 'Three.js', icon: SiThreedotjs, color: '#000000' },
        { name: 'Svelte', icon: SiSvelte, color: '#FF3E00' },
    ],
    backend: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'Go', icon: SiGo, color: '#00ADD8' },
        { name: 'PHP', icon: SiPhp, color: '#777BB4' },
        { name: 'Java', icon: FaJava, color: '#007396' },
        { name: '.NET', icon: SiDotnet, color: '#512BD4' },
        { name: 'Ruby on Rails', icon: SiRubyonrails, color: '#CC0000' },
        { name: 'Rust', icon: SiRust, color: '#DEA584' },
        { name: 'Elixir', icon: SiElixir, color: '#4E2A8E' },
        { name: 'Scala', icon: SiScala, color: '#DC322F' },
        { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
        { name: 'RabbitMQ', icon: SiRabbitmq, color: '#FF6600' },
        { name: 'Kafka', icon: SiApachekafka, color: '#231F20' },
    ],
    frameworks: [
        { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
        { name: 'Django', icon: SiDjango, color: '#092E20' },
        { name: 'Spring', icon: SiSpring, color: '#6DB33F' },
        { name: 'Express', icon: SiExpress, color: '#ffffff' },
        { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
        { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
        { name: 'Flask', icon: SiFlask, color: '#000000' },
        { name: 'Symfony', icon: SiSymfony, color: '#000000' },
    ],
    ai_ml: [
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
        { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
        { name: 'Pandas', icon: SiPandas, color: '#150458' },
        { name: 'NumPy', icon: SiNumpy, color: '#013243' },
        { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
        { name: 'Keras', icon: SiKeras, color: '#D00000' },
        { name: 'Hugging Face', icon: SiHuggingface, color: '#FFD21E' },
        { name: 'OpenAI', icon: SiOpenai, color: '#412991' },
        { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
        { name: 'Spark', icon: SiApachespark, color: '#E25A1C' },
        { name: 'Databricks', icon: SiDatabricks, color: '#FF3621' },
    ],
    cms: [
        { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
        { name: 'Drupal', icon: SiDrupal, color: '#0678BE' },
        { name: 'Joomla', icon: SiJoomla, color: '#5091CD' },
        { name: 'Wix', icon: SiWix, color: '#0C6EFC' },
        { name: 'Strapi', icon: SiStrapi, color: '#2F2E8F' },
        { name: 'Contentful', icon: SiContentful, color: '#2478CC' },
    ],
    database: [
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
        { name: 'Redis', icon: SiRedis, color: '#DC382D' },
        { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
        { name: 'MariaDB', icon: SiMariadb, color: '#003545' },
        { name: 'Oracle', icon: SiOracle, color: '#F80000' },
        { name: 'Cassandra', icon: SiApachecassandra, color: '#1287B1' },
        { name: 'Elasticsearch', icon: SiElasticsearch, color: '#005571' },
        { name: 'DynamoDB', icon: SiAmazondynamodb, color: '#4053D6' },
        { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
        { name: 'Neo4j', icon: SiNeo4J, color: '#008CC1' },
        { name: 'Couchbase', icon: SiCouchbase, color: '#EA2328' },
    ],
    devops: [
        { name: 'Docker', icon: FaDocker, color: '#2496ED' },
        { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
        { name: 'AWS', icon: FaAws, color: '#FF9900' },
        { name: 'Google Cloud', icon: FaGoogle, color: '#4285F4' },
        { name: 'Jenkins', icon: FaJenkins, color: '#D24939' },
        { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
        { name: 'Ansible', icon: SiAnsible, color: '#EE0000' },
        { name: 'Linux', icon: FaLinux, color: '#FCC624' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'Nginx', icon: SiNginx, color: '#009639' },
        { name: 'Apache', icon: SiApache, color: '#D22128' },
    ],
    design: [
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
        { name: 'Adobe XD', icon: SiAdobexd, color: '#FF61F6' },
        { name: 'Sketch', icon: SiSketch, color: '#F7B500' },
        { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
        { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
        { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
        { name: 'InVision', icon: SiInvision, color: '#FF3366' },
    ],
    ecommerce: [
        { name: 'Shopify', icon: SiShopify, color: '#7AB55C' },
        { name: 'Magento', icon: SiMagento, color: '#EE672F' },
        { name: 'WooCommerce', icon: SiWoocommerce, color: '#96588A' },
        { name: 'BigCommerce', icon: SiBigcommerce, color: '#121118' },
        { name: 'PrestaShop', icon: SiPrestashop, color: '#DF0067' },
    ]
};

const TechStack = () => {
    const [activeCategory, setActiveCategory] = useState('mobile');

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-black to-black pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
                    >
                        Our Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Stack</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        We use the latest tools and frameworks to build scalable, high-performance applications.
                    </motion.p>
                </div>

                {/* Categories Navigation */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                                    ? 'text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {activeCategory === category.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{category.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tech Grid */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center"
                        >
                            {technologies[activeCategory]?.map((tech: Technology, index: number) => (
                                <motion.div

                                    key={tech.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
                                >
                                    {/* Icon Glow Effect */}
                                    <div
                                        className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 rounded-2xl transition-all duration-500"
                                    />

                                    <div className="relative p-4 rounded-xl bg-black/50 border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-blue-500/30">
                                        <tech.icon
                                            className="text-4xl transition-all duration-300 filter grayscale group-hover:grayscale-0"
                                            style={{ color: tech.color }} // Note: styled via style prop to keep color logic simple, but grayscale normally overrides it. Using internal filter.
                                        />
                                        {/* Colored shadow on hover */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300"
                                            style={{ backgroundColor: tech.color }}
                                        ></div>
                                    </div>

                                    <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors relative z-10">
                                        {tech.name}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section >
    );
};

export default TechStack;

