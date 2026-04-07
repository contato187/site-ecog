export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { query } = req.body;
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) return res.status(200).json({ text: "Erro: Chave de API não configurada na Vercel." });

    // Tentamos o Flash 1.5, o Flash 2.0 (o seu do print) e o Pro
    const models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
    let googleResponse = null;

    for (const model of models) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. Responda de forma científica e acolhedora sobre: ${query}` }] }]
          })
        });
        
        googleResponse = await response.json();
        
        // Se este modelo responder com sucesso, paramos e entregamos o texto
        if (googleResponse.candidates && googleResponse.candidates[0]?.content?.parts?.[0]?.text) {
          return res.status(200).json({ text: googleResponse.candidates[0].content.parts[0].text });
        }
      } catch (e) {
        continue;
      }
    }

    // Se nenhum modelo funcionar, mostramos o erro real do Google para depuração
    const errorMsg = googleResponse?.error?.message || "O Google ainda está processando seu saldo de R$ 69,05. Tente novamente em 20 minutos.";
    return res.status(200).json({ text: "NeuroMentor online: " + errorMsg });

  } catch (err) {
    return res.status(200).json({ text: "Erro de processamento: " + err.message });
  }
}
