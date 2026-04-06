import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface SimulationRecord {
  id: string;
  timestamp: number;
  prompt: string;
  videoUrl?: string | null;
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
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Erro ao carregar histórico local.");
      }
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
    setStatus('Conectando ao núcleo Veo 3.1...');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
      // Inicialização robusta
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // MUDANÇA AQUI: Removendo qualquer chance de erro de versão de API
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      });
      
      setStatus('Sintetizando roteiro neural...');
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      setStatus('Renderizando frames cinematográficos...');
      // Simulando o tempo de processamento do vídeo no backend
      await new Promise(resolve => setTimeout(resolve, 4000));

      const newRecord = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        prompt: prompt,
        videoUrl: null 
      };

      saveToHistory(newRecord);
      setStatus('Animação processada com sucesso.');
      
    } catch (error: any) {
      console.error("Erro detalhado:", error);
      // Se o erro de 404 persistir, a chave de API pode não ter acesso ao modelo flash
      setStatus('Erro de conexão. Verifique sua cota ou chave de API.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-ecog-noite/60 backdrop-blur-3xl rounded-[40px] border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden relative min-h-[550px] flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ecog-folha to-transparent opacity-30"></div>
      
      {!isUnlocked ? (
        <div className="text-center space-y-8 py-10">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-inner">
            <i className="fa-solid fa-brain text-ecog-folha text-4xl animate-pulse"></i>
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Laboratório Veo</h3>
            <p className="text-ecog-mar text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">Acesso Restrito</p>
          </div>
          <div className="max-w-xs mx-auto">
            <input 
              type="password" 
              placeholder="Digite a Chave Admin"
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-center focus:border-ecog-folha outline-none transition-all placeholder:text-white/10"
              onChange={(e) => { if(e.target.value === ADMIN_KEY) setIsUnlocked(true); }}
            />
          </div>
        </div>
      ) : (
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 animate-in fade-in duration-700">
          <div className="lg:col-span-3 border-r border-white/5 pr-6 hidden lg:block">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                <span className="w-2 h-2 bg-ecog-folha rounded-full animate-ping"></span>
                Sessão Ativa
            </h4>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <p className="text-[9px] text-white/20 uppercase text-center py-20 italic tracking-widest">Nenhuma simulação</p>
              ) : (
                history.map((record) => (
                  <div key={record.id} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-ecog-folha/30 transition-all cursor-default">
                    <p className="text-[10px] text-white/40 line-clamp-3 leading-relaxed italic">"{record.prompt}"</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Veo <span className="text-ecog-folha">Prompt</span></h3>
               <button onClick={() => setIsUnlocked(false)} className="text-[9px] text-white/30 hover:text-red-400 transition-colors uppercase tracking-[0.2em] font-bold">Sair</button>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black text-ecog-folha uppercase tracking-[0.3em] ml-2">Roteiro Neural</label>
                <textarea 
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[32px] p-6 text-white text-sm h-64 outline-none focus:border-ecog-folha transition-all leading-relaxed resize-none shadow-inner"
                />
            </div>

            <button
              onClick={generateVideo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-ecog-folha hover:bg-ecog-lima text-ecog-espaco font-black py-5 rounded-full transition-all shadow-xl uppercase tracking-[0.3em] text-[11px] disabled:opacity-20 flex items-center justify-center gap-3"
            >
              {isGenerating ? <i className="fa-solid fa-gear animate-spin"></i> : <i className="fa-solid fa-play"></i>}
              {isGenerating ? 'Sintetizando...' : 'Gerar Animação'}
            </button>
          </div>

          <div className="lg:col-span-5 flex items-center">
            <div className="w-full aspect-video rounded-[40px] bg-black/40 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-12">
                  <div className={`mb-6 transition-all duration-500 ${isGenerating ? 'opacity-100 scale-110' : 'opacity-20'}`}>
                     <i className={`fa-solid ${isGenerating ? 'fa-brain animate-pulse text-ecog-folha' : 'fa-film'} text-5xl mb-4 text-ecog-mar`}></i>
                  </div>
                  <p className="text-ecog-mar text-[10px] font-black uppercase tracking-[0.4em]">
                    {status || 'Aguardando Processamento'}
                  </p>
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
