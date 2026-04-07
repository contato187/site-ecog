export default async function handler(req, res) {
  // Configurações de CORS para permitir que o front-end acesse a API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { query } = req.body;
    // Tenta capturar a chave de API das variáveis de ambiente da Vercel
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ text: "Erro: Chave de API não configurada no servidor." });
    }

    // Retornando para v1beta com o nome de modelo padrão aprovado pelo AI Studio
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. Responda de forma científica sobre: ${query}` 
          }] 
        }]
      })
    });

    const data = await response.json();

    // Verifica se a estrutura de resposta do Google contém o texto esperado
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return res.status(200).json({ text: data.candidates[0].content.parts[0].text });
    }

    // Retorna o erro detalhado do Google caso a chamada falhe
    const googleError = data.error?.message || "O modelo não respondeu. Verifique o faturamento no Google Cloud.";
    return res.status(200).json({ text: "Resposta do Google: " + googleError });

  } catch (err) {
    // Captura erros de rede ou de execução na Vercel
    return res.status(200).json({ text: "Erro de conexão: " + err.message });
  }
}
