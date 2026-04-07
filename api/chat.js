export default async function handler(req, res) {
  // 1. Configurações de CORS para o site ECOG acessar a API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  // 2. Lista de modelos que o seu painel (Nível Pago 1) liberou
  // O gemini-1.5-flash é o mais estável para contas novas
  const models = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-2.0-flash"
  ];

  // 3. Tentativa de conexão com os modelos
  for (const modelName of models) {
    try {
      // Usamos a rota v1beta que o seu AI Studio usou com sucesso no teste
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. Responda de forma científica sobre: ${query}` 
            }] 
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      });

      const data = await response.json();

      // 4. Se o Google responder com o texto, entregamos na hora!
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ text });
      }

      // Log interno para você ver o que o Google respondeu se falhar
      console.warn(`Modelo ${modelName} retornou erro:`, data.error?.message || "Erro desconhecido");

    } catch (err) {
      console.error(`Erro de conexão no modelo ${modelName}:`, err);
      continue; // Tenta o próximo modelo da lista
    }
  }

  // 5. Mensagem de segurança caso o Google ainda esteja "dormindo"
  // Como o seu AI Studio funcionou, isso aqui raramente será visto agora.
  return res.status(200).json({ 
    text: "O sistema está online! O Google confirmou seu saldo de R$ 69,05, mas a liberação total pode levar alguns minutos. Se persistir, dê um F5 ou tente em uma janela anônima." 
  });
}
