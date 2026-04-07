
import React from 'react';
import { SOCIAL_LINKS, WHATSAPP_URL } from '../constants';

const Contact: React.FC = () => {
  const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Rua+João+Wyclif,+111+-+Londrina+-+PR";

  return (
    <section id="contact" className="py-32 bg-ecog-noite text-white relative overflow-hidden">
      {/* Visual Support Element */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full border-[50px] border-white/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="mb-12">
              <h2 className="text-sm font-black text-ecog-folha uppercase tracking-[0.5em] mb-4">Contato</h2>
              <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 leading-tight">
                Transformação ao <br/> seu alcance.
              </h3>
              <p className="text-ecog-mar text-xl font-light leading-relaxed mb-12">
                Nossa equipe está preparada para orientar sua jornada de aprimoramento cerebral.
              </p>
            </div>

            <div className="grid gap-10">
              <a 
                href={GOOGLE_MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-8 group hover:bg-white/5 p-4 rounded-3xl transition-all"
              >
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:border-ecog-folha">
                  <i className="fa-solid fa-location-dot text-ecog-folha text-xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-ecog-folha transition-colors">Localização</h4>
                  <p className="text-ecog-ceu leading-relaxed">
                    Rua João Wyclif, 111 - Sala 2601<br/>
                    Centro Comercial Jardim Sul<br/>
                    Londrina - PR
                  </p>
                </div>
              </a>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-8 group hover:bg-white/5 p-4 rounded-3xl transition-all"
              >
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:border-ecog-folha">
                  <i className="fa-solid fa-at text-ecog-folha text-xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-ecog-folha transition-colors">Canais Digitais</h4>
                  <p className="text-ecog-ceu">contato@ecog.com.br<br/>+55 (43) 99100-1500 (WhatsApp)</p>
                </div>
              </a>
            </div>

            <div className="mt-20">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6">Conecte-se com o futuro</h4>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.platform}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 border border-white/20 hover:border-ecog-folha hover:bg-ecog-folha hover:text-ecog-espaco rounded-full flex items-center justify-center transition-all text-2xl group"
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-ecog-folha/10 rounded-[50px] blur-2xl"></div>
            <div className="relative bg-white rounded-[50px] p-10 md:p-14 shadow-2xl overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-ecog-nuvem/30 rounded-bl-[100px]"></div>
               <h3 className="text-3xl font-black text-ecog-espaco tracking-tighter mb-8">Dúvidas e Sugestões</h3>
               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <input type="text" className="w-full bg-ecog-nuvem/20 border-b-2 border-ecog-nuvem focus:border-ecog-folha px-0 py-4 text-ecog-espaco font-bold focus:outline-none transition-all placeholder:text-gray-400 placeholder:font-normal" placeholder="Qual seu nome?" />
                    <input type="email" className="w-full bg-ecog-nuvem/20 border-b-2 border-ecog-nuvem focus:border-ecog-folha px-0 py-4 text-ecog-espaco font-bold focus:outline-none transition-all placeholder:text-gray-400 placeholder:font-normal" placeholder="Seu melhor e-mail?" />
                    <textarea rows={4} className="w-full bg-ecog-nuvem/20 border-b-2 border-ecog-nuvem focus:border-ecog-folha px-0 py-4 text-ecog-espaco font-bold focus:outline-none transition-all placeholder:text-gray-400 placeholder:font-normal" placeholder="Como podemos transformar sua saúde?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-ecog-espaco hover:bg-ecog-noite text-white font-black py-5 rounded-full transition-all shadow-xl uppercase tracking-[0.2em] text-sm group flex items-center justify-center gap-3">
                    Enviar Mensagem
                    <i className="fa-solid fa-chevron-right text-ecog-folha transition-transform group-hover:translate-x-2"></i>
                  </button>
                  <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest mt-6">
                    Site informativo. Sem agendamentos diretos via formulário.
                  </p>
               </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
