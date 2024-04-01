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

    const modelChoice =
        Object.keys(message).length === 1
            ? modelsAvailable[0]
            : modelsAvailable[1];

    const model = genAI.getGenerativeModel(
        { model: modelChoice },
        generationConfig && Object.keys(generationConfig).length > 0
            ? generationConfig
            : undefined,
    );

    if (modelChoice === 'gemini-pro-vision') {
        const prompt = (message as { text: string }).text;

        const { imageParts } = message as { imageParts: Array<object> };

        const result = await model.generateContent([prompt, ...imageParts]);

        console.log('From the API  RESULT = ', result);

        const response = await result.response;
        const text = response?.text();

        return text;
    } else {
        const prompt = (message as { text: string }).text;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        const text = response?.text();

        return text;
    }
}
