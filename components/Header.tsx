
import React, { useState } from 'react';
import { UtensilsCrossed, PenSquare, Menu, X, ChevronDown } from 'lucide-react';
import { AppView, RecipeCategory } from '../types';

interface HeaderProps {
    currentView: AppView;
    onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActiveCategory = (cat: RecipeCategory) => {
        return currentView.type === 'category' && currentView.category === cat;
    };

    const navLinkClasses = (isActive: boolean) => 
        `text-base font-medium transition-colors hover:text-morocco-red ${isActive ? 'text-morocco-red font-semibold' : 'text-stone-600'}`;

    return (
        <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <button 
                    onClick={() => onNavigate({ type: 'home' })}
                    className="flex items-center gap-2 text-morocco-red hover:opacity-80 transition-opacity"
                >
                    <UtensilsCrossed size={26} className="text-terracotta" />
                    <span className="text-2xl font-serif font-bold tracking-tight hidden xs:inline">Maghreb Bites</span>
                    <span className="text-2xl font-serif font-bold tracking-tight xs:hidden">MB</span>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <button 
                        onClick={() => onNavigate({ type: 'home' })}
                        className={navLinkClasses(currentView.type === 'home')}
                    >
                        All Posts
                    </button>
                    <button 
                        onClick={() => onNavigate({ type: 'category', category: RecipeCategory.TRADITIONAL })}
                        className={navLinkClasses(isActiveCategory(RecipeCategory.TRADITIONAL))}
                    >
                        Traditional
                    </button>
                    <button 
                        onClick={() => onNavigate({ type: 'category', category: RecipeCategory.MODERN })}
                        className={navLinkClasses(isActiveCategory(RecipeCategory.MODERN))}
                    >
                        Modern
                    </button>
                    <button 
                        onClick={() => onNavigate({ type: 'category', category: RecipeCategory.SPECIAL })}
                        className={navLinkClasses(isActiveCategory(RecipeCategory.SPECIAL))}
                    >
                        Special Occasion
                    </button>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center">
                    <button 
                        onClick={() => onNavigate({ type: 'create' })}
                        className="flex items-center gap-2 bg-stone-900 text-stone-50 px-4 py-2 rounded-full text-sm font-medium hover:bg-morocco-red transition-colors"
                    >
                        <PenSquare size={16} />
                        <span>Chef's Studio</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-stone-600 p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-stone-200 shadow-lg animate-fade-in z-40">
                    <nav className="flex flex-col p-4 gap-4">
                        <button 
                            onClick={() => { onNavigate({ type: 'home' }); setIsMenuOpen(false); }}
                            className={`text-left py-2 ${navLinkClasses(currentView.type === 'home')}`}
                        >
                            All Posts
                        </button>
                         <button 
                            onClick={() => { onNavigate({ type: 'category', category: RecipeCategory.TRADITIONAL }); setIsMenuOpen(false); }}
                            className={`text-left py-2 ${navLinkClasses(isActiveCategory(RecipeCategory.TRADITIONAL))}`}
                        >
                            Traditional
                        </button>
                        <button 
                            onClick={() => { onNavigate({ type: 'category', category: RecipeCategory.MODERN }); setIsMenuOpen(false); }}
                            className={`text-left py-2 ${navLinkClasses(isActiveCategory(RecipeCategory.MODERN))}`}
                        >
                            Modern
                        </button>
                        <button 
                            onClick={() => { onNavigate({ type: 'category', category: RecipeCategory.SPECIAL }); setIsMenuOpen(false); }}
                            className={`text-left py-2 ${navLinkClasses(isActiveCategory(RecipeCategory.SPECIAL))}`}
                        >
                            Special Occasion
                        </button>
                        <hr className="border-stone-100" />
                        <button 
                            onClick={() => { onNavigate({ type: 'create' }); setIsMenuOpen(false); }}
                            className="flex items-center justify-center gap-2 bg-stone-900 text-stone-50 px-4 py-3 rounded-xl text-base font-medium hover:bg-morocco-red transition-colors"
                        >
                            <PenSquare size={18} />
                            <span>Open Chef's Studio</span>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
