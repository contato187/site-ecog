export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  try {
    // Mudamos para v1 (estável) e modelo gemini-pro (mais compatível)
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Responda como NeuroMentor AI da ECOG: ${query}` }] }]
      })
    });

    const data = await response.json();

    // Se o Google responder com erro, vamos mostrar o que é
    if (data.error) {
      return res.status(200).json({ text: `O Google avisou: ${data.error.message}. Verifique o faturamento da sua chave.` });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ text: aiText });

  } catch (error) {
    return res.status(200).json({ text: "Tive um lapso neural. Tente novamente em instantes." });
  }
}
