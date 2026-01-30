import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import { ArrowLeft, User, Calendar, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string | null;
    image: string | null;
    author: string | null;
    created_at: string;
    category: string | null;
    tags: string[] | null;
}

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) fetchPost(slug);
    }, [slug]);

    const fetchPost = async (slug: string) => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;
            if (data) setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error);
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

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <Link to="/blog" className="text-blue-600 hover:underline">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-20">
            <SEO
                title={`${post.title} | Mobintix Blog`}
                description={post.excerpt || undefined}
                keywords={post.tags?.join(', ') || 'blog, tech'}
                url={`/blog/${post.slug}`}
                image={post.image || undefined}
            />

            <article className="max-w-4xl mx-auto px-4 md:px-8 py-10">
                <Link
                    to="/blog"
                    className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                <div className="mb-8">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wide">
                        {post.category || 'Tech'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-black mt-4 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-blue-500" />
                            <span>{post.author || 'Mobintix Team'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-500" />
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {post.image && (
                    <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl aspect-video relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags?.map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-black mb-2">Share this article</h3>
                            <p className="text-gray-500 text-sm">Spread the knowledge with your network</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }}
                                className="bg-white p-3 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all text-gray-700"
                                title="Copy Link"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </article >
        </div >
    );
};

export default BlogPost;
