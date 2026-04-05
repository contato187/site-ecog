import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * NeuroMentor AI - ECOG
 * Configuração robusta para evitar tela branca na Vercel
 */

// Tentamos pegar a chave da Vercel. Se não encontrar, deixamos vazio em vez de dar erro.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

// Só criamos a instância se a chave existir, evitando o erro "API Key must be set"
let genAI: any = null;
if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
}

export const getEducationalAdvice = async (query: string) => {
  try {
    if (!genAI) {
      console.warn("NeuroMentor: API Key não detectada.");
      return "O assistente está em modo de leitura. Para dúvidas específicas, entre em contato pelo WhatsApp.";
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Modelo atualizado e super rápido
      systemInstruction: `Você é o "NeuroMentor AI", o assistente de inteligência artificial da ECOG - Neuromodulação e Cognição em Londrina.
        
        SUA MISSÃO: Ensinar pacientes e familiares sobre neurociência e tratamentos.
        
        DIRETRIZES:
        1. Tom de Voz: Professor atencioso, científico e empático.
        2. Especialidade: TMS (EMT), tDCS, Neurofeedback e Realidade Virtual.
        3. Ética: Nunca faça diagnósticos. Recomende sempre os especialistas da ECOG.
        4. Disclaimer: Informe que as respostas são educativas.
        5. Formatação: Use negrito para termos técnicos.`,
    });

    const result = await model.generateContent(query);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Erro no NeuroMentor:", error);
    return "Tive um pequeno lapso neural. Poderia repetir a pergunta?";
  }
};
