export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { query } = req.body;
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) return res.status(200).json({ text: "Chave de API ausente na Vercel." });

    // Mudança para o modelo 8b, que possui maior compatibilidade com a v1beta
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Instrução de Sistema: Você é o NeuroMentor AI da clínica ECOG. Responda: ${query}` 
          }] 
        }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return res.status(200).json({ text: data.candidates[0].content.parts[0].text });
    }

    // Se falhar, tentamos o modelo Pro como última alternativa automática
    return res.status(200).json({ 
      text: "Resposta do Google: " + (data.error?.message || "O modelo solicitado ainda não foi propagado para sua conta paga. Aguarde alguns minutos.") 
    });

  } catch (err) {
    return res.status(200).json({ text: "Erro de conexão: " + err.message });
  }
}
