
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * NeuroMentor AI - Serviço de Suporte Educativo (Gemini 3 Pro)
 * Focado em explicações profundas, científicas e acolhedoras sobre neuromodulação.
 */
export const getEducationalAdvice = async (query: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `Você é o "NeuroMentor AI", o assistente de inteligência artificial da ECOG - Neuromodulação e Cognição.
        
        SUA MISSÃO: Atuar na Área Educativa do site para ensinar pacientes e familiares sobre neurociência.
        
        DIRETRIZES:
        1. Tom de Voz: Professor atencioso, altamente científico, ético e empático.
        2. Conhecimento: Especialista em TMS (EMT), tDCS, Neurofeedback e Realidade Virtual aplicada à saúde cerebral.
        3. Ética Médica: Nunca realize diagnósticos ou prescrições. Recomende sempre consulta com especialistas da ECOG.
        4. Disclaimer: Sempre mencione que as informações são educativas e não substituem o aconselhamento médico.
        5. Formatação: Use negrito para destacar conceitos técnicos. Responda em Português do Brasil.`,
        temperature: 0.8,
      },
    });

    const response = await chat.sendMessage({ message: query });
    return response.text;
  } catch (error) {
    console.error("Erro no NeuroMentor AI:", error);
    return "Desculpe, tive uma pequena instabilidade neural ao processar sua dúvida. Pode repetir?";
  }
};
