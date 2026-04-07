
import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * ECOG Logo - Versão "Pure Symbol"
 * Exibe exclusivamente o símbolo geométrico baseado nas proporções 18-18-18.
 */
const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  className = ''
}) => {
  const brandGreen = '#bbd029';
  const bgColor = variant === 'light' ? '#192543' : '#FFFFFF';

  // Raios calculados para proporção 18-18-18 (Símbolo)
  const R_CORE = 16.67;
  const R_INT_INNER = 16.67;
  const R_INT_OUTER = 33.33;
  const R_EXT_INNER = 33.33;
  const R_EXT_OUTER = 50.0;

  return (
    <div className={`flex items-center select-none ${className}`}>
      {/* Símbolo ECOG - Proporções 18-18-18 */}
      <svg 
        width="56" 
        height="56" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Camada 1: ANEL EXTERNO */}
        <path d={`M${50 - R_EXT_OUTER} 50 A ${R_EXT_OUTER} ${R_EXT_OUTER} 0 0 1 ${50 + R_EXT_OUTER} 50 L ${50 + R_EXT_INNER} 50 A ${R_EXT_INNER} ${R_EXT_INNER} 0 0 0 ${50 - R_EXT_INNER} 50 Z`} fill={brandGreen} />
        <path d={`M${50 + R_EXT_OUTER} 50 A ${R_EXT_OUTER} ${R_EXT_OUTER} 0 0 1 ${50 - R_EXT_OUTER} 50 L ${50 - R_EXT_INNER} 50 A ${R_EXT_INNER} ${R_EXT_INNER} 0 0 0 ${50 + R_EXT_INNER} 50 Z`} fill={bgColor} />

        {/* Camada 2: ANEL MÉDIO */}
        <path d={`M${50 - R_INT_OUTER} 50 A ${R_INT_OUTER} ${R_INT_OUTER} 0 0 1 ${50 + R_INT_OUTER} 50 L ${50 + R_INT_INNER} 50 A ${R_INT_INNER} ${R_INT_INNER} 0 0 0 ${50 - R_INT_INNER} 50 Z`} fill={bgColor} />
        <path d={`M${50 - R_INT_OUTER} 50 A ${R_INT_OUTER} ${R_INT_OUTER} 0 0 0 50 ${50 + R_INT_OUTER} L 50 ${50 + R_INT_INNER} A ${R_INT_INNER} ${R_INT_INNER} 0 0 1 ${50 - R_INT_INNER} 50 Z`} fill={brandGreen} />
        <path d={`M50 ${50 + R_INT_OUTER} A ${R_INT_OUTER} ${R_INT_OUTER} 0 0 0 ${50 + R_INT_OUTER} 50 L ${50 + R_INT_INNER} 50 A ${R_INT_INNER} ${R_INT_INNER} 0 0 1 50 ${50 + R_INT_INNER} Z`} fill={bgColor} />

        {/* Camada 3: NÚCLEO CENTRAL */}
        <path d={`M${50 - R_CORE} 50 A ${R_CORE} ${R_CORE} 0 0 1 ${50 + R_CORE} 50 Z`} fill={brandGreen} />
        <path d={`M${50 + R_CORE} 50 A ${R_CORE} ${R_CORE} 0 0 1 ${50 - R_CORE} 50 Z`} fill={bgColor} />
      </svg>
    </div>
  );
};

export default Logo;
