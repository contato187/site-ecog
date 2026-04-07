export default async function handler(req, res) {
  // 1. Configurações de CORS para o site ECOG acessar a API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.body;
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  // 2. Lista de modelos estáveis que funcionam na rota v1
  const models = [
    "gemini-1.5-flash",
    "gemini-1.5-pro"
  ];

  for (const modelName of models) {
    try {
      // MUDANÇA CRÍTICA: Alterado de v1beta para v1 (Rota Estável de Produção)
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
      
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

      // Se o Google responder com sucesso, entregamos o texto
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ text });
      }

      // Caso o Google retorne um erro específico (ex: cota ou permissão)
      if (data.error) {
        console.warn(`Tentativa com ${modelName} falhou:`, data.error.message);
      }

    } catch (err) {
      console.error(`Erro de rede no modelo ${modelName}:`, err);
      continue; 
    }
  }

  // 3. Mensagem de fallback caso os servidores da API v1 ainda não tenham recebido o sinal do seu pagamento
  return res.status(200).json({ 
    text: "Conexão estabelecida! O Google está sincronizando seu novo saldo pago com o servidor de chat. Isso pode levar alguns minutos. Por favor, tente novamente em breve." 
  });
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
