interface ProgressBarProps {
  progress: number;
  className?: string;
}

export default function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full bg-cyber-dark rounded-full h-3 border border-cyber-light ${className}`}>
      <div 
        className="progress-bar rounded-full transition-all duration-1000 ease-out" 
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
}
