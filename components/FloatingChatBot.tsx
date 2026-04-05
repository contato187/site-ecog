
import React, { useState } from 'react';
import { WHATSAPP_URL, SOCIAL_LINKS } from '../constants';

const FloatingChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const instagram = SOCIAL_LINKS.find(l => l.platform === 'Instagram')?.url;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Menu de Canais Digitais */}
      <div className={`flex flex-col gap-2.5 transition-all duration-500 origin-bottom ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}`}>
        
        {/* Instagram */}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <span className="bg-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-ecog-espaco shadow-xl border border-ecog-nuvem group-hover:bg-ecog-folha transition-colors">
              Instagram
            </span>
            <div className="w-11 h-11 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
              <i className="fa-brands fa-instagram text-xl"></i>
            </div>
          </a>
        )}

        {/* WhatsApp Principal */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <span className="bg-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-ecog-espaco shadow-xl border border-ecog-nuvem group-hover:bg-ecog-folha transition-colors">
            WhatsApp ECOG
          </span>
          <div className="w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
            <i className="fa-brands fa-whatsapp text-xl"></i>
          </div>
        </a>
      </div>

      {/* Botão de Chamada (Trigger) - Dimensões Reduzidas de w-16 para w-12 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 group ${
          isOpen ? 'bg-ecog-espaco text-white' : 'bg-ecog-folha text-ecog-espaco hover:bg-ecog-lima'
        }`}
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-headset'} text-lg transition-transform ${isOpen ? 'rotate-0' : 'group-hover:scale-110'}`}></i>
        
        {/* Tooltip Lateral */}
        {!isOpen && (
          <div className="absolute right-14 bg-white text-ecog-espaco text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0 border border-ecog-nuvem whitespace-nowrap">
            Falar com a ECOG
          </div>
        )}

        {/* Indicador de Status - Dimensões Reduzidas */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ecog-folha opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-ecog-folha border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingChatBot;
