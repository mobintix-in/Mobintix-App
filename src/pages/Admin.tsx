import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
    Trash2, Edit, Plus, X, LogOut, MessageSquare, Briefcase,
    LayoutDashboard, Search, ChevronRight, User, Settings, Menu, Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

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

const Admin = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [messages, setMessages] = useState<Message[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchData();
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchData();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchMessages(), fetchProjects()]);
        setLoading(false);
    };

    const fetchMessages = async () => {
        const { data } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setMessages(data as Message[]);
    };

    const fetchProjects = async () => {
        const { data } = await supabase
            .from("projects")
            .select("*")
            .order("id", { ascending: true });
        if (data) setProjects(data);
    };

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

    const handleDeleteProject = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            const { error } = await supabase.from("projects").delete().eq("id", id);

            if (error) {
                console.error("Error deleting project:", error);
                alert(`Failed to delete project: ${error.message} (Code: ${error.code})`);
            } else {
                fetchProjects();
            }
        } catch (err: any) {
            console.error("Unexpected error:", err);
            alert(`An unexpected error occurred: ${err.message || err}`);
        }
    };

    const handleSaveProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const tagsArray = projectForm.tags.split(",").map((t) => t.trim());

        const payload = {
            title: projectForm.title,
            category: projectForm.category,
            description: projectForm.description,
            image: projectForm.image,
            tags: tagsArray,
            link: projectForm.link,
        };

        if (editingProject) {
            const { error } = await supabase
                .from("projects")
                .update(payload)
                .eq("id", editingProject.id);
            if (!error) {
                setIsProjectModalOpen(false);
                fetchProjects();
            }
        } else {
            const { error } = await supabase.from("projects").insert([payload]);
            if (!error) {
                setIsProjectModalOpen(false);
                fetchProjects();
            }
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
        } catch (error: any) {
            alert('Error uploading image: ' + error.message);
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

    // Modern Login Screen
    if (!session) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                {/* Abstract shapes background */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

                <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full border border-white/20 relative z-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Mobintix Infotech<span className="text-blue-400">Admin</span></h1>
                        <p className="text-gray-400 text-sm">Sign in to manage your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/30 border border-gray-600 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                                    placeholder="admin@mobintix.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <div className="relative">
                                <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/30 border border-gray-600 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {loginError && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm flex items-center">
                                <X size={16} className="mr-2" />
                                {loginError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Authenticating..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Dashboard Layout
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl md:shadow-none`}>
                <div className="h-full flex flex-col">
                    <div className="h-20 md:h-24 flex items-center justify-between px-6 border-b border-gray-800/80">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-blue-900/20">
                                <img src="/Mobintix.png" alt="Mobintix" className="w-full h-full object-contain p-1.5" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white tracking-wide leading-none">
                                    Mobintix Infotech
                                </h1>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                    <span className="text-xs font-medium text-gray-400">Admin Panel</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-8 space-y-2">
                        {[
                            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                            { id: 'messages', icon: MessageSquare, label: 'Messages' },
                            { id: 'projects', icon: Briefcase, label: 'Projects' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} className={activeTab === item.id ? 'animate-pulse' : ''} />
                                <span className="font-medium">{item.label}</span>
                                {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-800">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen md:ml-64 bg-gray-50/50 transition-all duration-300">
                {/* Header */}
                <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between shadow-sm md:shadow-none">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full p-1 sm:pr-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                            <img src="/Mobintix.png" alt="Mobintix" className="w-full h-full object-contain p-1" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">Administrator</span>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto">

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {/* Stats Card 1 */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-blue-50 rounded-xl">
                                            <Briefcase className="text-blue-600" size={24} />
                                        </div>
                                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">+12%</span>
                                    </div>
                                    <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
                                    <p className="text-3xl font-bold text-gray-800 mt-1 tracking-tight">{projects.length}</p>
                                </div>

                                {/* Stats Card 2 */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-purple-50 rounded-xl">
                                            <MessageSquare className="text-purple-600" size={24} />
                                        </div>
                                        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">New</span>
                                    </div>
                                    <h3 className="text-gray-500 text-sm font-medium">Messages</h3>
                                    <p className="text-3xl font-bold text-gray-800 mt-1 tracking-tight">{messages.length}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* System Status */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></div>
                                        System Status
                                    </h3>
                                    <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-100 text-sm text-gray-600 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        All systems operational. Secure connection to Supabase active.
                                    </div>
                                </div>

                                {/* Recent Messages Notification */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                            <div className="relative">
                                                <MessageSquare size={20} className="text-blue-600" />
                                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                            </div>
                                            Recent Messages
                                        </h3>
                                        <button
                                            onClick={() => setActiveTab('messages')}
                                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                        >
                                            View All
                                        </button>
                                    </div>

                                    {messages.length === 0 ? (
                                        <p className="text-sm text-gray-400 italic">No new notifications.</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {messages.slice(0, 3).map((msg) => (
                                                <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer" onClick={() => setActiveTab('messages')}>
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-start">
                                                            <p className="text-sm font-semibold text-gray-900 truncate">{msg.name}</p>
                                                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-600 truncate mt-0.5">{msg.subject}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MESSAGES TAB */}
                    {activeTab === 'messages' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 flex-wrap">
                                <h3 className="text-xl font-bold text-gray-800">Inbox</h3>
                                <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap sm:flex-nowrap">
                                    <div className="relative w-full lg:w-auto flex-1 h-10">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search messages..."
                                            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-full"
                                        />
                                    </div>
                                    <button
                                        onClick={handleExportMessages}
                                        className="h-10 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap"
                                        title="Export to Excel"
                                    >
                                        <Download size={18} />
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>

                            {messages.length === 0 ? (
                                <div className="p-12 text-center text-gray-400">
                                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>No messages yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 leading-tight">{msg.name}</h4>
                                                        <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-100">
                                                    {msg.subject}
                                                </span>
                                            </div>

                                            <div className="space-y-1 mb-4">
                                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                                    <span className="font-medium text-xs uppercase tracking-wider text-gray-400 w-12">Email:</span>
                                                    <span className="truncate text-gray-700">{msg.email}</span>
                                                </div>
                                                {msg.phone && (
                                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                                        <span className="font-medium text-xs uppercase tracking-wider text-gray-400 w-12">Phone:</span>
                                                        <span className="text-gray-700">{msg.phone}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-gray-50/50 p-4 rounded-xl text-sm text-gray-600 mb-4 flex-grow italic border border-gray-50">
                                                "{msg.message}"
                                            </div>

                                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center mt-auto">
                                                <span className="text-xs text-gray-400 font-medium">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                <button
                                                    onClick={() => handleDeleteMessage(msg.id)}
                                                    className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                    title="Delete Message"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Portfolio</h3>
                                    <p className="text-gray-500 text-sm mt-1">Manage your showcase projects</p>
                                </div>
                                <button
                                    onClick={() => openProjectModal()}
                                    className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <Plus size={20} />
                                    <span>New Project</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {projects.map((project) => (
                                    <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group flex flex-col">
                                        <div className="relative h-48 overflow-hidden bg-gray-100">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <Briefcase size={40} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 backdrop-blur-[2px]">
                                                <button
                                                    onClick={() => openProjectModal(project)}
                                                    className="p-3 bg-white/90 rounded-full text-black hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    className="p-3 bg-white/90 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white rounded-lg">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-50">
                                                {project.tags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <span className="text-xs text-gray-400 py-1 pl-1">+{project.tags.length - 3}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Project Modal */}
            {isProjectModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {editingProject ? "Edit Project" : "New Project"}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">Fill in the details below to update your portfolio.</p>
                                </div>
                                <button onClick={() => setIsProjectModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={24} className="text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveProject} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Project Title</label>
                                        <input
                                            type="text"
                                            value={projectForm.title}
                                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            placeholder="e.g. Fintech Dashboard"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Category</label>
                                        <select
                                            value={projectForm.category}
                                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            <option>Web</option>
                                            <option>Mobile</option>
                                            <option>Design</option>
                                            <option>E-Commerce</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Project Link</label>
                                    <input
                                        type="url"
                                        value={projectForm.link}
                                        onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Project Image</label>
                                    <div className="space-y-3">
                                        {/* Image Preview */}
                                        {projectForm.image && (
                                            <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                                <img
                                                    src={projectForm.image}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setProjectForm({ ...projectForm, image: "" })}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                                            <div className="flex-1 w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <div className="p-3 bg-blue-50 text-blue-500 rounded-full mb-3">
                                                            <Plus size={24} />
                                                        </div>
                                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                    />
                                                </label>
                                            </div>
                                            <div className="w-full h-px sm:w-px sm:h-32 bg-gray-200"></div>
                                            <div className="w-full sm:w-1/3">
                                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Or use URL</label>
                                                <input
                                                    type="url"
                                                    value={projectForm.image}
                                                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Tags</label>
                                    <input
                                        type="text"
                                        value={projectForm.tags}
                                        onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="React, TypeScript, Supabase (comma separated)"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Description</label>
                                    <textarea
                                        value={projectForm.description}
                                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                        rows={4}
                                        placeholder="Describe the project..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsProjectModalOpen(false)}
                                        className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Saving..." : (editingProject ? "Update Project" : "Create Project")}
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
