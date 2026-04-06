import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ecog-espaco py-24 border-t border-white/5 relative overflow-hidden">
      {/* Brand Arc Support no Footer - Elemento Decorativo */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] border-[20px] border-ecog-folha/5 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-20 mb-24">
          
          {/* Coluna 1: Marca e Responsabilidade Médica */}
          <div className="md:col-span-2">
            <div className="mb-10">
              <Logo variant="light" />
            </div>
            <p className="max-w-md text-ecog-mar leading-relaxed font-light mb-10 text-lg">
              Excelência em neuromodulação clínica e aprimoramento cognitivo. Tecnologia de ponta e humanização no coração de Londrina.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
               <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-ecog-folha mb-3">Direção Técnica</span>
                  <span className="text-white font-bold text-sm block">Dr. Breno Santos</span>
                  <span className="block text-[10px] text-ecog-ceu mt-1 uppercase font-bold tracking-tighter">CRM-PR 37798</span>
               </div>
               <div className="w-[1px] h-12 bg-white/10 hidden sm:block"></div>
               <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-ecog-folha mb-3">Especialidades</span>
                  <span className="text-white font-bold text-sm block">Neurologia (RQE 22068)</span>
                  <span className="text-white font-bold text-sm block">Neurorradiologia (RQE 27948)</span>
               </div>
            </div>
          </div>
          
          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.3em]">Navegação</h4>
            <ul className="space-y-5 text-sm">
              <li><a href="#about" className="text-ecog-ceu hover:text-ecog-folha transition-colors">A Marca</a></li>
              <li><a href="#procedures" className="text-ecog-ceu hover:text-ecog-folha transition-colors">Portfólio Clínico</a></li>
              <li><a href="#education" className="text-ecog-ceu hover:text-ecog-folha transition-colors">Área Educativa</a></li>
              <li><a href="#contact" className="text-ecog-ceu hover:text-ecog-folha transition-colors">Contato</a></li>
            </ul>
          </div>
          
          {/* Coluna 3: Segurança e Ética (Refinada) */}
          <div>
            <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.3em]">Segurança e Ética</h4>
            <ul className="space-y-6 text-[11px] leading-relaxed text-ecog-mar/70">
              <li>
                <strong className="text-ecog-folha block mb-1 uppercase tracking-widest text-[9px]">Privacidade (LGPD)</strong>
                Seus dados e diálogos com o NeuroMentor são protegidos por criptografia. Não compartilhamos informações clínicas com terceiros.
              </li>
              <li>
                <strong className="text-ecog-folha block mb-1 uppercase tracking-widest text-[9px]">Direitos do Paciente</strong>
                Garantimos o sigilo médico absoluto, o direito à informação clara sobre procedimentos e o acolhimento humanizado.
              </li>
              <li>
                <strong className="text-ecog-folha block mb-1 uppercase tracking-widest text-[9px]">Consentimento</strong>
                Esta IA possui fins exclusivamente educativos e não substitui o diagnóstico clínico do Dr. Breno Santos.
              </li>
            </ul>
          </div>
        </div>
        
        {/* Base do Footer: Copyright e Localização */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-ecog-ceu/40">
          <p>
            &copy; {new Date().getFullYear()} ECOG Londrina — Dr. Breno Santos (CRM-PR 37798)
          </p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-ecog-folha rounded-full"></span>
               Londrina, PR — Brasil
            </span>
            <span className="opacity-40 tracking-widest">Neurociência de Alta Performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export default Footer;
