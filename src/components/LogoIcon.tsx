import React from 'react';

interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className = "w-8 h-8" }: LogoIconProps) {
  return (
    <div className={`${className} rounded-xl shadow-sm overflow-hidden bg-white border border-slate-200/40 relative flex-shrink-0`}>
      <img 
        src="/logo.jpg" 
        alt="ClearFinCalc Logo Mark"
        width={100}
        height={66}
        className="absolute max-w-none" 
        style={{
          width: '215%',
          height: 'auto',
          left: '-57%',
          top: '-7%',
        }}
      />
    </div>
  );
}
