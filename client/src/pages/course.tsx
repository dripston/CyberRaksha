import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Course } from '@shared/schema';

// Lesson data for "Safe UPI Payments" course
const lessonsData = {
  'lesson-1': {
    id: 'lesson-1',
    title: 'Intro – The Digital Rupee Awakens',
    story: `Cash is gone. You have only UPI to survive in the Smart Bazaar.

In this digital world, traditional money has evolved. The Unified Payments Interface (UPI) has become the backbone of India's digital economy. But with great convenience comes great responsibility - the need to understand and safely navigate this digital payment ecosystem.

Your mission: Master the art of digital payments while avoiding the traps set by cyber criminals lurking in the digital shadows.`,
    
    concept: `UPI (Unified Payments Interface) is a real-time payment system that enables inter-bank transactions through mobile phones. Here's how it works:

🏦 **The Flow:**
1. You initiate a payment using your UPI app
2. Your bank validates the transaction
3. The payment travels through NPCI (National Payments Corporation of India)
4. The recipient's bank processes and credits the amount
5. Both parties receive instant confirmation

🔍 **Three Ways to Pay:**
• **QR Code**: Scan to pay, contains merchant details
• **UPI ID**: Virtual address like name@bank (e.g., john@paytm)
• **Phone Number**: Direct payment using registered mobile number

Understanding these methods is crucial for safe digital transactions.`,

    exercise: {
      type: 'drag-drop',
      title: 'Identify Payment Methods',
      instruction: 'Drag each payment method to its correct category:',
      items: [
        { id: 'qr-1', text: '📱 Scan this pattern', type: 'QR Code' },
        { id: 'id-1', text: 'rahul@paytm', type: 'UPI ID' },
        { id: 'phone-1', text: '+91 98765 43210', type: 'Phone Number' },
        { id: 'qr-2', text: 'Black & white squares pattern', type: 'QR Code' },
        { id: 'id-2', text: 'priya@ybl', type: 'UPI ID' },
        { id: 'phone-2', text: '9876543210', type: 'Phone Number' }
      ],
      categories: ['QR Code', 'UPI ID', 'Phone Number']
    }
  }
};

export default function CoursePage() {
  const [, params] = useRoute('/course/:courseId/:lessonId?');
  const { profile } = useAuth();
  const [selectedItems, setSelectedItems] = useState<{[key: string]: string[]}>({
    'QR Code': [],
    'UPI ID': [],
    'Phone Number': []
  });
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const courseId = params?.courseId;
  const lessonId = params?.lessonId || 'lesson-1';

  // Fetch course data
  const { data: course } = useQuery<Course>({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId,
  });

  const currentLesson = lessonsData[lessonId as keyof typeof lessonsData];

  useEffect(() => {
    // Check if exercise is completed correctly
    if (currentLesson?.exercise.type === 'drag-drop') {
      const isCorrect = currentLesson.exercise.categories.every(category => {
        const correctItems = currentLesson.exercise.items
          .filter(item => item.type === category)
          .map(item => item.id);
        const userItems = selectedItems[category] || [];
        return correctItems.length === userItems.length && 
               correctItems.every(id => userItems.includes(id));
      });
      
      if (isCorrect && !isCompleted) {
        setIsCompleted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else if (!isCorrect) {
        setIsCompleted(false);
      }
    }
  }, [selectedItems, currentLesson, isCompleted]);

  const handleDragStart = (e: React.DragEvent, item: any) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    setDraggedOver(null);
    if (draggedItem) {
      // Remove item from all categories first
      const newSelected = { ...selectedItems };
      Object.keys(newSelected).forEach(cat => {
        newSelected[cat] = newSelected[cat].filter(id => id !== draggedItem.id);
      });
      
      // Add to new category
      newSelected[category] = [...newSelected[category], draggedItem.id];
      setSelectedItems(newSelected);
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (category: string) => {
    setDraggedOver(category);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const getItemsInCategory = (category: string) => {
    return selectedItems[category]?.map(id => 
      currentLesson?.exercise.items.find(item => item.id === id)
    ).filter(Boolean) || [];
  };

  const getUnassignedItems = () => {
    const assignedIds = Object.values(selectedItems).flat();
    return currentLesson?.exercise.items.filter(item => 
      !assignedIds.includes(item.id)
    ) || [];
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-cyber-text font-mono">Loading lesson...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text">
      {/* Header */}
      <div className="border-b border-cyber-light bg-cyber-dark">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="p-2 hover:bg-cyber-light rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="font-mono text-lg font-bold text-cyber-accent">
                  {course.title}
                </h1>
                <p className="text-sm text-cyber-muted">
                  Lesson 1 of {course.totalLessons}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-cyber-neon">
                <Zap size={16} />
                <span className="font-mono text-sm">+{course.xpPerLesson} XP</span>
              </div>
              {profile && (
                <div className="text-sm text-cyber-muted">
                  Welcome, {profile.username}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          
          {/* Left Panel - Story & Concept */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cyber-card p-8 overflow-y-auto"
          >
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="text-cyber-accent" size={24} />
              <h2 className="font-mono text-xl font-bold text-cyber-accent">
                {currentLesson.title}
              </h2>
            </div>

            {/* Story Section */}
            <div className="mb-8">
              <h3 className="font-mono text-lg font-semibold text-cyber-neon mb-4">
                📖 Story
              </h3>
              <div className="bg-cyber-bg p-6 rounded-lg border border-cyber-light">
                <p className="text-cyber-text leading-relaxed whitespace-pre-line">
                  {currentLesson.story}
                </p>
              </div>
            </div>

            {/* Concept Section */}
            <div>
              <h3 className="font-mono text-lg font-semibold text-cyber-orange mb-4">
                💡 Concept
              </h3>
              <div className="bg-cyber-bg p-6 rounded-lg border border-cyber-light">
                <div className="text-cyber-text leading-relaxed whitespace-pre-line">
                  {currentLesson.concept}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Exercise */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cyber-card p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-mono text-xl font-bold text-cyber-accent">
                🎯 {currentLesson.exercise.title}
              </h2>
              {isCompleted && (
                <div className="flex items-center space-x-2 text-cyber-neon">
                  <CheckCircle size={20} />
                  <span className="font-mono text-sm">Completed!</span>
                </div>
              )}
            </div>

            <p className="text-cyber-muted mb-6">
              {currentLesson.exercise.instruction}
            </p>

            {/* Drag & Drop Exercise */}
            <div className="space-y-6">
              {/* Unassigned Items Pool */}
              <div className="bg-cyber-bg p-4 rounded-lg border border-cyber-light">
                <h4 className="font-mono text-sm font-medium text-cyber-accent mb-3">
                  Payment Methods to Categorize:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getUnassignedItems().map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className="bg-cyber-dark px-4 py-2 rounded-lg border border-cyber-light cursor-move hover:border-cyber-accent transition-colors font-mono text-sm"
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Categories */}
              {currentLesson.exercise.categories.map((category) => {
                const isActive = draggedOver === category;
                const hasCorrectItems = getItemsInCategory(category).every(item => 
                  item && currentLesson.exercise.items.find(i => i.id === item.id)?.type === category
                );
                const categoryIcon = category === 'QR Code' ? '📱' : category === 'UPI ID' ? '🆔' : '📞';
                
                return (
                  <div
                    key={category}
                    onDrop={(e) => handleDrop(e, category)}
                    onDragOver={handleDragOver}
                    onDragEnter={() => handleDragEnter(category)}
                    onDragLeave={handleDragLeave}
                    className={`p-4 rounded-lg border-2 border-dashed transition-all min-h-[120px] ${
                      isActive 
                        ? 'border-cyber-accent bg-cyber-accent/10 scale-105' 
                        : hasCorrectItems && getItemsInCategory(category).length > 0
                        ? 'border-cyber-neon bg-cyber-neon/5'
                        : 'border-cyber-light bg-cyber-bg hover:border-cyber-accent'
                    }`}
                  >
                    <h4 className="font-mono text-sm font-medium text-cyber-neon mb-3 flex items-center space-x-2">
                      <span>{categoryIcon}</span>
                      <span>{category}</span>
                      {hasCorrectItems && getItemsInCategory(category).length > 0 && (
                        <CheckCircle size={16} className="text-cyber-neon" />
                      )}
                    </h4>
                    <div className="space-y-2">
                      {getItemsInCategory(category).map((item) => {
                        const isCorrect = item && currentLesson.exercise.items.find(i => i.id === item.id)?.type === category;
                        return (
                          <div
                            key={item?.id}
                            className={`px-4 py-2 rounded border font-mono text-sm transition-colors ${
                              isCorrect 
                                ? 'bg-cyber-neon/10 border-cyber-neon text-cyber-neon' 
                                : 'bg-red-500/10 border-red-500 text-red-400'
                            }`}
                          >
                            {item?.text}
                          </div>
                        );
                      })}
                      {getItemsInCategory(category).length === 0 && (
                        <div className="text-cyber-muted text-sm italic text-center py-4">
                          Drop {category.toLowerCase()} items here
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-cyber-light">
              <button 
                className="flex items-center space-x-2 px-4 py-2 text-cyber-muted hover:text-cyber-text transition-colors"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={16} />
                <span className="font-mono">Back to Course</span>
              </button>
              
              <button 
                disabled={!isCompleted}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-mono transition-colors ${
                  isCompleted 
                    ? 'modern-button' 
                    : 'bg-cyber-light text-cyber-muted cursor-not-allowed'
                }`}
              >
                <span>Next Lesson</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyber-bg rounded-lg border border-cyber-light">
                <div className="w-2 h-2 bg-cyber-neon rounded-full"></div>
                <span className="font-mono text-xs text-cyber-muted">Lesson 1 of {course.totalLessons}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Animation Overlay */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-cyber-dark border border-cyber-neon rounded-2xl p-8 text-center max-w-md mx-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyber-neon to-cyber-accent rounded-full flex items-center justify-center"
            >
              <CheckCircle size={32} className="text-cyber-bg" />
            </motion.div>
            <h3 className="font-mono text-xl font-bold text-cyber-neon mb-2">
              🎉 Exercise Completed!
            </h3>
            <p className="text-cyber-text mb-4">
              Great job! You've mastered UPI payment methods.
            </p>
            <div className="flex items-center justify-center space-x-2 text-cyber-accent">
              <Zap size={20} />
              <span className="font-mono font-bold">+{course.xpPerLesson} XP Earned!</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
