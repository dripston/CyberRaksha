interface ProgressBarProps {
  progress: number;
  className?: string;
  progressClassName?: string;
}

export default function ProgressBar({ progress, className = "", progressClassName = "bg-gradient-to-r from-cyber-primary to-cyber-accent" }: ProgressBarProps) {
  return (
    <div className={`w-full bg-cyber-dark rounded-full h-3 border border-cyber-light ${className}`}>
      <div 
        className={`progress-bar rounded-full transition-all duration-1000 ease-out ${progressClassName}`} 
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
}
