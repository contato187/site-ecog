
import React from 'react';

const Institutional: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative z-20 overflow-visible">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ecog-nuvem/10 -z-10 rounded-l-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          
          {/* Lado das Imagens: Composição Dupla com Fotos Reais */}
          <div className="relative order-2 lg:order-1">
            {/* Imagem Principal (Substituída conforme solicitado) */}
            <div className="relative z-10 w-[85%] aspect-[4/5] rounded-[45px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(25,37,67,0.3)] border-[6px] border-white bg-ecog-nuvem">
              <img 
                src="https://i.imgur.com/fsXQYBQ.jpeg" 
                alt="Ambiente de recepção da clínica ECOG" 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1200";
                }}
              />
            </div>

            {/* Imagem Secundária (Atendimento/Detalhe) */}
            <div className="absolute -bottom-12 -right-4 md:right-0 z-20 w-[60%] aspect-square rounded-[35px] overflow-hidden shadow-[0_30px_60px_-10px_rgba(25,37,67,0.4)] border-[6px] border-white bg-ecog-nuvem transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://i.imgur.com/GIFujVV.jpeg" 
                alt="Detalhe de atendimento clínico na ECOG" 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800";
                }}
              />
            </div>

            {/* Badge Flutuante de Credibilidade */}
            <div className="absolute top-10 -left-6 z-30 bg-ecog-espaco/90 backdrop-blur-md px-6 py-3 rounded-[20px] border border-white/20 shadow-2xl hidden md:block">
              <span className="text-[9px] font-black text-ecog-folha uppercase tracking-[0.3em] flex items-center gap-3">
                <i className="fa-solid fa-shield-halved text-xs"></i>
                Segurança e Precisão Clínica
              </span>
            </div>

            {/* Adornos de Design Geométrico */}
            <div className="absolute -top-10 -left-10 w-48 h-48 border-t-[10px] border-l-[10px] border-ecog-folha/20 rounded-tl-[60px] -z-10"></div>
          </div>
          
          {/* Lado do Conteúdo: Texto e Visão */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[2px] bg-ecog-folha"></div>
              <h2 className="text-sm font-black text-ecog-folha uppercase tracking-[0.4em]">Institucional</h2>
            </div>
            
            <h3 className="text-5xl md:text-7xl font-black text-ecog-espaco mb-12 leading-[1.1] tracking-tighter">
              A Ciência de <br/>Acolher e <span className="text-ecog-folha">Transformar.</span>
            </h3>
            
            <div className="space-y-10">
              <p className="text-gray-600 text-2xl leading-relaxed font-light">
                A <strong>ECOG</strong> é um centro especializado que une neurociência de ponta a um atendimento humano diferenciado no coração de Londrina.
              </p>

              <div className="grid gap-8">
                <div className="flex gap-8 group">
                  <div className="w-20 h-20 bg-ecog-nuvem/30 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-ecog-folha/10 transition-colors">
                    <i className="fa-solid fa-microchip text-ecog-espaco text-2xl group-hover:text-ecog-folha transition-colors"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-ecog-espaco mb-2">Tecnologia Avançada</h4>
                    <p className="text-gray-500 font-light leading-relaxed">
                      Utilizamos equipamentos de última geração em neuromodulação e diagnóstico neurofisiológico, garantindo total precisão clínica.
                    </p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="w-20 h-20 bg-ecog-nuvem/30 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-ecog-folha/10 transition-colors">
                    <i className="fa-solid fa-leaf text-ecog-espaco text-2xl group-hover:text-ecog-folha transition-colors"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-ecog-espaco mb-2">Ambiente Acolhedor</h4>
                    <p className="text-gray-500 font-light leading-relaxed">
                      Um espaço projetado para oferecer tranquilidade e privacidade durante sua jornada de recuperação e bem-estar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Institutional;
