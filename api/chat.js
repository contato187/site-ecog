export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  // Atualizei a lista com os modelos que o Google liberou no seu painel pago
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
  
  for (const modelName of models) {
    try {
      // Mudamos para v1 (estável) e usamos o modelo que funcionou no seu teste
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. Responda de forma científica sobre: ${query}` }] }]
        })
      });

      const data = await response.json();

      // Se o Google responder erro de faturamento ou limite, ele pula para o próximo modelo
      if (data.candidates && data.candidates[0]?.content) {
        const text = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ text });
      }
      
      console.warn(`Modelo ${modelName} falhou:`, data.error?.message || "Sem resposta");
    } catch (err) {
      continue; 
    }
  }

  // Se chegar aqui, é porque nenhum modelo respondeu. 
  // Vou mudar a frase para sabermos se o erro ainda é o mesmo.
  return res.status(200).json({ 
    text: "O sistema está online, mas o Google ainda está propagando seu saldo. Tente novamente em alguns minutos." 
  });
}
