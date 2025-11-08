
import { GoogleGenAI } from "@google/genai";
import { DishType, RecipeCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipePost = async (
    dishType: DishType,
    category: RecipeCategory,
    ingredients: string,
    dietary: string
): Promise<{ title: string, content: string, excerpt: string, detectedDishType: DishType }> => {
    const model = 'gemini-2.5-flash';

    const systemInstruction = `You are "Fatima", an expert Moroccan chef and food historian running the popular food blog "Maghreb Bites". 
    Your goal is to take a user's available ingredients and write the *ultimate guide* for a Moroccan dish that uses them best.
    Your writing style is warm, welcoming, passionate, and authoritative. You want the reader to not just cook, but to understand the *soul* of the dish.
    Use evocative language (e.g., "fragrant saffron," "earthy cumin," "jammy onions").
    Format the output as a structured Markdown blog post. Use standard markdown headers (#, ##, ###), bolding for emphasis, and bullet points.
    Do NOT include a preamble.
    `;

    let prompt = `The user has the following ingredients available in their kitchen: "${ingredients}".
    
    Task: Create a comprehensive, ultimate guide blog post for a Moroccan dish that primarily uses these ingredients.
    assume they have basic pantry staples (olive oil, salt, pepper, water, onions, garlic). If they are missing crucial authentic Moroccan ingredients (like preserved lemon, smen, or specific spice blends like Ras el Hanout), suggest the best possible accessible substitutes in the 'Ingredients' section so they can still make it today.
    `;
    
    if (dishType !== DishType.OTHER) {
         prompt += ` Try to make this a ${dishType} dish if possible with the given ingredients.`;
    } else {
        prompt += ` Choose the most appropriate traditional Moroccan dish type (Tagine, Salad, Soup, etc.) based *strictly* on the ingredients provided.`;
    }

    // Inject Category specific instructions
    switch (category) {
        case RecipeCategory.TRADITIONAL:
            prompt += ` The style must be strictly TRADITIONAL authentic, as prepared by grandmothers in Morocco. Emphasize heritage.`;
            break;
        case RecipeCategory.MODERN:
            prompt += ` The style should be a MODERN interpretation. Feel free to use fusion elements, modern plating techniques, or accessible ingredient substitutions while keeping the Moroccan soul.`;
            break;
        case RecipeCategory.SPECIAL:
            prompt += ` This is intended as a SPECIAL OCCASION dish. Make it sound elaborate, luxurious, and impressive, even if the ingredients are simple.`;
            break;
    }

    if (dietary.trim()) {
        prompt += ` STRICTLY adhere to these dietary needs: ${dietary}.`;
    }

    prompt += `
    The blog post must strictly follow this structure. ensure you DO NOT add the field names (like "Title:", "Excerpt:") in the final output, just the content.
    
    # [Engaging, Authentic Title based on the created dish]
    
    [An engaging cultural introduction and personal story - approx 200 words. Why is this specific combination of ingredients meaningful in Moroccan cuisine? e.g. "Making do with what the souk has today"]

    ## The Philosophy of this Dish
    [Explain the key flavor profile and why these ingredients work together in a Moroccan context]

    ## Preparation Guide
    *   **Prep Time:** [Time]
    *   **Cook Time:** [Time]
    *   **Total Time:** [Time]
    *   **Serves:** [Number]
    *   **Difficulty:** [Easy/Medium/Hard]

    ## Ingredients & Sourcing
    [List ingredients with metric measurements. Crucial: Add notes on SUBSTITUTES for missing authentic ingredients based on what the user DIDN'T list.]

    ## Step-by-Step Masterclass
    [Detailed, numbered cooking instructions. NOT just "add onions". EXPLAIN: "Sauté the onions on low heat for 15 minutes until they are translucent and jammy—this base is crucial for the sauce's sweetness."]

    ## Chef Fatima's Secrets for Success
    [3 bullet points of expert advice specific to this recipe]

    ## How to Serve
    [Traditional serving suggestions, what bread to pair it with, traditional etiquette]

    ---
    [END OF POST]

    Finally, at the very end of your response, add a separator "|||" followed by a 2-sentence catchy excerpt for the blog home page.
    AFTER the excerpt, add another separator "|||" followed by ONE word that best categorizes this dish from this list: [Tagine, Couscous, Soup, Pastry, Bread, Salad, Dessert, Tea]. If none fit perfectly, choose the closest one.
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.75,
            }
        });

        const fullText = response.text;
        const parts = fullText.split('|||');
        let content = parts[0].trim();
        const excerpt = parts.length > 1 ? parts[1].trim() : "Experience the authentic flavors of Morocco with this personalized guide.";
        
        // Default to Tagine if detection fails, or try to map the returned string to our enum
        let detectedDishType = DishType.TAGINE;
        if (parts.length > 2) {
            const rawType = parts[2].trim();
            // Simple loose matching to our DishType values
            const match = Object.values(DishType).find(v => v.toLowerCase().includes(rawType.toLowerCase()));
            if (match && match !== DishType.OTHER) {
                detectedDishType = match;
            }
        }

        // Extract title from the first line if it starts with #
        let title = "Authentic Moroccan Recipe";
        const titleMatch = content.match(/^#\s*(.+)/);
        if (titleMatch) {
            title = titleMatch[1].trim();
            content = content.replace(/^#\s*(.+)/, '').trim();
        }

        return { title, content, excerpt, detectedDishType };
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Chef Fatima couldn't quite make out those ingredients. Please try again.");
    }
};
