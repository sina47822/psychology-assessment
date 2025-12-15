interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 font-medium">پیشرفت ارزیابی</span>
        <span className="text-sky-500 font-bold">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-sky-500 to-sky-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-sm text-gray-500">
        <span>شروع</span>
        <span>پایان</span>
      </div>
    </div>
  );
}