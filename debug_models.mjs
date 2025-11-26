import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

async function listModels() {
    console.log("Fetching model list via HTTP...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
        } else if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods})`));
        } else {
            console.log("No models found in response:", data);
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

listModels();
