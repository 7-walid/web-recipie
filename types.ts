
export enum DishType {
    OTHER = 'Surprise Me (Chef\'s Choice)',
    TAGINE = 'Tagine',
    COUSCOUS = 'Couscous',
    SOUP = 'Soup (Harira/Chorba)',
    PASTRY = 'Pastry (Bastilla/Briouat)',
    BREAD = 'Bread (Khobz/Msemen)',
    SALAD = 'Moroccan Salad',
    DESSERT = 'Dessert',
    TEA = 'Mint Tea & Accompaniments',
}

export enum RecipeCategory {
    TRADITIONAL = 'Traditional',
    MODERN = 'Modern Twist',
    SPECIAL = 'Special Occasion'
}

export interface RecipeState {
    isLoading: boolean;
    content: string | null;
    error: string | null;
    generatedTitle: string | null;
}

export interface GeneratorFormData {
    dishType: DishType;
    category: RecipeCategory;
    ingredients: string;
    dietaryRestrictions: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    date: string;
    author: string;
    tags: DishType[];
    category: RecipeCategory;
    readTime: string;
}

export type AppView = 
    | { type: 'home' }
    | { type: 'create' }
    | { type: 'post', postId: string }
    | { type: 'category', category: RecipeCategory };
