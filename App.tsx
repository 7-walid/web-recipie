
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GeneratorForm from './components/GeneratorForm';
import RecipePost from './components/RecipePost';
import RecipeCard from './components/RecipeCard';
import { generateRecipePost } from './services/geminiService';
import { GeneratorFormData, AppView, BlogPost, DishType, RecipeCategory } from './types';
import { AlertCircle } from 'lucide-react';

// --- MOCK INITIAL DATA ---
const INITIAL_POSTS: BlogPost[] = [
    {
        id: '1',
        title: "The Ultimate Guide to Traditional Chicken Tagine",
        excerpt: "Discover the secret to the most iconic Moroccan dish. Jammy onions, tangy preserved lemons, and fork-tender chicken create a symphony of flavor.",
        content: `
## The Philosophy of this Dish
Tagine is more than just a recipe; it's a method of slow-cooking that coaxes deep, complex flavors from simple ingredients. The conical shape of the tagine pot circulates steam, basting the chicken continuously in its own savory juices.

## Preparation Guide
*   **Prep Time:** 30 mins
*   **Cook Time:** 1 hour 30 mins
*   **Serves:** 4
*   **Difficulty:** Medium

## Ingredients & Sourcing
*   1 whole chicken, cut into pieces
*   3 large onions, finely sliced
*   2 preserved lemons (pulp removed, rind sliced)
*   100g green olives, pitted
*   1 tsp saffron threads
*   1 tsp ground ginger
*   1/2 tsp turmeric
*   Fresh cilantro and parsley

## Step-by-Step Masterclass
1.  **The Marinade (Chermoula):** Mix spices, herbs, and a splash of oil. Rub thoroughly into the chicken. Let it sit for at least 2 hours, ideally overnight. This represents the *soul* of the flavor.
2.  **Building the Base:** In your tagine (or heavy pot), layer half the onions. This creates a 'bed' that prevents the chicken from burning and turns into a luscious sauce.
3.  **The Slow Simmer:** Arrange chicken on the onion bed. Top with remaining onions. Add a small splash of water. Cover and cook on very low heat for 1.5 hours. Do not rush this.
4.  **Finishing Touches:** 15 minutes before serving, add the preserved lemon rinds and olives. These need only to warm through, preserving their bright, tangy punch.

## Chef Fatima's Secrets
*   **Never** add too much water. The onions will release plenty of liquid. A watery tagine is a sad tagine.
*   Use a heat diffuser if cooking on a gas stove to prevent cracking your clay tagine.
`,
        coverImage: 'https://picsum.photos/seed/tagine123/800/600',
        date: 'Oct 12, 2023',
        author: 'Chef Fatima AI',
        tags: [DishType.TAGINE],
        category: RecipeCategory.TRADITIONAL,
        readTime: '8 min'
    },
    {
        id: '2',
        title: "Moroccan Mint Tea: The Ritual of Hospitality",
        excerpt: "It's not just a drink, it's a sign of welcome. Learn the precise art of brewing 'Moroccan Whiskey' with fresh nana mint and gunpowder tea.",
        content: `
## The Philosophy of this Dish
In Morocco, offering tea is mandatory. It signifies friendship and time to pause. The high pour is not just for show—it aerates the tea, creating the prized foam ('reze') on top.

## Preparation Guide
*   **Prep Time:** 5 mins
*   **Cook Time:** 10 mins
*   **Serves:** 6 glasses
*   **Difficulty:** Easy

## Ingredients
*   1 tbsp Gunpowder green tea
*   1 large bunch fresh spearmint (nana)
*   5 tbsp sugar (or to taste - authentic is very sweet!)
*   1 liter boiling water

## Step-by-Step Masterclass
1.  **Rinse the Tea:** Add tea leaves to the pot. Pour in a cup of boiling water, swirl gently, then pour this water out. This cleans the leaves of bitterness 'spirit'.
2.  **The Steep:** Add the fresh mint and sugar on top of the leaves. Fill the pot with boiling water.
3.  **The Boil:** Place the pot directly on medium heat for 2-3 minutes until it just begins to bubble. This caramelizes the sugar slightly.
4.  **The Mix:** Pour one glass of tea, then pour it back into the pot. Repeat 3 times. This ensures uniform flavor without stirring with a spoon, which can bruise the mint.

## Chef Fatima's Secrets
*   Don't break the mint stems too much, or the tea will turn bitter.
*   The higher you pour, the better the foam. Practice makes perfect!
`,
        coverImage: 'https://picsum.photos/seed/minttea456/800/600',
        date: 'Oct 15, 2023',
        author: 'Chef Fatima AI',
        tags: [DishType.TEA],
        category: RecipeCategory.TRADITIONAL,
        readTime: '5 min'
    },
    {
        id: '3',
        title: "Royal Lamb Pastilla for Special Occasions",
        excerpt: "A spectacular sweet and savory pie. Flaky warqa dough encases tender spiced lamb, crunchy almonds, and a dusting of powdered sugar.",
        content: `
## The Philosophy of this Dish
Pastilla is the crowning jewel of Fassi (from Fez) cuisine. It's reserved for weddings and high holidays because of the immense labor involved. It perfectly balances sweet, savory, crunchy, and soft textures.

## Preparation Guide
*   **Prep Time:** 1 hour
*   **Cook Time:** 2 hours
*   **Serves:** 8-10
*   **Difficulty:** Hard

## Ingredients
*   1kg lamb shoulder, bone-in
*   500g phyllo or warqa dough
*   200g blanched almonds, fried and crushed
*   5 onions, diced
*   4 eggs
*   Spices: Ras el hanout, cinnamon, saffron, ginger.
*   Powdered sugar & cinnamon for garnish.

## Step-by-Step Masterclass
[Detailed instructions would go here...]
`,
        coverImage: 'https://picsum.photos/seed/pastilla999/800/600',
        date: 'Oct 25, 2023',
        author: 'Chef Fatima AI',
        tags: [DishType.PASTRY],
        category: RecipeCategory.SPECIAL,
        readTime: '15 min'
    },
     {
        id: '4',
        title: "Modern Vegan Harira Bowl",
        excerpt: "A contemporary, lighter take on the classic soup. Packed with extra vegetables and quinoa instead of vermicelli for a nutritious power lunch.",
        content: `
## The Philosophy of this Dish
While respecting the traditional spice profile of Harira, this modern version adapts to contemporary wellness trends by increasing fiber and removing standard fillers, making it perfect for a weekday lunch.

## Preparation Guide
*   **Prep Time:** 15 mins
*   **Cook Time:** 45 mins
*   **Serves:** 4
*   **Difficulty:** Easy

## Ingredients
*   1 cup quinoa, rinsed
*   1 can chickpeas
*   1 cup sweet potato, cubed
*   Standard Harira tomato base and spices
*   Kale, chopped

## Step-by-Step Masterclass
[Detailed instructions would go here...]
`,
        coverImage: 'https://picsum.photos/seed/veganharira/800/600',
        date: 'Nov 02, 2023',
        author: 'Chef Fatima AI',
        tags: [DishType.SOUP],
        category: RecipeCategory.MODERN,
        readTime: '10 min'
    }
];

const App: React.FC = () => {
    const [view, setView] = useState<AppView>({ type: 'home' });
    const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNavigate = (newView: AppView) => {
        setView(newView);
        setError(null);
        window.scrollTo(0, 0);
    };

    const handleGeneratePost = async (data: GeneratorFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const { title, content, excerpt, detectedDishType } = await generateRecipePost(
                data.dishType,
                data.category,
                data.ingredients,
                data.dietaryRestrictions
            );

            // If user selected a specific type, use that. Otherwise use what AI detected.
            const finalTag = data.dishType !== DishType.OTHER ? data.dishType : detectedDishType;

            const newPost: BlogPost = {
                id: Date.now().toString(),
                title: title,
                excerpt: excerpt,
                content: content,
                coverImage: `https://picsum.photos/seed/${Date.now()}/800/600`,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                author: 'Chef Fatima AI',
                tags: [finalTag],
                category: data.category,
                readTime: `${Math.max(5, Math.ceil(content.length / 1000))} min`
            };

            setPosts(prev => [newPost, ...prev]);
            handleNavigate({ type: 'post', postId: newPost.id });

        } catch (err: any) {
            setError(err.message || "Failed to create the blog post.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- VIEW RENDERING ---

    const renderContent = () => {
        if (view.type === 'home' || view.type === 'category') {
            let displayedPosts = posts;
            let pageTitle = "Latest Guides";

            if (view.type === 'category') {
                displayedPosts = posts.filter(post => post.category === view.category);
                pageTitle = `${view.category} Recipes`;
            }

            return (
                <>
                    {view.type === 'home' && <Hero />}
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="flex items-center justify-between mb-12 border-b border-stone-200 pb-4">
                            <h2 className="text-3xl font-serif font-bold text-stone-900">{pageTitle}</h2>
                            <span className="text-stone-500 font-medium">{displayedPosts.length} posts</span>
                        </div>
                        
                        {displayedPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayedPosts.map(post => (
                                    <RecipeCard 
                                        key={post.id} 
                                        post={post} 
                                        onClick={(id) => handleNavigate({ type: 'post', postId: id })} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
                                <p className="text-xl text-stone-500 font-serif">No recipes found in this category yet.</p>
                                <button 
                                    onClick={() => handleNavigate({ type: 'create' })}
                                    className="mt-4 text-morocco-red font-medium hover:underline"
                                >
                                    Be the first to create one!
                                </button>
                            </div>
                        )}
                    </div>
                </>
            );
        }

        if (view.type === 'create') {
            return (
                <div className="py-8">
                    {error && (
                        <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-r-md">
                            <AlertCircle size={24} />
                            <p>{error}</p>
                        </div>
                    )}
                    <GeneratorForm onGenerate={handleGeneratePost} isLoading={isLoading} />
                </div>
            );
        }

        if (view.type === 'post') {
            const post = posts.find(p => p.id === view.postId);
            if (!post) return <div className="text-center py-20">Post not found.</div>;
            return <RecipePost post={post} onBack={() => handleNavigate({ type: 'home' })} />;
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
            <Header currentView={view} onNavigate={handleNavigate} />
            
            <main className="flex-grow">
                {renderContent()}
            </main>

            <footer className="bg-stone-900 text-stone-400 py-12 text-center border-t border-stone-800 mt-auto">
                <div className="max-w-5xl mx-auto px-4">
                    <p className="font-serif text-2xl text-stone-300 mb-4">Maghreb Bites</p>
                    <div className="flex justify-center gap-6 mb-8">
                         <span className="hover:text-morocco-red cursor-pointer transition-colors">About</span>
                         <span className="hover:text-morocco-red cursor-pointer transition-colors">Contact</span>
                         <span className="hover:text-morocco-red cursor-pointer transition-colors">Privacy</span>
                    </div>
                    <p className="text-sm max-w-md mx-auto leading-relaxed opacity-60">
                        © {new Date().getFullYear()} Maghreb Bites. An AI-powered culinary exploration.
                        Content is generated for inspiration; always taste as you cook.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;
