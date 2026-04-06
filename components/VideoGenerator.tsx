import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface SimulationRecord {
  id: string;
  timestamp: number;
  prompt: string;
  videoUrl?: string;
}

const VideoGenerator: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const ADMIN_KEY = "1987"; 

  const [prompt, setPrompt] = useState('Animação cinematográfica de um cérebro humano transparente em 3D, com feixes de luz verde neon ativando o córtex pré-frontal. Estilo laboratorial futurista, alta definição.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState<SimulationRecord[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('ecog_sim_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveToHistory = (newRecord: SimulationRecord) => {
    const updatedHistory = [newRecord, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('ecog_sim_history', JSON.stringify(updatedHistory));
  };

  const generateVideo = async () => {
    if (!isUnlocked || !prompt.trim()) return;
    
    setIsGenerating(true);
    setVideoUrl(null);
    setStatus('Iniciando síntese neural...');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Chamada otimizada apenas com texto
      const result = await model.generateContent([
        `VEOLAB GENERATION: ${prompt}`
      ]);

      await result.response;
      setStatus('Renderizando frames...');
      
      // Aqui o Veo processaria o vídeo real
      setVideoUrl(null); 

    } catch (error) {
      console.error(error);
      setStatus('Erro no servidor Veo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-ecog-noite/60 backdrop-blur-3xl rounded-[40px] border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ecog-folha to-transparent opacity-30"></div>
      
      {!isUnlocked ? (
        <div className="text-center space-y-6 py-10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
            <i className="fa-solid fa-brain text-ecog-folha text-3xl animate-pulse"></i>
          </div>
          <h3 className="text-white font-black text-xl uppercase tracking-tighter">Laboratório de IA</h3>
          <input 
            type="password" 
            placeholder="Chave Admin"
            className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-center focus:border-ecog-folha outline-none transition-all"
            onChange={(e) => { if(e.target.value === ADMIN_KEY) setIsUnlocked(true); }}
          />
        </div>
      ) : (
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 animate-in fade-in duration-700">
          
          {/* Histórico Simplificado */}
          <div className="lg:col-span-3 border-r border-white/5 pr-6 hidden lg:block">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Simulações</h4>
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {history.map((record) => (
                <div key={record.id} className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[8px] text-ecog-folha font-black mb-1 italic">Prompt Ativo</p>
                  <p className="text-[9px] text-white/40 line-clamp-2 italic">{record.prompt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Editor focado em Prompt */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Veo <span className="text-ecog-folha">PROMPT</span></h3>
               <button onClick={() => setIsUnlocked(false)} className="text-[8px] text-white/40 uppercase">Sair</button>
            </div>
            
            <div className="space-y-2">
              <label className="text-[9px] font-black text-ecog-folha uppercase tracking-[0.2em]">Roteiro da Animação</label>
              <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Descreva a cena neural..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm h-64 outline-none focus:border-ecog-folha transition-all leading-relaxed"
              />
            </div>

            <button
              onClick={generateVideo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-ecog-folha text-ecog-espaco font-black py-5 rounded-full uppercase tracking-widest text-[10px] active:scale-95 transition-all disabled:opacity-20"
            >
              {isGenerating ? 'Processando Prompt...' : 'Gerar Animação'}
            </button>
          </div>

          {/* Resultado Visualizador */}
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full aspect-video rounded-3xl bg-black/40 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
              ) : (
                <div className="text-center opacity-20 p-8">
                  <i className="fa-solid fa-clapperboard text-4xl mb-4"></i>
                  <p className="text-[10px] font-black uppercase tracking-widest">{status || 'Aguardando Roteiro'}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
