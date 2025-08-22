import { Course } from "@shared/schema";
import ProgressBar from "./ProgressBar";

interface CourseCardProps {
  course: Course;
  progress: number;
}

const difficultyColors = {
  Beginner: "cyber-primary",
  Intermediate: "cyber-accent", 
  Advanced: "cyber-muted-blue",
};

const difficultyGradients = {
  Beginner: "from-cyber-primary to-cyber-accent",
  Intermediate: "from-cyber-accent to-cyber-primary",
  Advanced: "from-cyber-muted-blue to-cyber-primary",
};

export default function CourseCard({ course, progress }: CourseCardProps) {
  const gradientClass = difficultyGradients[course.difficulty as keyof typeof difficultyGradients] || "from-cyber-blue to-cyber-green";
  const colorClass = difficultyColors[course.difficulty as keyof typeof difficultyColors] || "cyber-green";

  return (
    <div className="cyber-card overflow-hidden" data-testid={`card-course-${course.id}`}>
      <div className={`h-40 bg-gradient-to-br ${gradientClass} p-6 flex items-center justify-center relative`}>
        <div className="text-5xl">{course.icon}</div>
        <div className={`absolute top-3 right-3 px-3 py-1 bg-cyber-bg rounded-lg text-sm font-mono text-${colorClass} font-medium`}>
          {course.difficulty}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-mono text-base text-cyber-secondary mb-3 font-semibold" data-testid={`text-course-title-${course.id}`}>
          {course.title}
        </h3>
        <p className="text-sm text-cyber-muted mb-6 leading-relaxed">{course.description}</p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-cyber-muted font-medium">Progress</span>
            <span className="text-sm text-cyber-primary font-bold">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-cyber-primary font-medium">+{course.xpPerLesson} XP per lesson</span>
          <button 
            className="modern-button px-4 py-2 rounded-lg font-mono text-sm"
            data-testid={`button-course-${progress > 0 ? 'continue' : 'start'}-${course.id}`}
          >
            {progress > 0 ? 'Continue' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
}
