'use server';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleGenerativeAI } = require('@google/generative-ai');

export async function run(
    message: object,
    apikey: string,
    generationConfig?: object,
) {
    const genAI = new GoogleGenerativeAI(apikey || process.env.GEMINI_API_KEY);

    const modelsAvailable = ['gemini-pro', 'gemini-pro-vision'];

    const isGenerationConfigPresent =
        generationConfig && Object.keys(generationConfig).length > 0;

    const modelChoice = selectModel(message, modelsAvailable);

    const model = genAI.getGenerativeModel(
        { model: modelChoice },
        isGenerationConfigPresent ? generationConfig : undefined,
    );

    let result;
    const prompt = (message as { text: string }).text;

    if (modelChoice === 'gemini-pro-vision') {
        const { imageParts } = message as { imageParts: Array<object> };
        result = await model.generateContent([prompt, ...imageParts]);
    } else {
        result = await model.generateContent(prompt);
    }

    const response = await result?.response;

    const text = response?.text();

    return text;
}

function selectModel(message: object, modelsAvailable: Array<string>) {
    const messageSize = Object.keys(message).length;
    return messageSize === 1 ? modelsAvailable[0] : modelsAvailable[1];
}
