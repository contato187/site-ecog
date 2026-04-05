
import React from 'react';

const VisualSynthesis: React.FC = () => {
  // Array de imagens para a galeria
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1200",
      title: "Ambiente Clínico",
      category: "Conforto"
    },
    {
      url: "https://i.imgur.com/GIFujVV.jpeg",
      title: "Tecnologia TMS",
      category: "Precisão"
    },
    {
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
      title: "Neurociência Aplicada",
      category: "Ciência"
    },
    {
      url: "https://i.imgur.com/fsXQYBQ.jpeg",
      title: "Recepção ECOG",
      category: "Acolhimento"
    }
  ];

  return (
    <section id="synthesis" className="py-32 bg-ecog-nuvem/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-ecog-folha"></span>
            <span className="text-ecog-folha font-bold tracking-[0.3em] uppercase text-xs">Excelência</span>
            <span className="w-12 h-[2px] bg-ecog-folha"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-ecog-espaco tracking-tighter mb-4 leading-tight">
            Nossa <span className="text-ecog-folha">Estrutura.</span>
          </h2>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Conheça o espaço onde a tecnologia de ponta encontra o cuidado humanizado para transformar sua saúde cerebral.
          </p>
        </div>

        {/* Grid de 4 Slots de Fotos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {galleryImages.map((img, i) => (
            <div 
              key={i} 
              className="group relative aspect-[4/5] bg-white rounded-[40px] overflow-hidden shadow-sm border border-ecog-nuvem hover:shadow-2xl hover:border-ecog-folha/30 transition-all duration-500"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Informativo ao passar o mouse */}
              <div className="absolute inset-0 bg-gradient-to-t from-ecog-espaco via-ecog-espaco/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-ecog-folha text-[9px] font-black uppercase tracking-[0.2em] mb-2">{img.category}</span>
                <h4 className="text-white font-bold text-xl">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elementos Decorativos */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] border-[1px] border-ecog-folha/10 rounded-full -z-10"></div>
      <div className="absolute bottom-[-5%] left-[-2%] w-[300px] h-[300px] bg-ecog-folha/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default VisualSynthesis;
