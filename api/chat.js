export default async function handler(req, res) {
  // Configuração de CORS para permitir que o seu site acesse a API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  // Lista de modelos que o seu painel do Google Cloud mostrou que têm cota ativa (1K RPM)
  const models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp"
  ];
  
  let lastErrorMessage = "";

  for (const modelName of models) {
    try {
      // Usamos a rota v1beta para garantir compatibilidade com os modelos mais novos e faturamento pago
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. Responda de forma científica e acolhedora sobre: ${query}` 
            }] 
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();

      // Se o Google retornar uma resposta válida, enviamos para o site imediatamente
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ text });
      }

      // Se houver erro de cota ou faturamento, guardamos a mensagem para depuração interna
      if (data.error) {
        lastErrorMessage = data.error.message;
        console.warn(`Modelo ${modelName} falhou: ${lastErrorMessage}`);
      }
      
    } catch (err) {
      console
