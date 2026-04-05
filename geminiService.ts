import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * SERVIÇO NEUROMENTOR AI - CLÍNICA ECOG
 * Versão Blindada contra Erro 404
 */

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getEducationalAdvice = async (query: string) => {
  try {
    if (!genAI || !apiKey) {
      console.warn("NeuroMentor: Chave de API ausente.");
      return "O sistema educativo está em manutenção técnica. Por favor, verifique a chave na Vercel.";
    }

    // Usamos o modelo 1.5-flash-latest que é o mais compatível
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // Colocamos as instruções de sistema DIRETO no prompt para evitar o erro 404
    const systemInstruction = `Você é o "NeuroMentor AI" da ECOG em Londrina. 
    Responda como um professor atencioso e científico. 
    Foco em TMS, tDCS e Neurofeedback. 
    NUNCA faça diagnósticos. Recomende o Dr. Breno. 
    Use negrito em termos técnicos. 
    Sempre diga que a info é educativa.`;

    const prompt = `${systemInstruction}\n\nPergunta do Paciente: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("Resposta vazia.");

    return text;

  } catch (error: any) {
    console.error("Erro crítico no NeuroMentor:", error);
    
    // Fallback: Se o modelo acima falhar, tentamos o 'gemini-pro' que é o mais antigo e estável
    try {
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
        const fallbackResult = await fallbackModel.generateContent(query);
        return fallbackResult.response.text();
    } catch (e) {
        return "Tive um pequeno lapso neural. Por favor, tente novamente em instantes.";
    }
  }
};
