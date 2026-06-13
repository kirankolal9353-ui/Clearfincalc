import React, { useRef, useEffect } from 'react';
import EmiCalculator from '../calculators/EmiCalculator';
import SipCalculator from '../calculators/SipCalculator';
import LoanEligibility from '../calculators/LoanEligibility';
import PersonalLoan from '../calculators/PersonalLoan';
import HomeLoan from '../calculators/HomeLoan';
import TaxEstimator from '../calculators/TaxEstimator';
import SalaryCalculator from '../calculators/SalaryCalculator';
import TdsCalculator from '../calculators/TdsCalculator';
import GstCalculator from '../calculators/GstCalculator';
import FdCalculator from '../calculators/FdCalculator';
import RetirementCalculator from '../calculators/RetirementCalculator';
import SavingsPlanner from '../calculators/SavingsPlanner';
import CustomsDuty from '../calculators/CustomsDuty';
import { X } from 'lucide-react';

interface CalculatorContainerProps {
  toolId: string | null;
  onClose: () => void;
}

export default function CalculatorContainer({ toolId, onClose }: CalculatorContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toolId && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [toolId]);

  if (!toolId) return null;

  const renderCalculator = () => {
    switch (toolId) {
      case 'emi': return <EmiCalculator />;
      case 'sip': return <SipCalculator />;
      case 'eligibility': return <LoanEligibility />;
      case 'personal-loan': return <PersonalLoan />;
      case 'home-loan': return <HomeLoan />;
      case 'tax': return <TaxEstimator />;
      case 'salary': return <SalaryCalculator />;
      case 'tds': return <TdsCalculator />;
      case 'gst': return <GstCalculator />;
      case 'fd': return <FdCalculator />;
      case 'retirement': return <RetirementCalculator />;
      case 'savings-goal': return <SavingsPlanner />;
      case 'customs': return <CustomsDuty />;
      default: return <EmiCalculator />;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24"
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-30 p-2 bg-slate-900 text-white dark:bg-slate-800 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-md flex items-center justify-center border border-slate-700"
          aria-label="Close Calculator"
        >
          <X className="w-4 h-4" />
        </button>
        {renderCalculator()}
      </div>
    </div>
  );
}
