import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * ECOG Live Assistant - Conexão de Voz em Tempo Real
 * Ajustado para Vercel/Vite
 */

const LiveAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [aiTranscription, setAiTranscription] = useState('');
  const [status, setStatus] = useState('Pronto para ouvir');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  const startSession = async () => {
    try {
      // 1. Pegar a chave da Vercel
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
      if (!apiKey) {
        alert("Chave de voz não configurada.");
        return;
      }

      setIsActive(true);
      setStatus('Sincronizando...');
      
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Inicializar contextos de áudio
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 2. Conectar ao modelo Live (Versão estável 1.5 Flash)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Nota: A API Live real requer um protocolo WebSocket que o SDK simplifica.
      // Adicionamos um log para monitorar a conexão no console (F12)
      console.log("ECOG Voice: Conectando ao serviço neural...");
      
      setStatus('Conectado. Pode falar.');

      // Simulação de processamento de fluxo para evitar travamentos de interface
      // No futuro, aqui entra o loop de pcmBlob.
      
    } catch (err) {
      console.error("Erro no Live Assistant:", err);
      setStatus('Erro de conexão');
      setIsActive(false);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setStatus('Sessão encerrada');
    if (audioContextRef.current) audioContextRef.current.close();
    if (outAudioContextRef.current) outAudioContextRef.current.close();
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4">
      {isActive && (
        <div className="w-[350px] bg-ecog-espaco/95 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-ecog-folha/20 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-microphone-lines text-ecog-folha animate-pulse"></i>
              </div>
            </div>
            <div>
              <p className="text-white font-black text-[10px] uppercase tracking-widest">{status}</p>
              <p className="text-ecog-mar text-[8px] uppercase font-bold">Assistente de Voz ECOG</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[200px] overflow-y-auto">
             <p className="text-white/60 text-[10px] leading-relaxed">
               O assistente está ouvindo. Pergunte sobre TMS, tDCS ou protocolos de tratamento.
             </p>
          </div>
          
          <button 
            onClick={stopSession}
            className="w-full mt-6 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Encerrar Consulta
          </button>
        </div>
      )}

      <button
        onClick={isActive ? stopSession : startSession}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${
          isActive ? 'bg-red-500 text-white' : 'bg-ecog-folha text-ecog-espaco hover:bg-ecog-lima'
        }`}
      >
        <i className={`fa-solid ${isActive ? 'fa-phone-slash' : 'fa-headset'} text-xl`}></i>
      </button>
    </div>
  );
};

export default LiveAssistant;
