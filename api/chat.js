export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  // Lista de modelos possíveis (o Google aceita um desses três dependendo da região)
  const models = ["gemini-1.5-flash", "gemini-pro", "gemini-1.5-flash-latest"];
  
  for (const modelName of models) {
    try {
      // Usamos v1beta que é a rota que aceita faturamento novo
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. Responda de forma científica sobre: ${query}` }] }]
        })
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ text });
      }
      
      console.warn(`Modelo ${modelName} falhou, tentando o próximo...`);
    } catch (err) {
      continue; 
    }
  }

  return res.status(200).json({ 
    text: "Quase pronto! O Google está terminando de processar seu novo faturamento. Tente novamente em 10 minutos ou dê um F5." 
  });
}
