"use server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function run(
  message: Object,
  apikey: string,
  generationConfig?: Object
) {
  const genAI = new GoogleGenerativeAI(apikey || process.env.GEMINI_API_KEY);

  const modelsAvailable = ["gemini-pro", "gemini-pro-vision"];

  const modelChoice =
    Object.keys(message).length === 1 ? modelsAvailable[0] : modelsAvailable[1];

  const model = genAI.getGenerativeModel(
    { model: modelChoice },
    generationConfig && Object.keys(generationConfig).length > 0
      ? generationConfig
      : undefined
  );

  if (modelChoice === "gemini-pro-vision") {
    const prompt = (message as { text: string }).text;

    const { imageParts } = message as { imageParts: Array<Object> };

    const result = await model.generateContent([prompt, ...imageParts]);

    console.log("From the API  RESULT = ", result);

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
