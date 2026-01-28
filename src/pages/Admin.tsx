import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { type Session } from "@supabase/supabase-js";
import {
    Trash2, Edit, Plus, X, LogOut, MessageSquare, Briefcase,
    LayoutDashboard, Search, User, Settings, Menu, Download,
    TrendingUp, ExternalLink, Image as ImageIcon, Calendar, Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

interface TalentPoolEntry {
    id: number;
    created_at: string;
    email: string;
}

interface Message {
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
}

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

interface JobApplication {
    id: number;
    created_at: string;
    job_id: number;
    job_title: string;
    name: string;
    email: string;
    phone: string;
    resume_link: string;
    portfolio_link: string;
}

const Admin = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null>(null);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [messages, setMessages] = useState<Message[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [talentPool, setTalentPool] = useState<TalentPoolEntry[]>([]);
    const [applications, setApplications] = useState<JobApplication[]>([]); // Added applications state
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Login State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // Project Form State
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [projectForm, setProjectForm] = useState({
        title: "",
        category: "Web",
        description: "",
        image: "",
        tags: "",
        link: "",
    });

    // Job Form State
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [jobForm, setJobForm] = useState({
        title: "",
        type: "Full-time",
        location: "",
        description: "",
        requirements: "",
        salary_range: "",
        category: "Engineering",
    });

    const fetchProjects = useCallback(async () => {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("id", { ascending: true });
        if (error) {
            // Error handling handled by UI or silent fail for now
        } else if (data) {
            setProjects(data as Project[]);
        }
    }, []);

    const fetchMessages = useCallback(async () => {
        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            // Error handling handled by UI or silent fail for now
        } else if (data) {
            setMessages(data as Message[]);
        }
    }, []);

    const fetchJobs = useCallback(async () => {
        const { data, error } = await supabase
            .from("jobs")
            .select("*")
            .order("id", { ascending: true });
        if (error) {
            // Error handling handled by UI or silent fail for now
        } else if (data) {
            setJobs(data as Job[]);
        }
    }, []);

    const fetchTalentPool = useCallback(async () => {
        const { data, error } = await supabase
            .from("talent_pool")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            // Error handling handled by UI or silent fail for now
        } else if (data) {
            setTalentPool(data as TalentPoolEntry[]);
        }
    }, []);

    const fetchApplications = useCallback(async () => {
        const { data, error } = await supabase
            .from("job_applications")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            // Error handling handled by UI or silent fail for now
        } else if (data) {
            setApplications(data as JobApplication[]);
        }
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        await Promise.all([
            fetchMessages(),
            fetchProjects(),
            fetchJobs(),
            fetchTalentPool(),
            fetchApplications()
        ]);
        setLoading(false);
    }, [fetchMessages, fetchProjects, fetchJobs, fetchTalentPool, fetchApplications]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                fetchData();
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchData();
        });

        return () => subscription.unsubscribe();
    }, [fetchData]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);
        if (error) setLoginError(error.message);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const handleDeleteTalent = async (id: number) => {
        if (!window.confirm("Are you sure you want to remove this entry?")) return;
        const { error } = await supabase.from("talent_pool").delete().eq("id", id);
        if (!error) fetchTalentPool();
    };

    const handleDeleteApplication = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        const { error } = await supabase.from("job_applications").delete().eq("id", id);
        if (!error) fetchApplications();
    };

    const handleDeleteMessage = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        const { error } = await supabase.from("contact_messages").delete().eq("id", id);
        if (!error) fetchMessages();
    };

    const handleExportMessages = () => {
        const dataToExport = messages.map(msg => ({
            ID: msg.id,
            Date: new Date(msg.created_at).toLocaleDateString(),
            Time: new Date(msg.created_at).toLocaleTimeString(),
            Name: msg.name,
            Email: msg.email,
            Phone: msg.phone,
            Subject: msg.subject,
            Message: msg.message
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");
        XLSX.writeFile(workbook, "Mobintix_Messages.xlsx");
    };

    const handleExportJobs = () => {
        const dataToExport = jobs.map(job => ({
            ID: job.id,
            Title: job.title,
            Category: job.category,
            Type: job.type,
            Location: job.location,
            Salary: job.salary_range,
            Description: job.description,
            Requirements: job.requirements.join("; "),
            Created_At: new Date(job.created_at).toLocaleString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
        XLSX.writeFile(workbook, "Mobintix_Jobs.xlsx");
    };

    const handleDeleteProject = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            const { error } = await supabase.from("projects").delete().eq("id", id);

            if (error) {
                alert(`Failed to delete project: ${error.message} (Code: ${error.code})`);
            } else {
                fetchProjects();
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            alert(`An unexpected error occurred: ${errorMessage}`);
        }
    };

    const handleSaveProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const tagsArray = projectForm.tags.split(",").map((t) => t.trim()).filter(t => t !== "");

        const payload = {
            title: projectForm.title,
            category: projectForm.category,
            description: projectForm.description,
            image: projectForm.image,
            tags: tagsArray,
            link: projectForm.link,
        };

        setLoading(true);
        try {
            if (editingProject) {
                const { error } = await supabase
                    .from("projects")
                    .update(payload)
                    .eq("id", editingProject.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("projects").insert([payload]);
                if (error) throw error;
            }
            setIsProjectModalOpen(false);
            fetchProjects();
        } catch {
            alert("Failed to save project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        setLoading(true);
        try {
            const { error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('project-images')
                .getPublicUrl(filePath);

            setProjectForm(prev => ({ ...prev, image: data.publicUrl }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            alert('Error uploading image: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this job post?")) return;
        try {
            const { error } = await supabase.from("jobs").delete().eq("id", id);
            if (error) {
                alert(`Failed to delete job: ${error.message}`);
            } else {
                fetchJobs();
            }
        } catch {
            alert("An unexpected error occurred while deleting the job.");
        }
    };

    const handleSaveJob = async (e: React.FormEvent) => {
        e.preventDefault();
        const requirementsArray = jobForm.requirements.split("\n").filter(r => r.trim() !== "");

        const payload = {
            title: jobForm.title,
            type: jobForm.type,
            location: jobForm.location,
            description: jobForm.description,
            requirements: requirementsArray,
            salary_range: jobForm.salary_range,
            category: jobForm.category,
        };

        setLoading(true);
        try {
            if (editingJob) {
                const { error } = await supabase
                    .from("jobs")
                    .update(payload)
                    .eq("id", editingJob.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("jobs").insert([payload]);
                if (error) throw error;
            }
            setIsJobModalOpen(false);
            fetchJobs();
        } catch {
            alert("Failed to save job post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const openProjectModal = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setProjectForm({
                title: project.title,
                category: project.category,
                description: project.description,
                image: project.image,
                tags: project.tags.join(", "),
                link: project.link,
            });
        } else {
            setEditingProject(null);
            setProjectForm({
                title: "",
                category: "Web",
                description: "",
                image: "",
                tags: "",
                link: "",
            });
        }
        setIsProjectModalOpen(true);
    };

    const openJobModal = (job?: Job) => {
        if (job) {
            setEditingJob(job);
            setJobForm({
                title: job.title,
                type: job.type,
                location: job.location,
                description: job.description,
                requirements: job.requirements.join("\n"),
                salary_range: job.salary_range,
                category: job.category,
            });
        } else {
            setEditingJob(null);
            setJobForm({
                title: "",
                type: "Full-time",
                location: "",
                description: "",
                requirements: "",
                salary_range: "",
                category: "Engineering",
            });
        }
        setIsJobModalOpen(true);
    };

    // Dark Mode Login Screen
    if (!session) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Mobintix <span className="text-blue-500">Admin</span></h1>
                            <p className="text-gray-500 text-sm">Welcome back, Captain.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Email Access</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="admin@mobintix.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Security Key</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Settings className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {loginError && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center">
                                    <X size={16} className="mr-2" />
                                    {loginError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-black transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : "Authenticate"}
                            </button>
                        </form>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-600">Secure Admin Portal • v1.0.0</p>
                    </div>
                </div>
            </div>
        );
    }

    // Modern Dark Dashboard Layout
    return (
        <div className="min-h-screen bg-[#050505] flex font-sans text-gray-200 selection:bg-blue-500/30">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Premium Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-[#1a1a1a] transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0">
                            <span className="font-bold text-white text-lg">M</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                                Mobintix
                            </h1>
                            <span className="text-xs text-gray-500 font-medium tracking-wide">COMMAND CENTER</span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden ml-auto text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-1">
                        {[
                            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                            { id: 'messages', icon: MessageSquare, label: 'Messages' },
                            { id: 'projects', icon: Briefcase, label: 'Projects' },
                            { id: 'jobs', icon: Briefcase, label: 'Jobs' },
                            { id: 'applications', icon: User, label: 'Applications' },
                            { id: 'talent-pool', icon: Users, label: 'Talent Pool' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                    setSearchQuery("");
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${activeTab === item.id
                                    ? 'text-white bg-[#111]'
                                    : 'text-gray-400 hover:text-white hover:bg-[#111]'
                                    }`}
                            >
                                {activeTab === item.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"></div>
                                )}
                                <item.icon size={20} className={`transition-colors ${activeTab === item.id ? 'text-blue-500' : 'group-hover:text-gray-200'}`} />
                                <span className="font-medium">{item.label}</span>
                                {activeTab === item.id && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-[#1a1a1a]">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Disconnect</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen md:ml-72 bg-[#050505] transition-all duration-300 relative overflow-hidden">
                {/* Top Bar */}
                <header className="h-20 border-b border-[#1a1a1a] bg-[#050505]/80 backdrop-blur-md sticky top-0 z-30 px-6 md:px-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 -ml-2 text-gray-400 hover:text-white rounded-lg md:hidden transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                {activeTab === 'dashboard' ? 'Overview' : activeTab === 'messages' ? 'Inbox' : activeTab === 'projects' ? 'Portfolio' : activeTab === 'jobs' ? 'Job Postings' : activeTab === 'applications' ? 'Applications' : 'Talent Pool'}
                            </h2>
                            <p className="text-xs text-gray-500 hidden sm:block">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#111] rounded-full border border-[#222]">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-medium text-gray-400">System Online</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#222] to-[#333] border border-[#333] flex items-center justify-center text-white font-bold shadow-inner">
                            A
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-[#111] p-6 rounded-3xl border border-[#222] relative overflow-hidden group hover:border-[#333] transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Briefcase size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-sm font-medium text-gray-400 mb-1">Total Projects</p>
                                        <h3 className="text-4xl font-bold text-white tracking-tight">{projects.length}</h3>
                                        <div className="mt-4 flex items-center text-xs font-medium text-green-400 bg-green-500/10 w-fit px-2 py-1 rounded-lg">
                                            <TrendingUp size={14} className="mr-1" />
                                            Active Portfolio
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#111] p-6 rounded-3xl border border-[#222] relative overflow-hidden group hover:border-[#333] transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <MessageSquare size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-sm font-medium text-gray-400 mb-1">Total Messages</p>
                                        <h3 className="text-4xl font-bold text-white tracking-tight">{messages.length}</h3>
                                        <div className="mt-4 flex items-center text-xs font-medium text-blue-400 bg-blue-500/10 w-fit px-2 py-1 rounded-lg">
                                            <Calendar size={14} className="mr-1" />
                                            All Time
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#111] p-6 rounded-3xl border border-[#222] relative overflow-hidden group hover:border-[#333] transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Briefcase size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-sm font-medium text-gray-400 mb-1">Total Jobs</p>
                                        <h3 className="text-4xl font-bold text-white tracking-tight">{jobs.length}</h3>
                                        <div className="mt-4 flex items-center text-xs font-medium text-purple-400 bg-purple-500/10 w-fit px-2 py-1 rounded-lg">
                                            <Calendar size={14} className="mr-1" />
                                            Active Postings
                                        </div>
                                    </div>
                                </div>

                                {/* Job Applications Stat */}
                                <div className="bg-[#111] p-6 rounded-3xl border border-[#222] relative overflow-hidden group hover:border-[#333] transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <User size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-sm font-medium text-gray-400 mb-1">Total Applications</p>
                                        <h3 className="text-4xl font-bold text-white tracking-tight">{applications.length}</h3>
                                        <div className="mt-4 flex items-center text-xs font-medium text-amber-400 bg-amber-500/10 w-fit px-2 py-1 rounded-lg">
                                            <Calendar size={14} className="mr-1" />
                                            Active Candidates
                                        </div>
                                    </div>
                                </div>

                                {/* Talent Pool Stat */}
                                <div className="bg-[#111] p-6 rounded-3xl border border-[#222] relative overflow-hidden group hover:border-[#333] transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Users size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-sm font-medium text-gray-400 mb-1">Total Talent</p>
                                        <h3 className="text-4xl font-bold text-white tracking-tight">{talentPool.length}</h3>
                                        <div className="mt-4 flex items-center text-xs font-medium text-indigo-400 bg-indigo-500/10 w-fit px-2 py-1 rounded-lg">
                                            <Users size={14} className="mr-1" />
                                            All Candidates
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-[#111] rounded-3xl border border-[#222] p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-white">Recent Messages</h3>
                                        <button onClick={() => setActiveTab('messages')} className="text-xs text-blue-400 hover:text-blue-300">View All</button>
                                    </div>
                                    <div className="space-y-4">
                                        {messages.length === 0 ? (
                                            <div className="text-center py-8 text-gray-600 text-sm">No recent messages</div>
                                        ) : (
                                            messages.slice(0, 4).map((msg) => (
                                                <div key={msg.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#1a1a1a] transition-colors cursor-pointer border border-transparent hover:border-[#222]" onClick={() => setActiveTab('messages')}>
                                                    <div className="w-10 h-10 rounded-full bg-blue-900/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-900/30">
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-semibold text-gray-200 truncate">{msg.name}</h4>
                                                        <p className="text-xs text-gray-500 truncate">{msg.subject}</p>
                                                    </div>
                                                    <span className="text-xs text-gray-600 whitespace-nowrap">{new Date(msg.created_at).toLocaleDateString()}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MESSAGES TAB */}
                    {activeTab === 'messages' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email or subject..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-[#111] border border-[#222] rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                <button
                                    onClick={handleExportMessages}
                                    className="flex items-center gap-2 px-5 py-3 bg-[#111] hover:bg-[#1a1a1a] text-gray-300 border border-[#222] rounded-2xl transition-colors text-sm font-medium"
                                >
                                    <Download size={18} />
                                    <span>Export CSV</span>
                                </button>
                            </div>

                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-20 bg-[#111] rounded-3xl border border-[#222] border-dashed">
                                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                                        <MessageSquare size={24} className="text-gray-600" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No messages found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {messages
                                        .filter(msg =>
                                            msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            msg.message.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((msg) => (
                                            <div key={msg.id} className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-gray-700 transition-all shadow-sm group">
                                                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0 border border-white/5">
                                                            {msg.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white text-lg">{msg.name}</h4>
                                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                                                                <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                                                    <ExternalLink size={12} /> {msg.email}
                                                                </span>
                                                                {msg.phone && <span className="w-1 h-1 bg-gray-700 rounded-full"></span>}
                                                                {msg.phone && <span>{msg.phone}</span>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 self-start md:self-center">
                                                        <span className="text-xs text-gray-500 font-medium bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#2a2a2a]">
                                                            {new Date(msg.created_at).toLocaleString()}
                                                        </span>
                                                        <button
                                                            onClick={() => handleDeleteMessage(msg.id)}
                                                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1f1f1f] text-gray-300 text-sm leading-relaxed">
                                                    <span className="text-xs uppercase tracking-wider text-gray-500 block mb-2 font-bold">{msg.subject}</span>
                                                    {msg.message}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Portfolio Showcase</h2>
                                    <p className="text-gray-500 text-sm mt-1">Manage your public projects</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-64 hidden xl:block">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search projects..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-[#111] border border-[#222] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <button
                                        onClick={() => openProjectModal()}
                                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    >
                                        <Plus size={20} />
                                        <span>New Project</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                {projects
                                    .filter(p =>
                                        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                                    )
                                    .map((project) => (
                                        <div key={project.id} className="group bg-[#111] rounded-3xl overflow-hidden border border-[#222] hover:border-[#333] transition-all hover:-translate-y-1 hover:shadow-2xl">
                                            <div className="relative h-56 overflow-hidden">
                                                {project.image ? (
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-gray-700">
                                                        <ImageIcon size={48} />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent opacity-90"></div>

                                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 text-white rounded-lg backdrop-blur-md shadow-lg">
                                                        {project.category}
                                                    </span>
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                                        <button onClick={() => openProjectModal(project)} className="p-2 bg-white text-black rounded-lg hover:bg-gray-200">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDeleteProject(project.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{project.description}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.slice(0, 3).map((tag, i) => (
                                                        <span key={i} className="text-[10px] text-gray-400 bg-[#1a1a1a] px-2 py-1 rounded border border-[#2a2a2a]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {project.tags.length > 3 && <span className="text-[10px] text-gray-500 py-1">+ {project.tags.length - 3}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {/* Add New Placeholder */}
                                <button onClick={() => openProjectModal()} className="group bg-[#0a0a0a] rounded-3xl border-2 border-dashed border-[#222] hover:border-blue-500/50 flex flex-col items-center justify-center h-full min-h-[300px] transition-all">
                                    <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-blue-500/10">
                                        <Plus size={32} className="text-gray-600 group-hover:text-blue-500" />
                                    </div>
                                    <p className="font-bold text-gray-500 group-hover:text-gray-300">Add New Project</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* JOBS TAB */}
                    {activeTab === 'jobs' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Job Postings</h2>
                                    <p className="text-gray-500 text-sm mt-1">Manage career opportunities at Mobintix</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-64 hidden xl:block">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search jobs..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-[#111] border border-[#222] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <button
                                        onClick={handleExportJobs}
                                        className="flex items-center gap-2 px-4 py-3 bg-[#111] hover:bg-[#1a1a1a] text-gray-300 border border-[#222] rounded-xl transition-colors text-sm font-medium"
                                    >
                                        <Download size={18} />
                                        <span className="hidden sm:inline">Export</span>
                                    </button>
                                    <button
                                        onClick={() => openJobModal()}
                                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    >
                                        <Plus size={20} />
                                        <span>New Job Post</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {jobs
                                    .filter(j =>
                                        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        j.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        j.type.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-20 bg-[#111] rounded-3xl border border-[#222] border-dashed">
                                        <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                                            <Briefcase size={24} className="text-gray-600" />
                                        </div>
                                        <p className="text-gray-500 font-medium">No job postings found</p>
                                    </div>
                                ) : (
                                    jobs
                                        .filter(j =>
                                            j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            j.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            j.type.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((job) => (
                                            <div key={job.id} className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-gray-700 transition-all shadow-sm group">
                                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h4 className="font-bold text-white text-xl">{job.title}</h4>
                                                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">
                                                                {job.type}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                                            <span className="flex items-center gap-1.5">
                                                                <Search size={14} className="text-gray-600" /> {job.category}
                                                            </span>
                                                            <span className="w-1 h-1 bg-gray-700 rounded-full self-center"></span>
                                                            <span className="flex items-center gap-1.5">
                                                                <ImageIcon size={14} className="text-gray-600" /> {job.location}
                                                            </span>
                                                            {job.salary_range && (
                                                                <>
                                                                    <span className="w-1 h-1 bg-gray-700 rounded-full self-center"></span>
                                                                    <span>{job.salary_range}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-400 text-sm line-clamp-2 max-w-3xl">
                                                            {job.description}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-row md:flex-col gap-2 self-start">
                                                        <button
                                                            onClick={() => openJobModal(job)}
                                                            className="p-2.5 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-xl border border-[#222] transition-colors"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteJob(job.id)}
                                                            className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl border border-[#222] transition-colors"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "applications" && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 md:px-10 mt-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight leading-none mb-2">Job Applications</h2>
                                    <p className="text-gray-500 text-sm">Review incoming applications from the Careers page.</p>
                                </div>
                            </div>

                            <div className="px-6 md:px-10 pb-10">
                                <div className="bg-[#0a0a0a] rounded-[2rem] border border-[#1a1a1a] shadow-sm overflow-hidden">
                                    {applications.length === 0 ? (
                                        <div className="p-20 text-center">
                                            <Briefcase className="mx-auto text-gray-800 mb-6" size={64} />
                                            <h3 className="text-xl font-bold text-white mb-2">No applications yet</h3>
                                            <p className="text-gray-500 max-w-xs mx-auto">Applications submitted through the website will appear here.</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-[#0f0f0f] border-b border-[#1a1a1a]">
                                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Date</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Candidate</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Position</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Resume / Portfolio</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#1a1a1a]">
                                                    {applications.map((app) => (
                                                        <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                                                            <td className="px-8 py-5 text-sm text-gray-500">
                                                                {new Date(app.created_at).toLocaleDateString(undefined, {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </td>
                                                            <td className="px-8 py-5">
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-bold text-white">{app.name}</span>
                                                                    <span className="text-xs text-gray-500">{app.email}</span>
                                                                    {app.phone && <span className="text-xs text-gray-500">{app.phone}</span>}
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-5 text-sm font-medium text-gray-300">
                                                                {app.job_title}
                                                            </td>
                                                            <td className="px-8 py-5 text-sm">
                                                                <div className="flex flex-col gap-1">
                                                                    <a href={app.resume_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1">
                                                                        Resume <ExternalLink size={12} />
                                                                    </a>
                                                                    {app.portfolio_link && (
                                                                        <a href={app.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:underline flex items-center gap-1">
                                                                            Portfolio <ExternalLink size={12} />
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-5 text-right">
                                                                <button
                                                                    onClick={() => handleDeleteApplication(app.id)}
                                                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                                    title="Delete Application"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "talent-pool" && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 md:px-10 mt-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight leading-none mb-2">Talent Pool</h2>
                                    <p className="text-gray-500 text-sm">Prospective candidate sign-ups and interest.</p>
                                </div>
                            </div>

                            <div className="px-6 md:px-10 pb-10">
                                <div className="bg-[#0a0a0a] rounded-[2rem] border border-[#1a1a1a] shadow-sm overflow-hidden">
                                    {talentPool.length === 0 ? (
                                        <div className="p-20 text-center">
                                            <Users className="mx-auto text-gray-800 mb-6" size={64} />
                                            <h3 className="text-xl font-bold text-white mb-2">The pool is empty</h3>
                                            <p className="text-gray-500 max-w-xs mx-auto">Emails of candidates interested in future roles will appear here.</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-[#0f0f0f] border-b border-[#1a1a1a]">
                                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Date Joined</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#1a1a1a]">
                                                    {talentPool.map((entry) => (
                                                        <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors group">
                                                            <td className="px-8 py-5 text-sm text-gray-500">
                                                                {new Date(entry.created_at).toLocaleDateString(undefined, {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </td>
                                                            <td className="px-8 py-5 text-sm font-medium text-gray-200">
                                                                {entry.email}
                                                            </td>
                                                            <td className="px-8 py-5 text-right">
                                                                <button
                                                                    onClick={() => handleDeleteTalent(entry.id)}
                                                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                                    title="Remove Entry"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Project Modal - Dark Mode */}
            {isProjectModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#111] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#222] animate-in fade-in zoom-in duration-200">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8 border-b border-[#222] pb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {editingProject ? "Edit Project" : "New Project"}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">Configure your project details.</p>
                                </div>
                                <button onClick={() => setIsProjectModalOpen(false)} className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors text-gray-400">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveProject} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Project Title</label>
                                        <input
                                            type="text"
                                            value={projectForm.title}
                                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                            className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                            placeholder="e.g. Fintech Dashboard"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Category</label>
                                        <select
                                            value={projectForm.category}
                                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                                            className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        >
                                            <option>Web</option>
                                            <option>Mobile</option>
                                            <option>Design</option>
                                            <option>E-Commerce</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Project Link</label>
                                    <div className="relative">
                                        <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={16} />
                                        <input
                                            type="url"
                                            value={projectForm.link}
                                            onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                                            className="w-full pl-10 p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                                            placeholder="https://..."
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Project Image</label>
                                    <div className="space-y-4">
                                        {/* Image Preview */}
                                        {projectForm.image && (
                                            <div className="relative w-full h-48 bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#222] group">
                                                <img
                                                    src={projectForm.image}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setProjectForm({ ...projectForm, image: "" })}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                                            <div className="flex-1 w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#222] border-dashed rounded-xl cursor-pointer bg-[#0a0a0a] hover:bg-[#111] hover:border-blue-500/50 transition-all group">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <div className="p-3 bg-[#1a1a1a] text-gray-500 rounded-full mb-3 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-colors">
                                                            <Plus size={20} />
                                                        </div>
                                                        <p className="mb-2 text-sm text-gray-500 group-hover:text-gray-300">Click to upload image</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                    />
                                                </label>
                                            </div>
                                            <div className="w-full sm:w-1/3">
                                                <input
                                                    type="url"
                                                    value={projectForm.image}
                                                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                                                    className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    placeholder="Or image URL..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Tags</label>
                                    <input
                                        type="text"
                                        value={projectForm.tags}
                                        onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                                        className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="React, TypeScript, Supabase..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Description</label>
                                    <textarea
                                        value={projectForm.description}
                                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                        className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                                        rows={4}
                                        placeholder="Detailed project description..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-[#222]">
                                    <button
                                        type="button"
                                        onClick={() => setIsProjectModalOpen(false)}
                                        className="px-6 py-3 text-gray-400 font-medium hover:bg-[#1a1a1a] hover:text-white rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Saving..." : (editingProject ? "Save Changes" : "Create Project")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Job Modal - Dark Mode */}
            {isJobModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#111] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#222] animate-in fade-in zoom-in duration-200">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8 border-b border-[#222] pb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {editingJob ? "Edit Job Posting" : "New Job Posting"}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">Fill in the details for the position.</p>
                                </div>
                                <button onClick={() => setIsJobModalOpen(false)} className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors text-gray-400">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveJob} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Job Title</label>
                                        <input
                                            type="text"
                                            value={jobForm.title}
                                            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                            className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                            placeholder="e.g. Senior Frontend Developer"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Category</label>
                                        <select
                                            value={jobForm.category}
                                            onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                                            className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        >
                                            <option>Engineering</option>
                                            <option>Design</option>
                                            <option>Marketing</option>
                                            <option>Sales</option>
                                            <option>Operations</option>
                                            <option>Support</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Job Type</label>
                                        <select
                                            value={jobForm.type}
                                            onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                                            className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        >
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Contract</option>
                                            <option>Freelance</option>
                                            <option>Internship</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Location</label>
                                        <input
                                            type="text"
                                            value={jobForm.location}
                                            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                            className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            placeholder="e.g. Remote, Surat, Mumbai"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Salary Range (Optional)</label>
                                    <input
                                        type="text"
                                        value={jobForm.salary_range}
                                        onChange={(e) => setJobForm({ ...jobForm, salary_range: e.target.value })}
                                        className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="e.g. ₹5L - ₹8L per annum"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Job Description</label>
                                    <textarea
                                        value={jobForm.description}
                                        onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                                        className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                                        rows={4}
                                        placeholder="Briefly describe the role..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Requirements (One per line)</label>
                                    <textarea
                                        value={jobForm.requirements}
                                        onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                                        className="w-full p-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none font-mono text-sm"
                                        rows={5}
                                        placeholder="Requirement 1&#10;Requirement 2&#10;Requirement 3..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-[#222]">
                                    <button
                                        type="button"
                                        onClick={() => setIsJobModalOpen(false)}
                                        className="px-6 py-3 text-gray-400 font-medium hover:bg-[#1a1a1a] hover:text-white rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Saving..." : (editingJob ? "Save Changes" : "Post Job")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
