const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

export async function run(message: Object) {
  // For text-only input, use the gemini-pro model

  console.log("message", message);

  const modelsAvailable = ["gemini-pro", "gemini-pro-vision"];

  const modelChoice =
    Object.keys(message).length === 1 ? modelsAvailable[0] : modelsAvailable[1];

  console.log("modelChoice", modelChoice);

  const model = genAI.getGenerativeModel({ model: modelChoice });

  if (modelChoice === "gemini-pro-vision") {
  } else {
    const prompt = (message as { text: string }).text;

    console.log("prompt", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.respone;
    const text = response.text();

    return text;
  }
}
