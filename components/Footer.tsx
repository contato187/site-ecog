import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ecog-espaco py-24 border-t border-white/5 relative overflow-hidden">
      {/* Brand Arc Support no Footer */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] border-[20px] border-ecog-folha/5 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-20 mb-24">
          <div className="md:col-span-2">
            <div className="mb-10">
              <Logo variant="light" />
            </div>
            <p className="max-w-md text-ecog-mar leading-relaxed font-light mb-10 text-lg">
              Excelência em neuromodulação clínica e aprimoramento cognitivo. Transformando vidas através da inovação e rigor científico.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
               <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-ecog-folha mb-3">Responsável Técnico</span>
                  <span className="text-white font-bold text-sm block">Dr. Breno Santos</span>
                  <span className="block text-[10px] text-ecog-ceu mt-1 uppercase font-bold tracking-tighter">CRM-PR 37798</span>
               </div>
               <div className="w-[1px] h-12 bg-white/10 hidden sm:block"></div>
               <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-ecog-folha mb-3">Qualificação Médica</span>
                  <span className="text-white font-bold text-sm block">Neurologia (RQE 22068)</span>
                  <span className="text-white font-bold text-sm block">Neurorradiologia (RQE 27948)</span>
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.3em]">Navegação</h4>
            <ul className="space-y-5 text-sm">
              <li><a href="#about" className="text-ecog-ceu hover:text-ecog-folha transition-colors">A Marca</a></li>
              <li><a href="#procedures" className="text-ecog-ceu hover:text-ecog-folha transition-colors">Portfólio Clínico</a></li>
              <li><a href="#education" className="text-ecog-ceu hover:text-ecog-folha transition-colors">Área Educativa</a></li>
              <li><a href="#contact" className="text-ecog-ceu hover:text-ecog-folha transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.3em]">Informações</h4>
            <ul className="space-y-4 text-[11px] leading-relaxed text-ecog-mar/60">
              <li>
                <strong className="text-ecog-folha block mb-1">NOTA LEGAL AI</strong>
                O NeuroMentor AI oferece suporte informativo e educativo. Não realiza diagnósticos nem substitui a consulta médica.
              </li>
              <li>
                <strong className="text-ecog-folha block mb-1">CONFORMIDADE</strong>
                Em total acordo com as normas do CFM e LGPD para proteção de dados sensíveis.
              </li>
              <li className="pt-2 border-t border-white/5 flex flex-col gap-2">
                <a href="#" className="text-ecog-ceu hover:text-white transition-colors uppercase tracking-widest text-[9px]">Privacidade</a>
                <a href="#" className="text-ecog-ceu hover:text-white transition-colors uppercase tracking-widest text-[9px]">Direitos do Paciente</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-ecog-ceu/40">
          <p>
            &copy; {new Date().getFullYear()} ECOG Londrina — CRM-PR 37798. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-ecog-folha rounded-full"></span>
               Inovação em Neurociência
            </span>
            <span className="opacity-40">Londrina - PR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
