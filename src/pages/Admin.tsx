import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
    Trash2, Edit, Plus, X, LogOut, MessageSquare, Briefcase,
    LayoutDashboard, Search, ChevronRight, User, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
    id: number;
    created_at: string;
    name: string;
    email: string;
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
    const [sidebarOpen] = useState(true);

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
        if (data) setMessages(data);
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
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Mobintix <span className="text-blue-400">Admin</span></h1>
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
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="h-full flex flex-col">
                    <div className="h-20 flex items-center px-8 border-b border-gray-800">
                        <h1 className="text-xl font-bold tracking-wider">Mobintix<span className="text-blue-500">.</span></h1>
                    </div>

                    <nav className="flex-1 px-4 py-8 space-y-2">
                        {[
                            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                            { id: 'messages', icon: MessageSquare, label: 'Messages' },
                            { id: 'projects', icon: Briefcase, label: 'Projects' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
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
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                            <User size={20} className="text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Admin</span>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-8">

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Stats Card 1 */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-blue-50 rounded-xl">
                                            <Briefcase className="text-blue-600" size={24} />
                                        </div>
                                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">+12%</span>
                                    </div>
                                    <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
                                    <p className="text-3xl font-bold text-gray-800 mt-1">{projects.length}</p>
                                </div>

                                {/* Stats Card 2 */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-purple-50 rounded-xl">
                                            <MessageSquare className="text-purple-600" size={24} />
                                        </div>
                                        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">New</span>
                                    </div>
                                    <h3 className="text-gray-500 text-sm font-medium">Messages</h3>
                                    <p className="text-3xl font-bold text-gray-800 mt-1">{messages.length}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                                <div className="text-gray-500 text-sm">System functioning normally. API connections to Supabase active.</div>
                            </div>
                        </div>
                    )}

                    {/* MESSAGES TAB */}
                    {activeTab === 'messages' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800">Inbox</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search messages..."
                                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {messages.length === 0 ? (
                                <div className="p-12 text-center text-gray-400">
                                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>No messages yet.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50/50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Message</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {messages.map((msg) => (
                                                <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(msg.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-900">{msg.name}</span>
                                                            <span className="text-xs text-gray-400">{msg.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {msg.subject}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <button
                                                            onClick={() => handleDeleteMessage(msg.id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                            title="Delete Message"
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
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800">Portfolio Items</h3>
                                <button
                                    onClick={() => openProjectModal()}
                                    className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <Plus size={20} />
                                    <span>New Project</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {projects.map((project) => (
                                    <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                                <button
                                                    onClick={() => openProjectModal(project)}
                                                    className="p-2 bg-white rounded-full text-black hover:bg-blue-500 hover:text-white transition-colors"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    className="p-2 bg-white rounded-full text-black hover:bg-red-500 hover:text-white transition-colors"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{project.category}</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{project.title}</h4>
                                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
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
                        <div className="p-8">
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
                                <div className="grid grid-cols-2 gap-6">
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

                                        <div className="flex gap-4 items-center">
                                            <div className="flex-1">
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
                                            <div className="w-px h-32 bg-gray-200"></div>
                                            <div className="w-1/3">
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
