
import React from 'react';
import { Clock } from 'lucide-react';
import { BlogPost } from '../types';

interface RecipeCardProps {
    post: BlogPost;
    onClick: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ post, onClick }) => {
    return (
        <article 
            className="group cursor-pointer flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 overflow-hidden"
            onClick={() => onClick(post.id)}
        >
            <div className="relative h-56 overflow-hidden">
                <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                     <span className="inline-block bg-white/90 backdrop-blur-sm text-morocco-red text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.tags[0]}
                    </span>
                </div>
                 <div className="absolute bottom-4 left-4">
                     <span className="inline-block bg-stone-900/80 backdrop-blur-sm text-saffron text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                    </span>
                </div>
            </div>
            <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 group-hover:text-morocco-red transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                    </p>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-terracotta flex items-center justify-center text-white font-serif font-bold">
                            {post.author.charAt(0)}
                        </div>
                        <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default RecipeCard;
