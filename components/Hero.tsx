import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="relative bg-stone-900 overflow-hidden">
             {/* Abstract Moroccan tile pattern overlay approximation using CSS gradients/opacity */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-saffron via-morocco-red to-majorelle-blue mix-blend-overlay"></div>
            
            <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white tracking-tight mb-6">
                    The Soul of <span className="text-saffron">Moroccan</span> Kitchen
                </h1>
                <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Welcome to my kitchen. Explore the rich aromas of cumin, saffron, and preserved lemons. 
                    Let AI craft a personalized, authentic recipe just for you today.
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                   <span className="inline-flex items-center rounded-full bg-morocco-red/20 px-3 py-1 text-sm font-medium text-morocco-red ring-1 ring-inset ring-morocco-red/30">Authentic Flavors</span>
                   <span className="inline-flex items-center rounded-full bg-saffron/20 px-3 py-1 text-sm font-medium text-saffron ring-1 ring-inset ring-saffron/30">AI Powered Chef</span>
                   <span className="inline-flex items-center rounded-full bg-majorelle-blue/20 px-3 py-1 text-sm font-medium text-blue-300 ring-1 ring-inset ring-majorelle-blue/30">Culturally Rich</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;
