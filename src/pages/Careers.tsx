import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import {
    Briefcase, MapPin, Clock, Search,
    ArrowRight, X, Calendar,
    Users, Rocket, Target, Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";

interface Job {
    id: number;
    created_at: string;
    title: string;
    type: string;
    location: string;
    description: string;
    requirements: string[];
    salary_range: string;
    category: string;
}

const Careers = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [poolEmail, setPoolEmail] = useState("");
    const [isSubmittingPool, setIsSubmittingPool] = useState(false);
    const [poolMessage, setPoolMessage] = useState({ text: "", type: "" });

    // Application Form State
    const [isApplying, setIsApplying] = useState(false);
    const [applicationForm, setApplicationForm] = useState({
        name: "",
        email: "",
        phone: "",
        resume_link: "",
        portfolio_link: ""
    });
    const [isSubmittingApp, setIsSubmittingApp] = useState(false);
    const [appMessage, setAppMessage] = useState({ text: "", type: "" });

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("jobs")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            // Silently fail or simple log if needed in dev, but removing for production clean output.
        } else if (data) {
            setJobs(data as Job[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const categories = ["All", ...Array.from(new Set(jobs.map(job => job.category || "General"))).filter(Boolean)];

    const filteredJobs = jobs.filter(job => {
        const matchesCategory = activeCategory === "All" || job.category === activeCategory;
        const title = job.title || "";
        const description = job.description || "";
        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleJoinPool = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!poolEmail) return;

        setIsSubmittingPool(true);
        setPoolMessage({ text: "", type: "" });

        try {
            const { error } = await supabase
                .from("talent_pool")
                .insert([{ email: poolEmail }]);

            if (error) {
                if (error.code === "23505") { // Unique violation
                    setPoolMessage({ text: "You're already in our pool!", type: "info" });
                } else {
                    throw error;
                }
            } else {
                setPoolMessage({ text: "Success! We'll keep you posted.", type: "success" });
                setPoolEmail("");
            }
        } catch {
            setPoolMessage({ text: "Something went wrong. Try again later.", type: "error" });
        } finally {
            setIsSubmittingPool(false);
            setTimeout(() => setPoolMessage({ text: "", type: "" }), 5000);
        }
    };

    const handleApplicationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJob) return;

        setIsSubmittingApp(true);
        setAppMessage({ text: "", type: "" });

        try {
            const { error } = await supabase.from("job_applications").insert([{
                job_id: selectedJob.id,
                job_title: selectedJob.title,
                name: applicationForm.name,
                email: applicationForm.email,
                phone: applicationForm.phone,
                resume_link: applicationForm.resume_link,
                portfolio_link: applicationForm.portfolio_link
            }]);

            if (error) throw error;

            setAppMessage({ text: "Application submitted successfully!", type: "success" });
            setApplicationForm({ name: "", email: "", phone: "", resume_link: "", portfolio_link: "" });
            setTimeout(() => {
                setIsApplying(false);
                setSelectedJob(null);
                setAppMessage({ text: "", type: "" });
            }, 2000);
        } catch {
            setAppMessage({ text: "Failed to submit application. Please try again.", type: "error" });
        } finally {
            setIsSubmittingApp(false);
        }
    };



    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Careers | Join the Mobintix Team"
                description="Explore exciting career opportunities at Mobintix. We're looking for passionate developers, designers, and innovators to join our team."
                url="/careers"
            />
            {/* Hero Section */}
            <section className="relative pt-44 pb-32 overflow-hidden bg-black text-white">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-600/10 via-purple-600/5 to-transparent -z-0"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            We're Hiring Globally
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-10"
                        >
                            Build the <br /> <span className="text-gray-500">Next Frontier.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-12"
                        >
                            Join a collective of visionary engineers and designers crafting state-of-the-art digital experiences for the world's most ambitious brands.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <a
                                href="#listings"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all shadow-xl shadow-white/5 active:scale-95"
                            >
                                Explore Opportunities
                                <ArrowRight size={20} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-24 bg-black text-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Rocket, title: "Innovation", desc: "Work with cutting-edge technologies like AI, Blockchain, and IoT." },
                            { icon: Target, title: "Impact", desc: "Build solutions that solve real-world problems for industry leaders." },
                            { icon: Users, title: "Culture", desc: "Join a diverse team that values collaboration and continuous learning." },
                            { icon: Heart, title: "Balance", desc: "Flexible work arrangements and a focus on employee well-being." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-4"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Listings Section */}
            <section className="py-24" id="listings">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                        <div>
                            <h2 className="text-4xl font-bold text-black tracking-tight mb-4">Open Positions</h2>
                            <p className="text-gray-500">Discover your next career move at Mobintix</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search roles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all w-full sm:w-64"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? "bg-black text-white shadow-lg"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Job Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-black mb-2">No positions found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search query.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => setSelectedJob(job)}
                                    className="group bg-white p-8 rounded-3xl border border-gray-100 hover:border-black transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                                >
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase rounded-full">
                                                {job.category}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase">
                                                <Clock size={12} /> {job.type}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-black group-hover:text-black transition-colors mb-2">{job.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={14} /> {job.location}
                                            </span>
                                            {job.salary_range && (
                                                <>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                    <span>{job.salary_range}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-all transform group-hover:translate-x-2">
                                        <ArrowRight size={24} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Job Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedJob(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-8 md:p-10 border-b border-gray-100 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                                            {selectedJob.category}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                            Posted {new Date(selectedJob.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tighter leading-none mb-6">
                                        {selectedJob.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-black">
                                                <MapPin size={16} />
                                            </div>
                                            <span>{selectedJob.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-black">
                                                <Clock size={16} />
                                            </div>
                                            <span>{selectedJob.type}</span>
                                        </div>
                                        {selectedJob.salary_range && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-black">
                                                    <Calendar size={16} />
                                                </div>
                                                <span>{selectedJob.salary_range}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400 hover:text-black"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
                                <div className="max-w-3xl">
                                    <div className="mb-10">
                                        <h4 className="text-xl font-bold text-black mb-4">Role Overview</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    <div className="mb-10">
                                        <h4 className="text-xl font-bold text-black mb-4">Key Requirements</h4>
                                        <ul className="space-y-4">
                                            {Array.isArray(selectedJob.requirements) ? selectedJob.requirements.map((req, i) => (
                                                <li key={i} className="flex items-start gap-4 text-gray-600">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                    </div>
                                                    <span>{req}</span>
                                                </li>
                                            )) : (
                                                <li className="text-gray-500 italic">No specific requirements listed.</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                        <div className="pt-8 border-t border-gray-100">
                                            {isApplying ? (
                                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                                    <div className="flex justify-between items-center mb-6">
                                                        <h4 className="text-xl font-bold text-black">Apply for {selectedJob.title}</h4>
                                                        <button
                                                            onClick={() => setIsApplying(false)}
                                                            className="text-gray-400 hover:text-black text-sm font-medium"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>

                                                    <form onSubmit={handleApplicationSubmit} className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <input
                                                                type="text"
                                                                placeholder="Full Name *"
                                                                required
                                                                value={applicationForm.name}
                                                                onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                                                            />
                                                            <input
                                                                type="email"
                                                                placeholder="Email Address *"
                                                                required
                                                                value={applicationForm.email}
                                                                onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                                                            />
                                                        </div>
                                                        <input
                                                            type="tel"
                                                            placeholder="Phone Number"
                                                            value={applicationForm.phone}
                                                            onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                                                            className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                                                        />
                                                        <div className="space-y-2">
                                                            <input
                                                                type="url"
                                                                placeholder="Link to Resume (Google Drive / Dropbox) *"
                                                                required
                                                                value={applicationForm.resume_link}
                                                                onChange={(e) => setApplicationForm({ ...applicationForm, resume_link: e.target.value })}
                                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                                                            />
                                                            <p className="text-xs text-gray-500 ml-1">Please ensure the link is publicly accessible.</p>
                                                        </div>
                                                        <input
                                                            type="url"
                                                            placeholder="Link to Portfolio / LinkedIn"
                                                            value={applicationForm.portfolio_link}
                                                            onChange={(e) => setApplicationForm({ ...applicationForm, portfolio_link: e.target.value })}
                                                            className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                                                        />

                                                        {appMessage.text && (
                                                            <div className={`p-4 rounded-xl text-sm font-medium ${appMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                                {appMessage.text}
                                                            </div>
                                                        )}

                                                        <button
                                                            type="submit"
                                                            disabled={isSubmittingApp}
                                                            className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-all shadow-lg disabled:opacity-50"
                                                        >
                                                            {isSubmittingApp ? "Submitting Application..." : "Submit Application"}
                                                        </button>
                                                    </form>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="text-gray-500 mb-6">
                                                        Interested candidates can apply directly for this position.
                                                    </p>
                                                    <button
                                                        onClick={() => setIsApplying(true)}
                                                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-black/10 w-full md:w-auto justification-center"
                                                    >
                                                        Apply Now
                                                        <ArrowRight size={20} />
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Newsletter/CTA */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
                        <div className="max-w-md">
                            <h3 className="text-3xl font-bold text-black mb-4 tracking-tight">Stay updated on new roles</h3>
                            <p className="text-gray-500 text-sm">Don't see a perfect fit? Sign up for our talent pool and we'll reach out when the right opportunity arrives.</p>
                        </div>
                        <div className="w-full md:w-auto">
                            <form onSubmit={handleJoinPool} className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1 md:w-64">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        value={poolEmail}
                                        onChange={(e) => setPoolEmail(e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                    />
                                    {poolMessage.text && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`absolute -bottom-6 left-2 text-[10px] font-bold uppercase tracking-wider ${poolMessage.type === "success" ? "text-green-500" :
                                                poolMessage.type === "info" ? "text-blue-500" : "text-red-500"
                                                }`}
                                        >
                                            {poolMessage.text}
                                        </motion.p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmittingPool}
                                    className="px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all shadow-lg text-sm disabled:opacity-50"
                                >
                                    {isSubmittingPool ? "Joining..." : "Join Pool"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
