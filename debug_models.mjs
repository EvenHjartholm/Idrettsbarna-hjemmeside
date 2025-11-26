import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Try to read .env.local manually
let apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    try {
        const envLocalPath = path.resolve('.env.local');
        if (fs.existsSync(envLocalPath)) {
            const envContent = fs.readFileSync(envLocalPath, 'utf-8');
            const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
            if (match && match[1]) {
                apiKey = match[1].trim();
                console.log("Found API key in .env.local");
            }
        }
    } catch (e) {
        console.error("Could not read .env.local:", e);
    }
}

if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    console.error("Please set VITE_GEMINI_API_KEY in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    console.log("Fetching model list via REST API...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            fs.writeFileSync('models_list.txt', "API Error: " + JSON.stringify(data.error, null, 2));
        } else if (data.models) {
            const list = data.models.map(m => m.name).join('\n');
            fs.writeFileSync('models_list.txt', list);
            console.log("Models written to models_list.txt");
        } else {
            fs.writeFileSync('models_list.txt', "No models found. Response: " + JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

listModels();
