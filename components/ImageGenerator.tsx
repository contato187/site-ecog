import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('Dr. Breno, um médico negro de barba, realizando um procedimento de Estimulação Magnética Transcraniana (TMS) em um paciente sereno em uma poltrona de couro preta. Ambiente de clínica de luxo moderna com iluminação suave, equipamento MagVenture R20 azul e branco com bobina posicionada no topo da cabeça. Realismo fotográfico, cinematic lighting, 8k resolution.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:4' | '4:3' | '9:16' | '16:9'>('16:9');
  const [status, setStatus] = useState('');

  const generateImage = async () => {
    // Pegando a chave configurada na Vercel
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    
    if (!apiKey) {
      setStatus('Erro: Chave de API não configurada na Vercel.');
      return;
    }

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setStatus('Iniciando síntese visual...');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Usando o modelo estável para geração de imagens via API
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      setStatus('Mapeando conceitos estéticos...');

      const result = await model.generateContent([
        prompt,
        `Gere uma imagem com proporção ${aspectRatio} e qualidade ${imageSize}.`
      ]);

      const response = await result.response;
      
      // Nota: A geração de imagem via Gemini 1.5 Flash retorna partes de dados inline
      const candidate = response.candidates?.[0];
      const part = candidate?.content?.parts?.find(p => p.inlineData);

      if (part?.inlineData) {
        setGeneratedImageUrl(`data:image/png;base64,${part.inlineData.data}`);
        setStatus('Imagem gerada com sucesso.');
      } else {
        // Se o modelo apenas descreveu a imagem em vez de gerar os bits
        setStatus('O modelo gerou uma descrição, mas não os dados da imagem. Verifique seu plano da API.');
        console.log("Resposta do modelo:", response.text());
      }

    } catch (error: any) {
      console.error("Erro na geração:", error);
      setStatus('Erro ao processar imagem. Verifique sua conexão e saldo da API.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-ecog-nuvem overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Painel de Controle */}
        <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-ecog-nuvem bg-ecog-nuvem/10">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-ecog-espaco mb-2 uppercase tracking-tighter">
              Sintetizador de <span className="text-ecog-folha">Realidade Clínica</span>
            </h3>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              Utilize inteligência artificial para criar representações visuais de alta fidelidade para protocolos médicos.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-ecog-espaco text-[10px] font-black uppercase tracking-widest mb-3">Descrição da Cena (Prompt)</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-white border border-ecog-nuvem rounded-2xl p-4 text-ecog-espaco text-sm focus:outline-none focus:ring-2 focus:ring-ecog-folha transition-all resize-none h-32 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-ecog-espaco text-[10px] font-black uppercase tracking-widest mb-3">Tamanho</label>
                <div className="flex bg-white rounded-xl border border-ecog-nuvem p-1 gap-1">
                  {(['1K', '2K', '4K'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setImageSize(size)}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${
                        imageSize === size ? 'bg-ecog-folha text-ecog-espaco' : 'text-gray-400 hover:text-ecog-espaco'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-ecog-espaco text-[10px] font-black uppercase tracking-widest mb-3">Proporção</label>
                <select 
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as any)}
                  className="w-full bg-white border border-ecog-nuvem rounded-xl p-2 text-xs font-bold text-ecog-espaco focus:outline-none"
                >
                  <option value="1:1">1:1 Quadrado</option>
                  <option value="16:9">16:9 Cinema</option>
                  <option value="9:16">9:16 Vertical</option>
                  <option value="4:3">4:3 Clássico</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-ecog-espaco hover:bg-ecog-noite text-white font-black py-5 rounded-full transition-all shadow-xl uppercase tracking-[0.2em] text-xs disabled:opacity-30 flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <i className="fa-solid fa-brain animate-pulse text-ecog-folha"></i>
                  Processando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-wand-magic-sparkles text-ecog-folha"></i>
                  Sintetizar Imagem
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visualização da Imagem */}
        <div className="bg-ecog-espaco p-8 md:p-12 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 ecog-pattern opacity-10 pointer-events-none"></div>
          
          <div className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-700 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
            {generatedImageUrl ? (
              <img 
                src={generatedImageUrl} 
                alt="Resultado da Síntese" 
                className="max-w-full max-h-[500px] rounded-2xl shadow-2xl border-4 border-white/10 object-contain"
              />
            ) : (
              <div className="text-center">
                <i className={`fa-solid ${isGenerating ? 'fa-spinner animate-spin text-ecog-folha' : 'fa-image text-ecog-mar'} text-4xl mb-4`}></i>
                <p className="text-white font-black text-xs uppercase tracking-[0.4em]">{status || 'Aguardando Instruções'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
