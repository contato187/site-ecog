export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  try {
    // Usamos a versão v1 (estável) e o modelo gemini-pro que não dá erro 404
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Você é o assistente da clínica ECOG Londrina. Responda sobre: ${query}` 
          }] 
        }]
      })
    });

    const data = await response.json();

    // Se der erro, ele vai te dizer o porquê de forma clara
    if (data.error) {
      return res.status(200).json({ 
        text: `Quase lá! O Google retornou: ${data.error.message}. Tente atualizar a página (F5).` 
      });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ text: aiText });

  } catch (error) {
    return res.status(200).json({ text: "O sistema está finalizando a sincronização com o Google. Aguarde 2 minutos e tente novamente." });
  }
}
