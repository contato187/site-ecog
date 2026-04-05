export default async function handler(req, res) {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ text: "Chave não configurada no servidor." });
  }

  try {
    // Chamada DIRETA para a API do Google (sem depender de biblioteca)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. 
              Responda sobre neuromodulação de forma científica e empática. 
              Pergunta do paciente: ${query}`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error("Erro do Google:", data.error);
      return res.status(500).json({ text: "Erro na comunicação com o cérebro da IA.", details: data.error.message });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ text: aiResponse });

  } catch (error) {
    console.error("Erro fatal na API:", error);
    return res.status(500).json({ text: "Tive um lapso neural no servidor.", error: error.message });
  }
}
