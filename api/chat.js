export default async function handler(req, res) {
  // Configuração de CORS para o seu domínio
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  try {
    // Usamos v1beta e gemini-1.5-flash (O padrão para contas faturadas)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. 
            Responda de forma científica, empática e didática sobre neuromodulação. 
            Pergunta do paciente: ${query}` 
          }] 
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    const data = await response.json();

    // Se o Google ainda reclamar de algo, vamos saber o que é:
    if (data.error) {
      return res.status(200).json({ 
        text: `Configuração quase pronta! O Google diz: ${data.error.message}. Aguarde 5 minutos para a ativação do faturamento propagar.` 
      });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ text: aiText });

  } catch (error) {
    return res.status(200).json({ text: "O cérebro da IA está terminando de inicializar. Tente novamente em instantes." });
  }
}
