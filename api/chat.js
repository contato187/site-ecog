export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { query } = req.body;
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) return res.status(200).json({ text: "Erro: Chave de API não configurada." });

    // Vamos usar apenas o modelo que funcionou no seu teste do AI Studio
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Você é o NeuroMentor AI da clínica ECOG em Londrina. Responda de forma científica sobre: ${query}` }] }]
      })
    });
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return res.status(200).json({ text: data.candidates[0].content.parts[0].text });
    }

    // Se der erro, ele mostra a mensagem real do Google
    const errorDetail = data.error?.message || "O Google ainda está processando o saldo. Tente em instantes.";
    return res.status(200).json({ text: "NeuroMentor (Aguardando Google): " + errorDetail });

  } catch (err) {
    return res.status(200).json({ text: "Erro de rede: " + err.message });
  }
}
    // Se nenhum modelo funcionar, mostramos o erro real do Google para depuração
    const errorMsg = googleResponse?.error?.message || "O Google ainda está processando seu saldo de R$ 69,05. Tente novamente em 20 minutos.";
    return res.status(200).json({ text: "NeuroMentor online: " + errorMsg });

  } catch (err) {
    return res.status(200).json({ text: "Erro de processamento: " + err.message });
  }
}
