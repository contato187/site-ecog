import { GoogleGenerativeAI } from "@google/generative-ai";

// Puxando exatamente o nome da variável que você criou na imagem
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getEducationalAdvice = async (query: string) => {
  if (!genAI) return "O sistema está iniciando a conexão. Tente em instantes.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Você é o NeuroMentor AI da clínica ECOG em Londrina. Responda de forma científica e empática. Pergunta: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error(err);
    return "Tive um pequeno lapso neural. Por favor, tente novamente.";
  }
};
