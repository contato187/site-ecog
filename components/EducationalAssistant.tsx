
import React, { useState, useRef, useEffect } from 'react';
import { getEducationalAdvice } from '../geminiService';

const EducationalAssistant: React.FC = () => {
  const INITIAL_MESSAGE = { 
    role: 'ai' as const, 
    text: 'Bem-vindo ao Laboratório de Conhecimento ECOG. Sou o NeuroMentor AI. \n\nEstou aqui para explicar como a neuromodulação moderna pode reprogramar a saúde cerebral. O que você gostaria de entender hoje?' 
  };
  
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    INITIAL_MESSAGE
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await getEducationalAdvice(userMessage);
    setIsLoading(false);
    
    if (response) {
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Deseja reiniciar seu mentor educativo?')) {
      setMessages([INITIAL_MESSAGE]);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-ecog-nuvem flex flex-col h-[600px] relative group">
      {/* Header Premium */}
      <div className="bg-ecog-espaco p-8 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ecog-folha to-ecog-lima flex items-center justify-center shadow-lg shadow-ecog-folha/20">
            <i className="fa-solid fa-brain-circuit text-ecog-espaco text-xl"></i>
          </div>
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs">NeuroMentor AI</h3>
            <div className="flex items-center gap-2 mt-1">
               <span className="w-2 h-2 bg-ecog-folha rounded-full animate-pulse"></span>
               <p className="text-ecog-mar text-[9px] uppercase font-black tracking-widest">Sistemas Ativos • Gemini Pro</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={clearHistory}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-ecog-ceu transition-all"
        >
          <i className="fa-solid fa-rotate-left"></i>
        </button>
      </div>

      {/* Área de Mensagens */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-white custom-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[90%] rounded-[28px] px-6 py-4 text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-ecog-espaco text-white font-bold rounded-tr-none shadow-lg' 
                : 'bg-ecog-nuvem/20 border border-ecog-nuvem text-ecog-espaco rounded-tl-none font-medium'
            }`}>
              <p className="whitespace-pre-line text-lg md:text-base">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-ecog-nuvem/30 rounded-full px-6 py-4 flex gap-2">
              <span className="w-2 h-2 bg-ecog-folha rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-ecog-folha rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-ecog-folha rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Form de Entrada */}
      <form onSubmit={handleSend} className="p-6 bg-white border-t border-ecog-nuvem">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Qual conceito deseja explorar hoje?"
            className="flex-1 bg-ecog-nuvem/20 border border-ecog-nuvem rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-ecog-folha transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-ecog-folha hover:bg-ecog-lima text-ecog-espaco w-14 h-14 rounded-2xl flex items-center justify-center transition-all disabled:opacity-30 shadow-xl active:scale-95"
          >
            <i className="fa-solid fa-arrow-up-long text-lg"></i>
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">
           <span className="flex items-center gap-1"><i className="fa-solid fa-microchip"></i> Base Científica</span>
           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
           <span className="flex items-center gap-1"><i className="fa-solid fa-shield-halved"></i> Uso Ético</span>
        </div>
      </form>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e3e6; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default EducationalAssistant;
