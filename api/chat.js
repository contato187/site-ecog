import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS - Permitir conexões do seu próprio site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Garantir que a query chegue corretamente
    const query = req.body.query;
    
    // Na Vercel, usamos process.env para ler a variável de ambiente
    const apiKey = process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Chave de API não encontrada no servidor.");
      return res.status(500).json({ text: "Erro interno: Chave de API não configurada." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Você é o NeuroMentor AI da clínica ECOG em Londrina. 
    Responda sobre neuromodulação (TMS, tDCS, Neurofeedback) de forma científica e acolhedora. 
    Não faça diagnósticos. Pergunta: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });

  } catch (error) {
    console.error("Erro no processamento da IA:", error);
    // Retorna o erro detalhado para ajudar no diagnóstico final
    return res.status(500).json({ text: "Tive um lapso neural no processamento.", details: error.message });
  }
}
