const { VertexAI } = require("@google-cloud/vertexai");

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({
  project: "pics-392621",
  location: "us-central1",
});
const model = "gemini-pro-vision";

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generation_config: {
    max_output_tokens: 2048,
    temperature: 0.4,
    top_p: 1,
    top_k: 32,
  },
});

export async function generateContent(message: object) {
  const req = {
    // This is where you specify the input text or the image in terms of objects
    contents: [{ role: "user", parts: [] }],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  for await (const item of streamingResp.stream) {
    process.stdout.write("stream chunk: " + item);
  }

  process.stdout.write(
    "aggregated response: " + (await streamingResp.response)
  );
}
