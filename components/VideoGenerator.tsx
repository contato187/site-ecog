
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface SimulationRecord {
  id: string;
  timestamp: number;
  prompt: string;
  imagePreview: string;
  videoUrl?: string;
}

const VideoGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Médico Dr. Breno, negro de barba, ajustando cuidadosamente a bobina magnética de um equipamento MagVenture R20 na cabeça de um paciente. O paciente está em uma poltrona reclinável de couro preta, com expressão serena e esperançosa. Sala da clínica ECOG com iluminação suave e moderna. Movimento cinematográfico suave, alta definição.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [history, setHistory] = useState<SimulationRecord[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('ecog_sim_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Erro ao carregar histórico");
      }
    }
  }, []);

  const saveToHistory = (newRecord: SimulationRecord) => {
    const updatedHistory = [newRecord, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('ecog_sim_history', JSON.stringify(updatedHistory));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadFromHistory = (record: SimulationRecord) => {
    setImage(record.imagePreview);
    setPrompt(record.prompt);
    if (record.videoUrl) setVideoUrl(record.videoUrl);
    window.scrollTo({ top: document.getElementById('experience')?.offsetTop, behavior: 'smooth' });
  };

  const generateVideo = async () => {
    if (!image) return;
    
    setIsGenerating(true);
    setVideoUrl(null);
    setStatus('Conectando ao núcleo de processamento Veo...');

    try {
      // @ts-ignore
      if (!(await window.aistudio.hasSelectedApiKey())) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      
      setStatus('Sintetizando referências visuais...');
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      const loadingMessages = [
        'Mapeando volumetria da sala...',
        'Animando campos magnéticos...',
        'Refinando expressões do paciente...',
        'Renderizando texturas...',
        'Finalizando dinâmica cinematográfica...'
      ];
      let messageIndex = 0;

      while (!operation.done) {
        setStatus(loadingMessages[messageIndex % loadingMessages.length]);
        messageIndex++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setStatus('Transferindo dados neurais...');
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!response.ok) throw new Error('Falha no download do vídeo');
        
        const blob = await response.blob();
        const finalUrl = URL.createObjectURL(blob);
        setVideoUrl(finalUrl);
        
        saveToHistory({
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          prompt: prompt,
          imagePreview: image,
          videoUrl: finalUrl
        });

        setStatus('Animação concluída.');
      }
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("Requested entity was not found")) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
      setStatus('Erro na síntese. Verifique sua chave de API e conexão.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-ecog-noite/60 backdrop-blur-3xl rounded-[40px] border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ecog-folha to-transparent opacity-30"></div>
      
      <div className="relative z-10 grid lg:grid-cols-12 gap-12">
        {/* Painel Esquerdo: Histórico */}
        <div className="lg:col-span-3 border-r border-white/5 pr-6 hidden lg:block">
          <div className="flex items-center gap-2 mb-6">
            <i className="fa-solid fa-clock-rotate-left text-ecog-folha"></i>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Simulações Recentes</h4>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 opacity-20">
                <i className="fa-solid fa-ghost text-4xl text-ecog-mar mb-4"></i>
                <p className="text-ecog-mar text-[10px] font-bold uppercase tracking-widest text-center">Nenhum registro</p>
              </div>
            ) : (
              history.map((record) => (
                <div 
                  key={record.id}
                  onClick={() => loadFromHistory(record)}
                  className="group cursor-pointer bg-white/5 rounded-2xl p-3 border border-white/5 hover:border-ecog-folha/30 transition-all"
                >
                  <div className="aspect-video rounded-lg overflow-hidden mb-2 bg-black">
                    <img src={record.imagePreview} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Preview" />
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[8px] text-ecog-folha font-black uppercase">{new Date(record.timestamp).toLocaleTimeString()}</p>
                    <i className="fa-solid fa-play text-white/20 group-hover:text-ecog-folha text-[8px]"></i>
                  </div>
                  <p className="text-[9px] text-white/50 line-clamp-2 leading-relaxed italic">"{record.prompt}"</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Painel Central: Configuração */}
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
            Laboratório <span className="text-ecog-folha">Veo</span>
          </h3>
          <p className="text-ecog-mar text-xs font-light mb-8 leading-relaxed">
            Retome simulações anteriores ou crie novas dinâmicas neurais a partir de fotos da clínica.
          </p>

          <div className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`aspect-video rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4 overflow-hidden relative ${
                image ? 'border-ecog-folha/50' : 'border-white/10 hover:border-ecog-folha/30 bg-white/5'
              }`}
            >
              {image ? (
                <>
                  <img src={image} alt="Referência" className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-ecog-espaco/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity">
                    <i className="fa-solid fa-camera-rotate text-white text-3xl mb-2"></i>
                    <span className="text-white font-bold text-[10px] uppercase tracking-widest">Alterar Referência</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <i className="fa-solid fa-upload text-ecog-folha text-xl"></i>
                  </div>
                  <span className="text-ecog-ceu text-[10px] font-black uppercase tracking-widest text-center px-4">Upload da Imagem</span>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <div>
              <label className="block text-ecog-folha text-[9px] font-black uppercase tracking-widest mb-3">Roteiro da Animação</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs focus:outline-none focus:border-ecog-folha transition-all resize-none h-28 leading-relaxed"
              />
            </div>

            <button
              onClick={generateVideo}
              disabled={!image || isGenerating}
              className="w-full bg-ecog-folha hover:bg-ecog-lima text-ecog-espaco font-black py-5 rounded-full transition-all shadow-xl uppercase tracking-[0.2em] text-[10px] disabled:opacity-30 disabled:cursor-not-allowed group flex items-center justify-center gap-3 active:scale-95"
            >
              {isGenerating ? <i className="fa-solid fa-gear animate-spin"></i> : <i className="fa-solid fa-play"></i>}
              {isGenerating ? 'Sintetizando...' : 'Gerar Animação'}
            </button>
          </div>
        </div>

        {/* Painel Direito: Resultado */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className={`aspect-video rounded-3xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center relative ${aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[550px] mx-auto' : ''}`}>
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                muted
                playsInline
                className="w-full h-full object-cover" 
              />
            ) : isGenerating ? (
              <div className="text-center p-8">
                <div className="mb-6 flex justify-center">
                   <div className="w-16 h-16 relative">
                      <div className="absolute inset-0 border-4 border-ecog-folha/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-ecog-folha rounded-full animate-spin"></div>
                   </div>
                </div>
                <p className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-2 animate-pulse">{status}</p>
              </div>
            ) : (
              <div className="text-center p-12 opacity-30">
                <i className="fa-solid fa-clapperboard text-4xl text-ecog-mar mb-4"></i>
                <p className="text-ecog-mar text-[10px] font-black uppercase tracking-widest">Aguardando Produção</p>
              </div>
            )}
            <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
               <span className="text-[7px] font-black text-white uppercase tracking-widest">VEO 3.1 ACTIVE SESSION</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(187,208,41,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(187,208,41,0.4); }
      `}</style>
    </div>
  );
};

export default VideoGenerator;
