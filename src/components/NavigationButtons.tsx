import { ChevronRight, ChevronLeft } from 'lucide-react';

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isNextDisabled?: boolean;
}

export default function NavigationButtons({
  onPrev,
  onNext,
  isFirst,
  isLast,
  isNextDisabled = false
}: NavigationButtonsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 w-full">
      {!isFirst && (
        <button
          onClick={onPrev}
          className="btn-secondary flex items-center justify-center gap-2 py-3 px-4 w-full md:w-auto order-2 md:order-1"
        >
            قبلی
          <ChevronLeft className="h-5 w-5" />
          
        </button>
      )}
      
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`btn-primary flex items-center justify-center gap-2 py-3 px-4 w-full md:w-auto ${
          isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${isFirst ? 'order-1' : 'order-1 md:order-2'}`}
      >
        <ChevronRight className="h-5 w-5" />
        {isLast ? 'مشاهده خلاصه' : 'بعدی'}
      </button>
    </div>
  );
}