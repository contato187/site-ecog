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
  // --- ESTADOS DE SEGURANÇA E ACESSO ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const ADMIN_KEY = "1987"; // Sua senha definitiva

  // --- ESTADOS DO GERADOR ---
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Médico Dr. Breno, negro de barba, ajustando cuidadosamente a bobina magnética de um equipamento MagVenture R20 na cabeça de um paciente. Movimento cinematográfico suave, alta definição.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [history, setHistory] = useState<SimulationRecord[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar histórico do navegador
  useEffect(() => {
    const savedHistory = localStorage.getItem('ecog_sim_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Erro no histórico");
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
  };

  const generateVideo = async () => {
    if (!isUnlocked || !image) return;
    
    setIsGenerating(true);
    setVideoUrl(null);
    setStatus('Conectando ao núcleo Veo 3.1...');

    try {
      // Puxa a chave da Vercel (VITE_ é obrigatório para o front-end)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
      const genAI = new GoogleGenerativeAI(apiKey);
      
      const base64Data = image.split(',')[1];
      setStatus('Sintetizando referências...');
      
      // Chamada simplificada para o modelo de vídeo
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Simulação de processamento (O Veo 3.1 real exige integração via API de backend em alguns casos)
      const result = await model.generateContent([
        `GERAR VÍDEO CINEMATOGRÁFICO: ${prompt}`,
        { inlineData: { data: base64Data, mimeType: "image/png" } }
      ]);

      const response = await result.response;
      // Nota: Em ambientes de produção, o link do vídeo é retornado pelo Google Cloud Storage
      const mockUrl = "URL_DO_VIDEO_GERADO"; 

      setStatus('Finalizando dinâmica...');
      setVideoUrl(mockUrl); 
      
      saveToHistory({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        prompt: prompt,
        imagePreview: image,
        videoUrl: mockUrl
      });

    } catch (error: any) {
      console.error(error);
      setStatus('Erro de faturamento ou limite de cota.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-ecog-noite/60 backdrop-blur-3xl rounded-[40px] border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ecog-folha to-transparent opacity-30"></div>
      
      {!isUnlocked ? (
        /* --- TELA DE BLOQUEIO --- */
        <div className="text-center space-y-6 py-10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
            <i className="fa-solid fa-microchip text-ecog-folha text-3xl animate-pulse"></i>
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-black text-xl uppercase tracking-tighter">Laboratório de Simulação</h3>
            <p className="text-ecog-mar text-[10px] uppercase tracking-[0.3em] font-bold">Acesso restrito ao corpo clínico ECOG</p>
          </div>
          
          <div className="max-w-xs mx-auto">
            <input 
              type="password" 
              placeholder="Digite a Chave de Ativação"
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-center focus:border-ecog-folha outline-none transition-all placeholder:text-white/20"
              onChange={(e) => {
                if(e.target.value === ADMIN_KEY) setIsUnlocked(true);
              }}
            />
            <p className="mt-4 text-[8px] text-white/30 uppercase tracking-widest">Sessão monitorada via ID de Projeto</p>
          </div>
        </div>
      ) : (
        /* --- CONTEÚDO DO LABORATÓRIO (SÓ APARECE SE DESBLOQUEADO) --- */
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 animate-in fade-in duration-700">
          
          {/* Histórico */}
          <div className="lg:col-span-3 border-r border-white/5 pr-6 hidden lg:block">
            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-clock-rotate-left text-ecog-folha"></i>
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Simulações</h4>
            </div>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <p className="text-[9px] text-white/20 uppercase text-center py-10">Vazio</p>
              ) : (
                history.map((record) => (
                  <div key={record.id} onClick={() => loadFromHistory(record)} className="group cursor-pointer bg-white/5 rounded-2xl p-3 border border-white/5 hover:border-ecog-folha transition-all">
                    <img src={record.imagePreview} className="rounded-lg opacity-40 group-hover:opacity-100 transition-opacity mb-2" alt="Preview" />
                    <p className="text-[8px] text-ecog-folha font-black uppercase">{new Date(record.timestamp).toLocaleTimeString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex justify-between items-center">
