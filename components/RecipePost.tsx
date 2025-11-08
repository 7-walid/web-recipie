import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';

interface RecipePostProps {
    post: BlogPost;
    onBack: () => void;
}

const RecipePost: React.FC<RecipePostProps> = ({ post, onBack }) => {
    return (
        <article className="bg-stone-50 min-h-screen animate-fade-in">
            {/* Hero Section of the Post */}
            <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
                <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>
                
                <div className="absolute inset-0 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12 sm:pb-16">
                    <button 
                        onClick={onBack}
                        className="absolute top-8 left-4 sm:left-8 text-white/80 hover:text-white flex items-center gap-2 transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
                    >
                        <ArrowLeft size={18} /> Back to Blog
                    </button>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-saffron text-stone-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight mb-6">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-stone-300 text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                             <div className="h-8 w-8 rounded-full bg-terracotta flex items-center justify-center text-white font-serif font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <span className="font-medium text-white">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{post.readTime} read</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="prose prose-lg prose-stone max-w-none 
                    prose-headings:font-serif prose-headings:text-morocco-red 
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:pb-4 prose-h2:border-b prose-h2:border-stone-200
                    prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-2xl prose-img:shadow-lg
                    prose-strong:text-stone-900 prose-strong:font-bold
                    prose-li:marker:text-saffron"
                >
                    <ReactMarkdown
                        components={{
                             blockquote: ({node, ...props}) => (
                                <blockquote className="border-l-4 border-saffron pl-6 py-4 my-8 bg-white italic text-xl text-stone-700 shadow-sm rounded-r-lg" {...props} />
                             )
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                 {/* Author Box Footer */}
                <div className="mt-16 p-8 bg-white rounded-2xl border border-stone-100 shadow-sm flex items-start gap-6">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-morocco-red flex-shrink-0 flex items-center justify-center text-white font-serif font-bold text-3xl">
                        F
                    </div>
                    <div>
                        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">About Chef Fatima</h3>
                        <p className="text-stone-600 leading-relaxed">
                            Fatima is an AI culinary historian and chef dedicated to preserving and sharing the rich tapestry of Moroccan cuisine. 
                            She combines traditional knowledge with modern precision to bring authentic Maghreb flavors to kitchens worldwide.
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default RecipePost;
