import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaJava, FaAws, FaDocker, FaJenkins, FaGoogle, FaLinux, FaGitAlt } from 'react-icons/fa';
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

interface Tech {
    name: string;
    icon: React.ElementType;
    color: string;
}

const categories = [
    { id: 'mobile', label: 'Mobile' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'ai_ml', label: 'AI & ML' },
    { id: 'cms', label: 'CMS' },
    { id: 'database', label: 'Database' },
    { id: 'devops', label: 'DevOps' },
    { id: 'design', label: 'Design' },
    { id: 'ecommerce', label: 'Ecommerce' },
] as const;

type CategoryId = (typeof categories)[number]['id'];

const technologies: Record<CategoryId, Tech[]> = {
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

const Card = ({ tech }: { tech: Tech }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
        >
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/[0.03] group-hover:scale-110 transition-transform duration-300">
                <tech.icon
                    className="text-2xl"
                    style={{ color: tech.color }}
                />
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {tech.name}
            </span>
        </motion.div>
    );
};

const TechStack = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('mobile');

    return (
        <section className="bg-[#080808] py-24 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                {/* Simple Header */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        Tech Stack
                    </h2>
                    <p className="text-gray-500 max-w-xl">
                        A curated selection of modern technologies we use to build high-performance
                        digital products and scalable infrastructure.
                    </p>
                </div>

                {/* Simplified Tabs */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === category.id
                                    ? 'bg-white text-black'
                                    : 'text-gray-500 hover:text-gray-300 bg-white/[0.02] hover:bg-white/[0.05]'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Clean Grid */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        >
                            {technologies[activeCategory].map((tech) => (
                                <Card key={`${activeCategory}-${tech.name}`} tech={tech} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default TechStack;

