import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    image: string | null;
    author: string | null;
    created_at: string;
    category: string | null;
    tags: string[] | null;
}

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Blog | Mobintix Infotech"
                description="Insights, updates, and tech trends from the team at Mobintix."
                keywords="blog, tech news, web development, mobile apps, updates"
                url="/blog"
            />

            <section className="bg-black text-white py-20">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Blog</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Latest insights, tutorials, and updates from our team.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8">
                    {posts.length === 0 ? (
                        <div className="text-center text-gray-600">
                            <p className="text-xl">No posts found. Check back later!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-gray-100"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={post.image || 'https://images.unsplash.com/photo-1499750310159-5b5fafef6c3e?auto=format&fit=crop&q=80&w=800'}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-black uppercase tracking-wider">
                                            {post.category || 'Tech'}
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <User size={14} />
                                                <span>{post.author || 'Mobintix Team'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                                            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Read Article <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
