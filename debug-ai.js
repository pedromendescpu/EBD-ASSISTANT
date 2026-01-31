import fs from 'fs';

const API_KEY = "AIzaSyCll_csKXC0BakfjZAqaCpRQiD5dDYF-3E";

async function findWorkingModel() {
    console.log("Fetching available models from Google API...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
            return;
        }

        const models = data.models || [];
        console.log(`Found ${models.length} models total.`);

        const generateModels = models
            .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name.replace("models/", ""));

        fs.writeFileSync('models.txt', generateModels.join('\n'));
        console.log("Models written to models.txt");
        console.log("First 3 models:", generateModels.slice(0, 3));

    } catch (error) {
        console.error("Network Error:", error);
    }
}

findWorkingModel();
