
import React, { useState } from 'react';
import { PROCEDURES, WHATSAPP_URL } from '../constants';

const Procedures: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(PROCEDURES[0].id);
  const [activeTab, setActiveTab] = useState<'info' | 'journey'>('info');

  const selectedProc = PROCEDURES.find(p => p.id === selectedId) || PROCEDURES[0];

  return (
    <section id="procedures" className="py-32 bg-ecog-espaco relative overflow-hidden">
      <div className="absolute inset-0 ecog-pattern opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-ecog-folha/50"></span>
            <span className="text-ecog-folha font-bold tracking-[0.5em] uppercase text-[10px]">Protocolos de Segurança</span>
            <span className="w-12 h-[1px] bg-ecog-folha/50"></span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
            Instruções e <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-ecog-folha to-ecog-lima">Procedimentos.</span>
          </h3>
          <p className="text-ecog-mar max-w-2xl mx-auto text-lg font-light leading-relaxed opacity-80 italic">
            "A clareza no processo é o primeiro passo para a eficácia do tratamento."
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Menu Lateral */}
          <div className="lg:col-span-4 space-y-4">
            {PROCEDURES.map((proc) => (
              <button
                key={proc.id}
                onClick={() => {
                  setSelectedId(proc.id);
                  setActiveTab('info');
                }}
                className={`w-full text-left p-6 rounded-[30px] transition-all duration-500 border flex items-center gap-5 group relative overflow-hidden ${
                  selectedId === proc.id 
                    ? 'bg-ecog-folha border-ecog-folha shadow-[0_20px_40px_rgba(187,208,41,0.2)]' 
                    : 'bg-white/5 border-white/10 hover:border-ecog-folha/30 text-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all relative z-10 ${
                  selectedId === proc.id ? 'bg-ecog-espaco text-ecog-folha' : 'bg-ecog-folha/10 text-ecog-folha group-hover:scale-110'
                }`}>
                  <i className={`fa-solid ${proc.icon}`}></i>
                </div>
                <div className="flex-1 relative z-10">
                  <h4 className={`text-[11px] font-black uppercase tracking-widest ${selectedId === proc.id ? 'text-ecog-espaco' : 'text-white'}`}>
                    {proc.title.split('(')[0].trim()}
                  </h4>
                  <p className={`text-[9px] font-bold uppercase tracking-wider mt-1 ${selectedId === proc.id ? 'text-ecog-espaco/60' : 'text-ecog-mar/50'}`}>
                    {proc.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Área de Conteúdo */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[60px] overflow-hidden shadow-2xl border border-white/10 relative">
              
              {/* Tabs */}
              <div className="flex bg-ecog-nuvem/20 p-2 m-6 rounded-full border border-ecog-nuvem">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeTab === 'info' ? 'bg-ecog-espaco text-ecog-folha shadow-lg' : 'text-gray-400 hover:text-ecog-espaco'
                  }`}
                >
                  <i className="fa-solid fa-microscope mr-2"></i> Base Científica
                </button>
                <button
                  onClick={() => setActiveTab('journey')}
                  className={`flex-1 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeTab === 'journey' ? 'bg-ecog-espaco text-ecog-folha shadow-lg' : 'text-gray-400 hover:text-ecog-espaco'
                  }`}
                >
                  <i className="fa-solid fa-route mr-2"></i> Jornada do Paciente
                </button>
              </div>

              <div className="px-10 pb-14 pt-4 min-h-[500px]">
                {activeTab === 'info' ? (
                  <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-12">
                    <div className="bg-ecog-folha/5 p-10 rounded-[40px] border border-ecog-folha/10">
                      <h4 className="text-ecog-espaco font-black text-3xl tracking-tighter mb-6">{selectedProc.title}</h4>
                      <p className="text-gray-600 text-xl leading-relaxed font-light">{selectedProc.fullDescription}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-8 bg-ecog-espaco rounded-[40px] text-white">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-ecog-folha mb-6">Benefícios Clínicos</h5>
                        <ul className="space-y-4">
                          {selectedProc.benefits.map((ben, i) => (
                            <li key={i} className="flex items-center gap-4 text-sm font-medium text-ecog-mar">
                              <span className="w-1.5 h-1.5 bg-ecog-folha rounded-full"></span>
                              {ben}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-8 border border-ecog-nuvem rounded-[40px]">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-ecog-espaco mb-6">Indicações Principais</h5>
                        <ul className="space-y-4">
                          {selectedProc.indications.map((ind, i) => (
                            <li key={i} className="flex items-center gap-4 text-sm font-bold text-gray-600">
                              <span className="w-1.5 h-1.5 bg-ecog-folha rounded-full"></span>
                              {ind}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-5 duration-700">
                    <div className="relative pl-12 space-y-16">
                      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-ecog-folha via-ecog-nuvem to-ecog-folha"></div>

                      <div className="relative">
                        <div className="absolute -left-12 w-10 h-10 bg-ecog-espaco rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                          <i className="fa-solid fa-calendar-check text-ecog-folha text-[10px]"></i>
                        </div>
                        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-ecog-folha mb-4">Fase 01: Preparação</h5>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {selectedProc.preparation.map((prep, i) => (
                            <div key={i} className="bg-ecog-nuvem/30 p-5 rounded-2xl border border-ecog-nuvem flex items-center gap-4">
                              <i className="fa-solid fa-check text-ecog-folha text-xs"></i>
                              <p className="text-xs font-bold text-ecog-espaco leading-snug">{prep}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-12 w-10 h-10 bg-ecog-folha rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-pulse">
                          <i className="fa-solid fa-bolt text-ecog-espaco text-[10px]"></i>
                        </div>
                        <div className="bg-ecog-espaco/5 p-8 rounded-[40px] border-2 border-dashed border-ecog-folha/30">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-ecog-espaco mb-4">Fase 02: Durante a Sessão</h5>
                          <p className="text-2xl font-black text-ecog-espaco italic leading-tight mb-2">"{selectedProc.whatToExpect}"</p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-12 w-10 h-10 bg-ecog-espaco rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                          <i className="fa-solid fa-house-medical text-ecog-folha text-[10px]"></i>
                        </div>
                        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-ecog-folha mb-4">Fase 03: Pós-Procedimento</h5>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {selectedProc.afterCare.map((care, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-ecog-nuvem shadow-sm flex items-center gap-4">
                              <i className="fa-solid fa-leaf text-ecog-folha text-xs"></i>
                              <p className="text-xs font-bold text-gray-600 leading-snug">{care}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-ecog-espaco p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <i className="fa-solid fa-user-doctor text-ecog-folha text-2xl"></i>
                   </div>
                   <div>
                      <h6 className="text-white font-black text-xs uppercase tracking-widest">Dúvidas sobre o protocolo?</h6>
                      <p className="text-ecog-mar text-[10px] font-medium opacity-60">Fale com nossa equipe técnica.</p>
                   </div>
                </div>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-ecog-folha hover:bg-ecog-lima text-ecog-espaco px-14 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:scale-105 flex items-center gap-3"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  Solicitar Agendamento
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Procedures;
