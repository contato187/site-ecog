import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * SERVIÇO NEUROMENTOR AI - CLÍNICA ECOG
 * Versão robusta e otimizada para o modelo Gemini 1.5 Flash
 */

// Puxando a chave de API da Vercel (VITE_ é obrigatório para o Vite ler)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

// Só cria a instância se a chave existir para evitar erros fatais na inicialização
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getEducationalAdvice = async (query: string) => {
  try {
    // 1. Verificação de segurança da chave
    if (!genAI || !apiKey) {
      console.warn("NeuroMentor: Chave de API não encontrada ou inválida.");
      return "O sistema educativo está em manutenção técnica momentânea. Por favor, entre em contato com a ECOG pelo WhatsApp para orientações diretas.";
    }

    // 2. Seleção do Modelo Estável (1.5 Flash é o ideal para sites rápidos)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `Você é o "NeuroMentor AI", o assistente de inteligência artificial da ECOG - Neuromodulação e Cognição em Londrina.
        
        SUA MISSÃO: Atuar na Área Educativa do site para ensinar pacientes e familiares sobre neurociência de forma clara, empática e científica.
        
        DIRETRIZES DE RESPOSTA:
        1. Tom de Voz: Professor atencioso, altamente científico, ético e empático.
        2. Foco: TMS (EMT), tDCS, Neurofeedback e Realidade Virtual aplicada à saúde cerebral.
        3. Ética: Nunca realize diagnósticos ou prescrições. Recomende sempre consulta com o Dr. Breno ou especialistas da ECOG.
        4. Disclaimer: Sempre mencione que as informações são educativas e não substituem o aconselhamento médico.
        5. Formatação: Use negrito para destacar conceitos técnicos. Responda em Português do Brasil de forma concisa.`,
    });

    // 3. Execução da consulta com timeout/segurança
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: query }] }],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    // 4. Extração segura do texto
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("O modelo retornou uma resposta vazia.");
    }

    return text;

  } catch (error: any) {
    console.error("Erro crítico no NeuroMentor AI:", error);
    
    // Tratamento de erros comuns para o usuário
    if (error.message?.includes("API key not found")) {
      return "Erro de configuração: Chave de acesso não detectada. Por favor, verifique as configurações na Vercel.";
    }
    
    return "Tive um pequeno lapso neural ao processar sua dúvida. Pode repetir a pergunta, por favor?";
  }
};
