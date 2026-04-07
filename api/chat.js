export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { query } = req.body;
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ text: "Erro: Chave não encontrada na Vercel." });
    }

    // Usando o fetch nativo do Node.js (mais moderno e não precisa de require)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Você é o NeuroMentor AI da ECOG. Responda: ${query}` }] }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content) {
      return res.status(200).json({ text: data.candidates[0].content.parts[0].text });
    }

    return res.status(200).json({ text: "O Google respondeu, mas sem conteúdo. Verifique o saldo." });

  } catch (err) {
    // Isso evita o erro 500 no navegador e mostra o erro real no chat
    return res.status(200).json({ text: "Erro na Vercel: " + err.message });
  }
}
