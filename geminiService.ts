export const getEducationalAdvice = async (query: string): Promise<string | null> => {
  try {
    // CORREÇÃO: Chamando a sua rota interna da Vercel em vez da URL direta do Google
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Falha na comunicação com o servidor local');
    }

    const data = await response.json();
    
    // O retorno esperado da sua API em /api/chat é { text: "resposta" }
    return data.text || "O NeuroMentor está processando, tente novamente em instantes.";

  } catch (error) {
    console.error("Erro no NeuroMentor Service:", error);
    return "Erro de conexão com o NeuroMentor. Verifique se o servidor está online.";
  }
};
