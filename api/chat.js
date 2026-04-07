const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Configuração de CORS para o site ECOG
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { query } = req.body;
    
    // Tenta pegar a chave de qualquer uma das variáveis possíveis
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ text: "Erro: A chave de API não foi configurada na Vercel. Verifique as Environment Variables." });
    }

    // URL usando a rota estável v1
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Você é o NeuroMentor AI da ECOG. Responda de forma científica sobre: ${query}` }] }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content) {
      const text = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ text });
    }

    // Se o Google der erro (ex: saldo), ele retorna a mensagem real do Google para sabermos
    const errorMsg = data.error ? data.error.message : "Resposta inválida do Google.";
    return res.status(200).json({ text: "O Google respondeu com erro: " + errorMsg });

  } catch (err) {
    // Aqui impedimos o erro 500. Em vez de quebrar, ele manda o erro pro chat.
    return res.status(200).json({ text: "Erro interno no servidor (Vercel): " + err.message });
  }
};
