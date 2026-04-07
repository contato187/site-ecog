// Use a sintaxe de CommonJS para garantir compatibilidade total na Vercel
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { query } = req.body;
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ text: "Erro: Chave de API não configurada na Vercel." });
    }

    // Usando a rota v1 que confirmamos ser a mais estável
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Você é o NeuroMentor AI da ECOG. Responda: ${query}` }] }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content) {
      const text = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ text });
    }

    return res.status(200).json({ text: "O Google respondeu com um erro. Verifique o saldo no Cloud." });

  } catch (err) {
    return res.status(200).json({ text: "Erro na função da Vercel: " + err.message });
  }
};
