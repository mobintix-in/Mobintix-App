import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const onMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            onMouseMove={onMouseMove}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="group relative h-48 rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-white/20 hover:bg-white/10 overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${tech.color}33, transparent 80%)`
                    ),
                }}
            />

            <div className="relative flex h-full flex-col items-center justify-center gap-4">
                <div className="relative">
                    <tech.icon
                        className="text-6xl transition-transform duration-500 group-hover:scale-110"
                        style={{ color: tech.color }}
                    />
                    <div
                        className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                        style={{ backgroundColor: tech.color }}
                    />
                </div>
                <span className="text-sm font-medium tracking-tight text-gray-400 group-hover:text-white transition-colors">
                    {tech.name}
                </span>
            </div>

            {/* Corner Accent */}
            <div
                className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-30 transition-opacity"
                style={{
                    background: `radial-gradient(circle at top right, ${tech.color}, transparent 70%)`
                }}
            />
        </motion.div>
    );
};

const TechStack = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('mobile');
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top } = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - left);
            mouseY.set(e.clientY - top);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full bg-[#030303] py-24 md:py-32 overflow-hidden"
        >
            {/* Premium Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px] mix-blend-screen animate-pulse"
                    style={{ background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #3b82f6)' }}
                />
                <div
                    className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px] mix-blend-screen"
                    style={{ background: 'conic-gradient(from 0deg, #ec4899, #8b5cf6, #ec4899)' }}
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-200" />

                {/* Spotlight effect */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.05), transparent 80%)`
                        )
                    }}
                />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8"
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Expertise Ecosystem</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8"
                    >
                        Future-Ready <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Technology Stack</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Leveraging cutting-edge tools and frameworks to architect scalable,
                        high-performance digital solutions that define tomorrow.
                    </motion.p>
                </div>

                {/* Categories Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${activeCategory === category.id
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {activeCategory === category.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-2xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={`relative z-10 ${activeCategory === category.id ? 'text-black' : ''}`}>
                                {category.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tech Grid */}
                <div className="min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
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

