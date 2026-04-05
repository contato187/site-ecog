import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface SimulationRecord {
  id: string;
  timestamp: number;
  prompt: string;
  imagePreview: string;
  videoUrl?: string;
}

const VideoGenerator: React.FC = () => {
  // --- ESTADOS DE SEGURANÇA ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const ADMIN_KEY = "1987"; 

  // --- ESTADOS DO GERADOR ---
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Médico Dr. Breno, ajustando a bobina magnética de um equipamento MagVenture na clínica ECOG. Alta definição.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState<SimulationRecord[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const loadFromHistory = (record: SimulationRecord) => {
    setImage(record.imagePreview);
    setPrompt(record.prompt);
    if (record.videoUrl) setVideoUrl(record.videoUrl);
  };

  const generateVideo = async () => {
    if (!isUnlocked || !image) return;
    setIsGenerating(true);
    setStatus('Conectando ao núcleo Veo...');
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const result = await model.generateContent([
        `SIMULAÇÃO VEO: ${prompt}`,
        { inlineData: { data: image.split(',')[1], mimeType: "image/png" } }
      ]);
      await result.response;
      setStatus('Sincronizando...');
      // Simulando link de retorno
      setVideoUrl(null); 
    } catch (error) {
      console.error(error);
      setStatus('Erro na conexão.');
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
            <i className="fa-solid fa-lock text-ecog-folha text-3xl animate-pulse"></i>
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-black text-xl uppercase tracking-tighter">Laboratório Restrito</h3>
            <p className="text-ecog-mar text-[10px] uppercase tracking-[0.3em] font-bold">Autenticação Clínica Requerida</p>
          </div>
          <div className="max-w-xs mx-auto">
            <input 
              type="password" 
              placeholder="Chave Admin"
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-center focus:border-ecog-folha outline-none transition-all"
              onChange={(e) => { if(e.target.value === ADMIN_KEY) setIsUnlocked(true); }}
            />
          </div>
        </div>
      ) : (
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 animate-in fade-in duration-700">
          {/* Histórico */}
          <div className="lg:col-span-3 border-r border-white/5 pr-6 hidden lg:block">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Histórico</h4>
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {history.map((record) => (
                <div key={record.id} onClick={() => loadFromHistory(record)} className="cursor-pointer bg-white/5 rounded-xl p-2 border border-white/5 hover:border-ecog-folha transition-all">
                  <img src={record.imagePreview} className="rounded-lg opacity-40 hover:opacity-100" alt="Rec" />
                </div>
              ))}
            </div>
          </div>

          {/* Painel Central */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Veo <span className="text-ecog-folha">3.1</span></h3>
               <button onClick={() => setIsUnlocked(false)} className="text-[8px] text-white/40 uppercase">Sair</button>
            </div>
            <div onClick={() => fileInputRef.current?.click()} className="aspect-video rounded-3xl border-2 border-dashed border-white/10 hover:border-ecog-folha/30 bg-white/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative">
              {image ? <img src={image} className="w-full h-full object-cover opacity-40" alt="Ref" /> : <i className="fa-solid fa-upload text-ecog-folha text-xl"></i>}
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs h-32 outline-none focus:border-ecog-folha" />
            <button onClick={generateVideo} disabled={!image || isGenerating} className="w-full bg-ecog-folha text-ecog-espaco font-black py-5 rounded-full uppercase tracking-widest text-[10px] disabled:opacity-20 active:scale-95 transition-all">
              {isGenerating ? 'Sintetizando...' : 'Gerar Animação'}
            </button>
          </div>

          {/* Resultado */}
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full aspect-video rounded-3xl bg-black/40 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden text-center">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
              ) : (
                <div className="opacity-20 p-8">
                  <i className="fa-solid fa-clapperboard text-4xl mb-4"></i>
                  <p className="text-[10px] font-black uppercase tracking-widest">{status || 'Aguardando Produção'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(152,194,60,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default VideoGenerator;
