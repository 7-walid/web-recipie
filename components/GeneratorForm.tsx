
import React, { useState } from 'react';
import { ChefHat, Loader2, Sparkles, Refrigerator } from 'lucide-react';
import { DishType, GeneratorFormData, RecipeCategory } from '../types';

interface GeneratorFormProps {
    onGenerate: (data: GeneratorFormData) => Promise<void>;
    isLoading: boolean;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
    const [formData, setFormData] = useState<GeneratorFormData>({
        ingredients: '',
        dishType: DishType.OTHER,
        category: RecipeCategory.TRADITIONAL,
        dietaryRestrictions: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onGenerate(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 font-sans">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-serif font-bold text-stone-900 flex items-center justify-center gap-3">
                    <Refrigerator className="text-morocco-red" size={32} />
                    Chef's Studio: Al-Kouzina AI
                </h2>
                <p className="text-stone-600 mt-3 max-w-xl mx-auto text-lg">
                    "Al-Kouzina" means "The Kitchen". Tell Chef Fatima what ingredients you have on hand, and she will craft the perfect Moroccan recipe for you.
                </p>
            </div>

            <section className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
                <div className="bg-stone-900 p-4 flex items-center gap-2 text-saffron">
                    <ChefHat size={20} />
                    <span className="font-medium tracking-wide text-sm uppercase">Ingredient Matcher</span>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                    <div>
                        <label htmlFor="ingredients" className="block text-xl font-serif font-bold text-stone-900 mb-3">
                            1. What's in your kitchen right now? <span className="text-morocco-red">*</span>
                        </label>
                        <p className="text-stone-500 text-sm mb-3">
                            List your main proteins, vegetables, or pantry staples. (e.g., "chicken breast, carrots, one sad looking zucchini, canned chickpeas")
                        </p>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            required
                            rows={4}
                            placeholder="I have..."
                            value={formData.ingredients}
                            onChange={handleChange}
                            className="block w-full rounded-xl border-stone-200 shadow-sm focus:border-morocco-red focus:ring-morocco-red text-base p-4 bg-stone-50 resize-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="category" className="block text-lg font-serif font-semibold text-stone-800 mb-3">
                                2. What's your vibe today?
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-stone-200 shadow-sm focus:border-morocco-red focus:ring-morocco-red text-base p-4 bg-stone-50 transition-all"
                            >
                                {Object.values(RecipeCategory).map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dishType" className="block text-lg font-serif font-semibold text-stone-800 mb-3">
                                3. Craving something specific? (Optional)
                            </label>
                            <select
                                id="dishType"
                                name="dishType"
                                value={formData.dishType}
                                onChange={handleChange}
                                className="block w-full rounded-xl border-stone-200 shadow-sm focus:border-morocco-red focus:ring-morocco-red text-base p-4 bg-stone-50 transition-all"
                            >
                                {Object.values(DishType).map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                         <label htmlFor="dietaryRestrictions" className="block font-medium text-stone-700 mb-2">
                            Any dietary needs? (Optional)
                        </label>
                        <input
                            type="text"
                            id="dietaryRestrictions"
                            name="dietaryRestrictions"
                            placeholder="e.g., Gluten-free, no cilantro..."
                            value={formData.dietaryRestrictions}
                            onChange={handleChange}
                            className="block w-full rounded-xl border-stone-200 shadow-sm focus:border-morocco-red focus:ring-morocco-red sm:text-sm p-4 bg-stone-50 transition-all"
                        />
                    </div>

                    <div className="pt-4 border-t border-stone-100">
                        <button
                            type="submit"
                            disabled={isLoading || !formData.ingredients.trim()}
                            className="w-full flex items-center justify-center gap-3 bg-morocco-red hover:bg-red-800 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={24} />
                                    Chef Fatima is thinking...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={24} />
                                    Create My Custom Recipe
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-stone-400 mt-4">
                            Chef Fatima will analyze your ingredients and generate a full guide in ~15 seconds.
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default GeneratorForm;
