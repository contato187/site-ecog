
import React from 'react';
import { CONDITIONS } from '../constants';
import EducationalAssistant from '../components/EducationalAssistant';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-32 bg-white relative">
      <div className="absolute inset-0 ecog-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Coluna de Conteúdo: Patologias */}
          <div className="lg:col-span-7">
            <div className="mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-ecog-folha"></span>
                <span className="text-ecog-folha font-black uppercase tracking-[0.4em] text-[10px]">Área Educativa</span>
              </div>
              <h3 className="text-4xl md:text-7xl font-black text-ecog-espaco tracking-tighter mb-8 leading-[0.9]">
                O Saber que <br/><span className="text-ecog-folha">Liberta a Mente.</span>
              </h3>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl">
                Entender a base biológica de cada condição é o primeiro passo para o sucesso terapêutico. Explore nosso atlas de conhecimento clínico.
              </p>
            </div>

            <div className="grid gap-6">
              {CONDITIONS.map((condition) => (
                <div key={condition.id} className="group p-8 rounded-[45px] bg-white border border-ecog-nuvem hover:border-ecog-folha/30 hover:shadow-[0_30px_60px_-15px_rgba(25,37,67,0.1)] transition-all duration-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ecog-folha/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-center gap-4 mb-6">
                     <span className="px-4 py-1.5 bg-ecog-espaco text-ecog-folha text-[8px] font-black uppercase tracking-widest rounded-full">{condition.category}</span>
                     <div className="h-[1px] flex-1 bg-ecog-nuvem/50"></div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-ecog-espaco mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{condition.name}</h3>
                  <p className="text-gray-500 mb-8 text-lg font-light leading-relaxed">{condition.details}</p>
                  
                  <div className="flex items-start gap-6 p-8 bg-ecog-nuvem/20 rounded-[35px] border border-transparent group-hover:border-ecog-folha/10 group-hover:bg-ecog-folha/5 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-ecog-nuvem group-hover:scale-110 transition-transform">
                       <i className="fa-solid fa-dna text-ecog-folha text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black text-ecog-espaco/40 uppercase tracking-widest mb-1">Aplicação na Neuromodulação</h4>
                      <p className="text-md font-bold text-ecog-espaco leading-snug">
                        {condition.treatmentRole}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Citação Técnica Científica */}
            <div className="mt-12 p-12 bg-ecog-espaco rounded-[50px] text-white relative group overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-ecog-folha/10 to-transparent opacity-50"></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <i className="fa-solid fa-quote-left text-5xl text-ecog-folha opacity-30"></i>
                  <p className="text-2xl font-light leading-relaxed italic text-ecog-mar/90">
                    "A neuromodulação moderna permite o diálogo direto com os circuitos neurais, oferecendo precisão onde a farmacologia muitas vezes encontra limites."
                  </p>
               </div>
            </div>
          </div>

          {/* Coluna do Assistente IA: Upgrade de Design */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="mb-10 text-right md:text-left">
                <div className="inline-block px-4 py-1 bg-ecog-folha/10 rounded-full mb-4">
                   <span className="text-ecog-folha text-[9px] font-black uppercase tracking-[0.3em]">IA Educativa Ativa</span>
                </div>
                <h4 className="text-3xl font-black text-ecog-espaco tracking-tighter uppercase mb-2">NeuroMentor AI</h4>
                <p className="text-sm text-gray-400 font-medium italic">Sua ponte entre a dúvida e a ciência.</p>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-ecog-folha to-ecog-lima rounded-[48px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse-slow"></div>
                <div className="relative">
                  <EducationalAssistant />
                </div>
              </div>

              <div className="mt-10 p-10 bg-ecog-nuvem/30 rounded-[45px] border border-ecog-nuvem relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-ecog-folha opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-award text-ecog-folha"></i>
                  </div>
                  <h5 className="font-black text-ecog-espaco text-[10px] uppercase tracking-widest">Rigor e Ética</h5>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Informações baseadas em evidências do <span className="text-ecog-espaco font-bold">Journal of Neuropsychiatry</span> e diretrizes internacionais de neuromodulação.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
