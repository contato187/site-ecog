export const getEducationalAdvice = async (query: string) => {
  try {
    // Chamamos a nossa própria API interna da Vercel
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data.text || "Tive um pequeno lapso neural.";
    
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    return "Erro de conexão com o NeuroMentor. Tente novamente.";
  }
};
