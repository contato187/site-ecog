
import { Procedure, Condition, SocialLink } from './types';

export const WHATSAPP_URL = "https://wa.me/5543991001500?text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista%20da%20ECOG.";

export const PROCEDURES: Procedure[] = [
  {
    id: 'tms',
    title: 'Estimulação Magnética Transcraniana (EMT/TMS)',
    description: 'Técnica não invasiva que utiliza campos magnéticos para estimular áreas específicas do cérebro.',
    fullDescription: 'A EMT é um procedimento indolor e seguro que não requer anestesia. Através de uma bobina posicionada sobre o couro cabeludo, pulsos magnéticos modulam a atividade neuronal. É uma tecnologia avançada amplamente utilizada para tratar depressão resistente e outras condições neuropsiquiátricas.',
    benefits: ['Não invasivo', 'Sem efeitos colaterais sistêmicos', 'Paciente acordado durante a sessão', 'Retorno imediato às atividades'],
    indications: ['Depressão Maior', 'Transtorno Obsessivo-Compulsivo (TOC)', 'Alucinações Auditivas na Esquizofrenia', 'Recuperação Pós-AVC'],
    preparation: [
      'Não é necessário jejum.',
      'Retire objetos metálicos da cabeça e pescoço.',
      'Informe sobre implantes metálicos ou marca-passo.',
      'Mantenha sua medicação habitual, a menos que orientado o contrário.'
    ],
    whatToExpect: 'Durante a sessão, você sentirá toques leves no couro cabeludo, semelhantes a um "pica-pau". O ruído é rítmico. Você pode ler ou ouvir música durante o processo.',
    afterCare: [
      'Você pode dirigir imediatamente após a sessão.',
      'Pode retornar ao trabalho ou atividades físicas.',
      'Leves dores de cabeça podem ocorrer e cessam rapidamente.'
    ],
    duration: '20 a 40 minutos',
    icon: 'fa-magnet',
    hasAnvisa: true
  },
  {
    id: 'neurofeedback',
    title: 'Neurofeedback',
    description: 'Treinamento cerebral de alta precisão para autorregulação da atividade neuronal.',
    fullDescription: 'Utilizamos tecnologia avançada de monitoramento neurofisiológico com certificação técnica rigorosa. O treinamento permite ao paciente aprender a modular seus próprios padrões cerebrais, otimizando o foco, sono e controle emocional através de feedback em tempo real.',
    benefits: ['Precisão Diagnóstica', 'Alta resolução de sinal', 'Sem uso de medicamentos', 'Resultados de longo prazo'],
    indications: ['TDAH', 'Transtornos do Sono', 'Ansiedade e Estresse', 'Alta Performance Cognitiva'],
    preparation: [
      'Cabelo limpo e seco (sem gel ou spray).',
      'Evite cafeína excessiva 3 horas antes.',
      'Dorme bem na noite anterior.'
    ],
    whatToExpect: 'Sensores são colocados no couro cabeludo (sem agulhas). Você interagirá com um jogo ou vídeo controlado apenas pela sua atividade cerebral.',
    afterCare: [
      'Nenhuma restrição física.',
      'Sensação de relaxamento ou cansaço mental leve é comum.'
    ],
    duration: '45 a 60 minutos',
    icon: 'fa-wave-square',
    hasAnvisa: true
  },
  {
    id: 'vr',
    title: 'Realidade Virtual (RV) Diagnóstica',
    description: 'Avaliação neuropsicológica imersiva para diagnóstico de funções cognitivas.',
    fullDescription: 'A RV Diagnóstica na ECOG revoluciona a psicometria tradicional. Através de ambientes virtuais controlados e gamificados, capturamos dados objetivos sobre atenção, memória, tempo de reação e controle inibitório. É uma ferramenta fundamental para diagnósticos precisos de TDAH e declínios cognitivos em adultos e crianças.',
    benefits: ['Psicometria digital de alta precisão', 'Ambientes de teste controlados', 'Engajamento superior ao teste de papel', 'Dados objetivos de performance neural'],
    indications: ['Avaliação de TDAH e Dificuldades de Foco', 'Diagnóstico Precoce de Declínio Cognitivo', 'Mapeamento de Funções Executivas', 'Psicometria Digital Avançada'],
    preparation: [
      'Uso de lentes de contato (se usar óculos de grau muito volumosos).',
      'Estar bem descansado para garantir precisão nos dados.',
      'Não estar sob efeito de sedativos ou álcool.'
    ],
    whatToExpect: 'Você usará óculos de Realidade Virtual e entrará em cenários simulados (como uma sala de aula ou escritório) onde deverá realizar tarefas específicas enquanto o sistema monitora seu desempenho.',
    afterCare: [
      'Pode ocorrer uma leve desorientação momentânea nos primeiros 5 minutos.',
      'Após o procedimento, você receberá um relatório detalhado com os dados coletados.'
    ],
    duration: '40 a 60 minutos',
    icon: 'fa-vr-cardboard',
    hasAnvisa: false
  },
  {
    id: 'tdcs',
    title: 'Estimulação por Corrente Contínua (ETCC/tDCS)',
    description: 'Aplicação de corrente elétrica de baixa intensidade para modular a excitabilidade cortical.',
    fullDescription: 'A tDCS utiliza uma corrente elétrica de baixíssima intensidade aplicada via eletrodos no couro cabeludo. Dependendo da polaridade, ela pode aumentar ou diminuir a excitabilidade dos neurônios, sendo uma ferramenta poderosa para reabilitação e tratamento de dor.',
    benefits: ['Custo-benefício excelente', 'Equipamento portátil', 'Efeitos de longa duração', 'Baixa incidência de desconforto'],
    indications: ['Dor Crônica (Fibromialgia)', 'Reabilitação Motora', 'Melhora Cognitiva', 'Afasias'],
    preparation: [
      'Pele do rosto e couro cabeludo limpos.',
      'Hidratação adequada é recomendada.'
    ],
    whatToExpect: 'Uma leve sensação de formigamento ou coceira no local dos eletrodos no início da sessão.',
    afterCare: [
      'Leve vermelhidão na pele pode ocorrer e some em minutos.',
      'Pode seguir a rotina normalmente.'
    ],
    duration: '20 a 30 minutos',
    icon: 'fa-bolt',
    hasAnvisa: true
  }
];

export const CONDITIONS: Condition[] = [
  {
    id: 'depression',
    name: 'Depressão Resistente',
    summary: 'Quando os medicamentos convencionais não apresentam a resposta esperada.',
    details: 'A depressão resistente afeta cerca de 30% dos pacientes. A neuromodulação atua diretamente nos circuitos neurais desregulados, oferecendo uma nova via de tratamento.',
    treatmentRole: 'A TMS é indicada para casos onde 2 ou mais antidepressivos falharam.',
    category: 'Psiquiatria'
  },
  {
    id: 'chronic-pain',
    name: 'Dor Crônica e Fibromialgia',
    summary: 'Dores persistentes que impactam severamente a qualidade de vida.',
    details: 'Muitas vezes a dor crônica está ligada a uma sensibilização central do sistema nervoso.',
    treatmentRole: 'A tDCS ajuda a modular o limiar de dor do cérebro.',
    category: 'Dor Crônica'
  },
  {
    id: 'parkinson',
    name: 'Doença de Parkinson',
    summary: 'Transtorno degenerativo do sistema nervoso central que afeta o movimento.',
    details: 'Além dos tremores, afeta a marcha e o equilíbrio.',
    treatmentRole: 'A neuromodulação pode auxiliar na melhora dos sintomas motores e cognitivos.',
    category: 'Neurologia'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', url: 'https://instagram.com/ecog.neuro', icon: 'fa-brands fa-instagram' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/ecog-neuro', icon: 'fa-brands fa-linkedin' },
  { platform: 'YouTube', url: 'https://youtube.com/ecog-neuro', icon: 'fa-brands fa-youtube' },
  { platform: 'Facebook', url: 'https://facebook.com/ecog.neuro', icon: 'fa-brands fa-facebook' }
];
