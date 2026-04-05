import { GoogleGenerativeAI } from "@google/generative-ai";

// Puxa a chave da Vercel
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getEducationalAdvice = async (query: string) => {
  if (!genAI) {
    return "Aguardando conexão com o servidor... Tente em instantes.";
  }

  try {
    // Forçamos o uso do modelo estável sem prefixos problemáticos
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Instrução integrada no prompt para evitar erros de sistema
    const fullPrompt = `Você é o NeuroMentor AI da clínica ECOG (Londrina). 
    Responda sobre neuromodulação de forma científica e acolhedora. 
    NUNCA faça diagnósticos. Use negrito em termos técnicos.
    
    Pergunta do paciente: ${query}`;

    // Usamos a chamada mais simples e direta possível
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text || "Tive um lapso na resposta. Pode repetir?";

  } catch (error: any) {
    console.error("Erro na IA:", error);
    
    // Fallback: Se o 1.5-flash der 404, tentamos o 'gemini-pro' (que é o mais antigo e estável)
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      const fallbackResult = await fallbackModel.generateContent(query);
      return fallbackResult.response.text();
    } catch (e) {
      return "Tive um pequeno lapso neural. Por favor, tente novamente em alguns instantes.";
    }
  }
};
