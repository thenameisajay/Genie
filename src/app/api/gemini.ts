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

    const messageSize = Object.keys(message).length;
    const isGenerationConfigPresent =
        generationConfig && Object.keys(generationConfig).length > 0;

    const modelChoice =
        messageSize === 1 ? modelsAvailable[0] : modelsAvailable[1];

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
