import React, { useState } from 'react';
import VideoGenerator from '../components/VideoGenerator';

const VisualExperience: React.FC = () => {
  const [showLab, setShowLab] = useState(false);

  return (
    <section id="experience" className="py-32 bg-ecog-espaco relative overflow-hidden">
      <div className="absolute inset-0 ecog-pattern opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-ecog-folha"></span>
            <span className="text-ecog-folha font-bold tracking-[0.3em] uppercase text-xs">Inovação ECOG</span>
            <span className="w-12 h-[2px] bg-ecog-folha"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
            Neurociência <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-ecog-folha to-ecog-lima">Aplicada.</span>
          </h2>
          
          {!showLab && (
            <button 
              onClick={() => setShowLab(true)}
              className="mt-10 px-8 py-4 border border-ecog-folha/30 text-ecog-folha rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-ecog-folha hover:text-ecog-espaco transition-all"
            >
              <i className="fa-solid fa-flask-vial mr-2"></i> Acessar Laboratório de Simulação
            </button>
          )}
        </div>

        {showLab ? (
          <div className="animate-in fade-in zoom-in-95 duration-700">
             <VideoGenerator />
             <div className="mt-8 text-center">
                <button onClick={() => setShowLab(false)} className="text-ecog-mar/50 hover:text-ecog-folha text-[9px] font-black uppercase tracking-widest transition-colors">
                  <i className="fa-solid fa-eye-slash mr-2"></i> Minimizar Laboratório
                </button>
             </div>
          </div>
        ) : (
          /* Galeria de Cards com Vídeos Reais */
          <div className="grid md:grid-cols-3 gap-8 animate-in fade-in duration-1000">
             
             {/* Simulação 01 - TMS (Vídeo Imgur Ajustado para esconder TCOG) */}
             <div className="group relative aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-black shadow-2xl">
                {/* Container de vídeo com offset superior para ocultar erro da IA */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover scale-125 origin-bottom opacity-60 group-hover:opacity-100 transition-all duration-700"
                  >
                    <source src="https://i.imgur.com/o2GVnvt.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ecog-espaco via-ecog-espaco/20 to-transparent z-10"></div>
                <div className="absolute bottom-8 left-8 z-20">
                   <span className="text-ecog-folha text-[9px] font-black uppercase tracking-widest mb-2 block">Simulação 01</span>
                   <h4 className="text-white font-bold text-xl uppercase tracking-tighter">Dinâmica de Pulso Magnético</h4>
                </div>
             </div>

             {/* Simulação 02 - Realidade Virtual (Nesplora Mimetizada) */}
             <div className="group relative aspect-video rounded-[40px] overflow-hidden border border-ecog-folha/40 bg-black shadow-[0_0_40px_rgba(187,208,41,0.25)]">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xl scale-110"
                >
                  <source src="https://i.imgur.com/c471wof.mp4" type="video/mp4" />
                </video>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                >
                  <source src="https://i.imgur.com/c471wof.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-ecog-espaco/40 via-transparent to-transparent z-20 pointer-events-none"></div>
                <div className="absolute bottom-8 left-8 z-30">
                   <span className="text-ecog-folha text-[9px] font-black uppercase tracking-widest mb-2 block">Simulação 02</span>
                   <h4 className="text-white font-bold text-xl uppercase tracking-tighter">Avaliação em VR (Nesplora)</h4>
                </div>
             </div>

             {/* Simulação 03 - Redes Neurais (Aguardando seu vídeo do Studio) */}
             <div className="group relative aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-ecog-espaco via-transparent to-transparent z-10"></div>
                <div className="absolute bottom-8 left-8 z-20">
                   <span className="text-ecog-folha text-[9px] font-black uppercase tracking-widest mb-2 block">Simulação 03</span>
                   <h4 className="text-white font-bold text-xl uppercase tracking-tighter">Mapeamento de Redes Neurais</h4>
                </div>
                <div className="w-full h-full flex items-center justify-center text-ecog-mar/20 italic">
                   <i className="fa-solid fa-dna text-5xl opacity-20 group-hover:scale-110 transition-transform"></i>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] border-[1px] border-ecog-folha/10 rounded-full -z-10 animate-pulse-slow"></div>
    </section>
  );
};

export default VisualExperience;
