
import React from 'react';

const Hero: React.FC = () => {
  // Raios sincronizados com a nova proporção 18-18-18
  const R_CORE = 16.67;      
  const R_INT_INNER = 16.67;
  const R_INT_OUTER = 33.33; 
  const R_EXT_INNER = 33.33;
  const R_EXT_OUTER = 50.0; 
  const brandGreen = '#bbd029';

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-ecog-espaco">
      {/* Background Decorativo - Geometria da Marca Sutil */}
      <div className="absolute inset-0 z-0 opacity-5 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-[150vw] h-[150vw] min-w-[1000px] animate-pulse-slow">
          <g className="origin-center scale-150">
            {/* Topo Externo */}
            <path d={`M${50 - R_EXT_OUTER} 50 A ${R_EXT_OUTER} ${R_EXT_OUTER} 0 0 1 ${50 + R_EXT_OUTER} 50 L ${50 + R_EXT_INNER} 50 A ${R_EXT_INNER} ${R_EXT_INNER} 0 0 0 ${50 - R_EXT_INNER} 50 Z`} fill={brandGreen} />
            {/* Cauda */}
            <path d={`M${50 - R_INT_OUTER} 50 A ${R_INT_OUTER} ${R_INT_OUTER} 0 0 0 50 ${50 + R_INT_OUTER} L 50 ${50 + R_INT_INNER} A ${R_INT_INNER} ${R_INT_INNER} 0 0 1 ${50 - R_INT_INNER} 50 Z`} fill={brandGreen} />
            {/* Núcleo */}
            <path d={`M${50 - R_CORE} 50 A ${R_CORE} ${R_CORE} 0 0 1 ${50 + R_CORE} 50 Z`} fill={brandGreen} />
          </g>
        </svg>
      </div>
      
      {/* Overlay Pattern sutil */}
      <div className="absolute inset-0 z-0 opacity-10 ecog-pattern"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-ecog-folha"></span>
            <span className="text-ecog-folha font-bold tracking-[0.3em] uppercase text-xs">Neuromodulação e Cognição</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            O futuro da mente <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ecog-folha to-ecog-lima">em alta definição.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-ecog-ceu mb-12 leading-relaxed max-w-2xl font-light">
            Soluções baseadas em neurociência avançada e tecnologia de precisão para o equilíbrio e performance cerebral.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <a 
              href="#procedures" 
              className="px-12 py-5 bg-ecog-folha hover:bg-ecog-lima text-ecog-espaco font-black rounded-full transition-all shadow-2xl hover:scale-105 uppercase tracking-widest text-xs text-center"
            >
              Nossos Procedimentos
            </a>
            <a 
              href="#education" 
              className="px-12 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/20 font-bold rounded-full transition-all uppercase tracking-widest text-xs text-center"
            >
              Educação e Ciência
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden md:block">
        <div className="flex flex-col items-center gap-4 text-ecog-mar/40">
           <span className="[writing-mode:vertical-lr] uppercase tracking-[0.5em] text-[10px] font-bold">Role para explorar</span>
           <div className="w-[1px] h-20 bg-gradient-to-b from-ecog-folha to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
