import { Course } from "@shared/schema";
import ProgressBar from "./ProgressBar";

interface CourseCardProps {
  course: Course;
  progress: number;
}

const difficultyColors = {
  Beginner: "cyber-green",
  Intermediate: "cyber-blue", 
  Advanced: "cyber-red",
};

const difficultyGradients = {
  Beginner: "from-cyber-blue to-cyber-green",
  Intermediate: "from-cyber-red to-cyber-yellow",
  Advanced: "from-cyber-yellow to-cyber-red",
};

export default function CourseCard({ course, progress }: CourseCardProps) {
  const gradientClass = difficultyGradients[course.difficulty as keyof typeof difficultyGradients] || "from-cyber-blue to-cyber-green";
  const colorClass = difficultyColors[course.difficulty as keyof typeof difficultyColors] || "cyber-green";

  return (
    <div className="retro-card rounded-lg overflow-hidden" data-testid={`card-course-${course.id}`}>
      <div className={`h-32 bg-gradient-to-br ${gradientClass} p-4 flex items-center justify-center relative`}>
        <div className="text-4xl">{course.icon}</div>
        <div className={`absolute top-2 right-2 px-2 py-1 bg-cyber-bg rounded text-xs font-pixel text-${colorClass}`}>
          {course.difficulty}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-pixel text-sm text-cyber-text mb-2" data-testid={`text-course-title-${course.id}`}>
          {course.title}
        </h3>
        <p className="text-xs text-cyber-muted mb-4">{course.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-cyber-muted">Progress</span>
            <span className="text-xs text-cyber-green font-bold">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-cyber-yellow">+{course.xpPerLesson} XP per lesson</span>
          <button 
            className={`px-3 py-1 bg-${colorClass} text-cyber-bg rounded font-bold text-xs hover:bg-cyber-yellow transition-colors`}
            data-testid={`button-course-${progress > 0 ? 'continue' : 'start'}-${course.id}`}
          >
            {progress > 0 ? 'Continue' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
}
