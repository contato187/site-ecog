import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Configuração para permitir que seu site fale com essa API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { query } = req.body;
  
  // No servidor, acessamos a chave sem o prefixo VITE_ se preferir, 
  // mas vamos usar o que você já configurou para garantir:
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ text: "Erro: Chave não configurada no servidor." });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const prompt = `Você é o NeuroMentor AI da clínica ECOG em Londrina. 
    Responda sobre neuromodulação de forma científica e empática. 
    Pergunta: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return res.status(200).json({ text: response.text() });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ text: "Tive um lapso neural no servidor." });
  }
}
