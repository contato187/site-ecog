
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// Auxiliares para codificação/decodificação de áudio PCM
function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

const LiveAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [aiTranscription, setAiTranscription] = useState('');
  const [status, setStatus] = useState('Pronto para ouvir');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  const startSession = async () => {
    try {
      setIsActive(true);
      setStatus('Sincronizando...');
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: 'Você é o Assistente de Voz da Clínica ECOG. Você fala com pacientes sobre neuromodulação (TMS, tDCS) de forma empática e científica. Você sabe que o Dr. Breno é o especialista. Responda de forma breve e direta por voz.',
        },
        callbacks: {
          onopen: () => {
            setStatus('Conectado. Pode falar.');
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Tratar Transcrições
            if (message.serverContent?.inputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent?.inputTranscription?.text);
            }
            if (message.serverContent?.outputTranscription) {
              setAiTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }
            if (message.serverContent?.turnComplete) {
              // Limpar para o próximo turno se necessário
            }

            // Tratar Áudio de Saída
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outAudioContextRef.current) {
              const ctx = outAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            stopSession();
          },
          onerror: (e) => {
            console.error("Live Error:", e);
            stopSession();
          }
        }
      });
      
      sessionPromiseRef.current = sessionPromise;

    } catch (err) {
      console.error(err);
      setIsActive(false);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setStatus('Sessão encerrada');
    setTranscription('');
    setAiTranscription('');
    if (audioContextRef.current) audioContextRef.current.close();
    if (outAudioContextRef.current) outAudioContextRef.current.close();
    sessionPromiseRef.current?.then(s => s.close());
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
              <div className="absolute inset-0 border-2 border-ecog-folha rounded-full animate-ping opacity-20"></div>
            </div>
            <div>
              <p className="text-white font-black text-[10px] uppercase tracking-widest">{status}</p>
              <p className="text-ecog-mar text-[8px] uppercase font-bold">Usando sua voz em tempo real</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar">
            {transcription && (
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <p className="text-[9px] text-ecog-folha font-black uppercase mb-1">Você disse:</p>
                <p className="text-white/80 text-xs italic">{transcription}</p>
              </div>
            )}
            {aiTranscription && (
              <div className="bg-ecog-folha/10 p-3 rounded-2xl border border-ecog-folha/20">
                <p className="text-[9px] text-ecog-folha font-black uppercase mb-1">ECOG responde:</p>
                <p className="text-white text-xs leading-relaxed">{aiTranscription}</p>
              </div>
            )}
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
