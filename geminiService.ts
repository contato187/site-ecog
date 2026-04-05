import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getEducationalAdvice = async (query: string) => {
  if (!genAI) return "Erro: Chave não configurada na Vercel.";

  // Lista de modelos que o Google aceita (tentaremos um por um)
  const models = ["gemini-1.5-flash", "gemini-pro", "gemini-1.5-flash-latest"];
  
  for (const modelName of models) {
    try {
      console.log(`Tentando modelo: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      // Instruções simplificadas para evitar erros de versão da API
      const prompt = `Você é o NeuroMentor AI da clínica ECOG em Londrina. 
      Responda sobre neuromodulação de forma científica e empática. 
      Não faça diagnósticos. Use negrito em termos técnicos.
      
      Pergunta: ${query}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (text) return text;
    } catch (err) {
      console.error(`Falha no ${modelName}, tentando o próximo...`);
      continue; // Pula para o próximo modelo da lista
    }
  }

  return "Tive um pequeno lapso neural. Por favor, tente novamente em alguns instantes.";
};
