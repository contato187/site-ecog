import { GoogleGenerativeAI } from "@google/genai";

// O Vite exige 'import.meta.env' e o prefixo 'VITE_' para enxergar a chave
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * NeuroMentor AI - Serviço de Suporte Educativo (Gemini 3 Flash)
 * Focado em explicações profundas, científicas e acolhedoras sobre neuromodulação.
 */
export const getEducationalAdvice = async (query: string) => {
  try {
    // Verificação de segurança para não travar o site se a chave falhar
    if (!apiKey) {
      console.warn("API Key não configurada. O chat ficará desativado.");
      return "O assistente está em manutenção técnica. Por favor, entre em contato conosco pelo WhatsApp.";
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash", // Versão estável e rápida
      systemInstruction: `Você é o "NeuroMentor AI", o assistente de inteligência artificial da ECOG - Neuromodulação e Cognição.
        
        SUA MISSÃO: Atuar na Área Educativa do site para ensinar pacientes e familiares sobre neurociência.
        
        DIRETRIZES:
        1. Tom de Voz: Professor atencioso, altamente científico, ético e empático.
        2. Conhecimento: Especialista em TMS (EMT), tDCS, Neurofeedback e Realidade Virtual aplicada à saúde cerebral.
        3. Ética Médica: Nunca realize diagnósticos ou prescrições. Recomende sempre consulta com especialistas da ECOG.
        4. Disclaimer: Sempre mencione que as informações são educativas e não substituem o aconselhamento médico.
        5. Formatação: Use negrito para destacar conceitos técnicos. Responda em Português do Brasil.`,
    });

    const result = await model.generateContent(query);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Erro no NeuroMentor AI:", error);
    return "Desculpe, tive uma pequena instabilidade neural ao processar sua dúvida. Pode repetir?";
  }
};
