
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('Dr. Breno, um médico negro de barba, realizando um procedimento de Estimulação Magnética Transcraniana (TMS) em um paciente sereno em uma poltrona de couro preta. Ambiente de clínica de luxo moderna com iluminação suave, equipamento MagVenture R20 azul e branco com bobina posicionada no topo da cabeça. Realismo fotográfico, cinematic lighting, 8k resolution.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:4' | '4:3' | '9:16' | '16:9'>('16:9');
  const [status, setStatus] = useState('');

  const generateImage = async () => {
    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setStatus('Iniciando síntese visual...');

    try {
      // Verificação de Chave de API Mandatória para gemini-3-pro-image-preview
      // @ts-ignore
      if (!(await window.aistudio.hasSelectedApiKey())) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      // Link para documentação de faturamento conforme instrução
      const billingDocUrl = "https://ai.google.dev/gemini-api/docs/billing";

      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
      const ai = new GoogleGenAI({ apiKey });
      
      setStatus('Mapeando conceitos estéticos...');

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: imageSize
          }
        },
      });

      setStatus('Finalizando renderização...');

      // Iterar pelas partes para encontrar a imagem
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            setGeneratedImageUrl(`data:image/png;base64,${base64EncodeString}`);
            setStatus('Imagem gerada com sucesso.');
            break;
          }
        }
      }

      if (!generatedImageUrl && status !== 'Imagem gerada com sucesso.') {
         setStatus('O modelo não retornou uma imagem. Tente ajustar o prompt.');
      }

    } catch (error: any) {
      console.error("Erro na geração:", error);
      if (error.message?.includes("Requested entity was not found")) {
        setStatus('Erro de autenticação. Por favor, selecione sua chave de API novamente.');
        // @ts-ignore
        await window.aistudio.openSelectKey();
      } else {
        setStatus('Erro ao processar imagem. Verifique sua conexão e saldo da API.');
      }
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
              Utilize o modelo Gemini 3 Pro para criar representações visuais de alta fidelidade para protocolos médicos e materiais educativos.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-ecog-espaco text-[10px] font-black uppercase tracking-widest mb-3">Descrição da Cena (Prompt)</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-white border border-ecog-nuvem rounded-2xl p-4 text-ecog-espaco text-sm focus:outline-none focus:ring-2 focus:ring-ecog-folha transition-all resize-none h-32 leading-relaxed"
                placeholder="Descreva a imagem médica desejada..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-ecog-espaco text-[10px] font-black uppercase tracking-widest mb-3">Tamanho (Resolução)</label>
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
                  <option value="3:4">3:4 Retrato</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-ecog-espaco hover:bg-ecog-noite text-white font-black py-5 rounded-full transition-all shadow-xl uppercase tracking-[0.2em] text-xs disabled:opacity-30 disabled:cursor-not-allowed group flex items-center justify-center gap-3 active:scale-95"
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
            
            <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-widest leading-relaxed">
              Requer chave de API paga. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-ecog-folha">Saiba mais sobre faturamento.</a>
            </p>
          </div>
        </div>

        {/* Visualização da Imagem */}
        <div className="bg-ecog-espaco p-8 md:p-12 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 ecog-pattern opacity-10 pointer-events-none"></div>
          
          <div className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-700 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
            {generatedImageUrl ? (
              <div className="relative group w-full h-full max-h-[600px] flex items-center justify-center">
                <img 
                  src={generatedImageUrl} 
                  alt="Resultado da Síntese" 
                  className="max-w-full max-h-full rounded-2xl shadow-2xl border-4 border-white/10 object-contain"
                />
                <a 
                  href={generatedImageUrl} 
                  download="ecog-synthesis.png"
                  className="absolute bottom-4 right-4 bg-ecog-folha text-ecog-espaco w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                >
                  <i className="fa-solid fa-download"></i>
                </a>
              </div>
            ) : (
              <div className="text-center p-12">
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                   <i className={`fa-solid ${isGenerating ? 'fa-spinner animate-spin text-ecog-folha' : 'fa-image text-ecog-mar'} text-4xl`}></i>
                </div>
                <p className="text-white font-black text-xs uppercase tracking-[0.4em] mb-2">
                  {isGenerating ? status : 'Aguardando Instruções'}
                </p>
                <p className="text-ecog-mar text-[10px] font-bold uppercase tracking-widest opacity-60 max-w-[200px] mx-auto leading-relaxed">
                   {!isGenerating && 'O resultado da sua síntese neural aparecerá aqui'}
                </p>
              </div>
            )}
          </div>

          {/* Status Overlay quando gerando */}
          {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
               <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">{status}</span>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
