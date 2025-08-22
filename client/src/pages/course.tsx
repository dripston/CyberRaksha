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

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Click on each category** to reveal available payment methods
2. **Select the correct option** for each category:
   - 📱 **QR Code**: Look for scanning patterns or QR references
   - 🆔 **UPI ID**: Look for format like name@bank (contains @ symbol)
   - 📞 **Phone Number**: Look for mobile numbers (10 digits, +91 prefix)

3. **Watch the colors**: 
   - ✅ Green = Correct placement
   - ❌ Red = Wrong category

4. **Complete all categories** to unlock the next lesson!

💡 **Pro Tip**: Each payment method has unique characteristics. Study them carefully!`,

    exercise: {
      type: 'mcq-categorization',
      title: 'Identify Payment Methods',
      instruction: 'Click each category to see options and select the correct payment method:',
      items: [
        { 
          id: 'qr-1', 
          text: '📱 Scan this pattern', 
          type: 'QR Code',
          visual: '📷'
        },
        { 
          id: 'id-1', 
          text: 'rahul@paytm', 
          type: 'UPI ID',
          visual: '@'
        },
        { 
          id: 'phone-1', 
          text: '+91 98765 43210', 
          type: 'Phone Number',
          visual: '📞'
        },
        { 
          id: 'qr-2', 
          text: '⬛⬜⬛⬜⬛', 
          type: 'QR Code',
          visual: '🔲'
        },
        { 
          id: 'id-2', 
          text: 'priya@ybl', 
          type: 'UPI ID',
          visual: '@'
        },
        { 
          id: 'phone-2', 
          text: '9876543210', 
          type: 'Phone Number',
          visual: '📱'
        }
      ],
      categories: ['QR Code', 'UPI ID', 'Phone Number']
    }
  }
};

// Add proper TypeScript interfaces for your data
interface LessonItem {
  id: string;
  text: string;
  type: string;
  visual: string;
}

interface LessonExercise {
  type: string;
  title: string;
  instruction: string;
  items: LessonItem[];
  categories: string[];
}

interface Lesson {
  id: string;
  title: string;
  story: string;
  concept: string;
  howToSolve: string;
  exercise: LessonExercise;
}

// Update your component with proper TypeScript types
// Replace the existing exercise implementation with a multiple-choice approach
export default function CoursePage() {
  // Keep existing imports and interfaces
  
  const [, params] = useRoute<{ courseId: string; lessonId?: string }>('/course/:courseId/:lessonId?');
  const { profile } = useAuth();
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({
    'QR Code': [],
    'UPI ID': [],
    'Phone Number': []
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<LessonItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const courseId = params?.courseId;
  const lessonId = params?.lessonId || 'lesson-1';

  // Fetch course data
  const { data: course } = useQuery<Course>({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId,
  });

  const currentLesson = lessonsData[lessonId as keyof typeof lessonsData] as Lesson;

  // Check if all items are correctly placed
  useEffect(() => {
    const allItems = currentLesson?.exercise.items || [];
    const allAssigned = Object.values(selectedItems).flat();
    
    if (allAssigned.length === allItems.length) {
      const allCorrect = Object.entries(selectedItems).every(([category, itemIds]) => {
        return itemIds.every(itemId => {
          const item = allItems.find(i => i.id === itemId);
          return item?.type === category;
        });
      });
      
      if (allCorrect && !isCompleted) {
        setIsCompleted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  }, [selectedItems, currentLesson, isCompleted]);

  // Function to handle category click (show options)
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // Function to handle option selection within a category
  const handleOptionSelect = (item: LessonItem, category: string) => {
    // Create a new copy of the selected items
    const newSelected = { ...selectedItems };
    
    // Remove the item from any category it might be in
    Object.keys(newSelected).forEach(cat => {
      newSelected[cat] = newSelected[cat].filter(id => id !== item.id);
    });
    
    // Add the item to the selected category
    newSelected[category] = [...(newSelected[category] || []), item.id];
    
    // Update state
    setSelectedItems(newSelected);
    setActiveCategory(null); // Close the options after selection
  };

  // Helper functions
  const getItemsInCategory = (category: string): LessonItem[] => {
    return (selectedItems[category] || [])
      .map(id => currentLesson?.exercise.items.find(item => item.id === id))
      .filter((item): item is LessonItem => !!item);
  };

  const getUnassignedItems = (): LessonItem[] => {
    const assignedIds = Object.values(selectedItems).flat();
    return currentLesson?.exercise.items.filter(item => 
      !assignedIds.includes(item.id)
    ) || [];
  };

  // Get available options for a category (unassigned items)
  const getAvailableOptions = (): LessonItem[] => {
    return getUnassignedItems();
  };

  // Early return for loading state
  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-cyber-text font-mono">Loading lesson...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text">
      {/* Simplified CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Simple scrollbar styling */
        .scrollable-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .scrollable-content::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 4px;
        }
        
        .scrollable-content::-webkit-scrollbar-thumb {
          background: #00ffaa;
          border-radius: 4px;
        }
        
        .scrollable-content::-webkit-scrollbar-thumb:hover {
          background: #00ffaadd;
        }
        
        /* Interactive elements */
        .interactive-button {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .interactive-button:hover {
          transform: translateY(-1px);
        }
      `}} />

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Story & Concept */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-cyber-dark/50 rounded-xl border border-cyber-light/30 p-8"
          >
            <div className="flex items-center space-x-3 mb-8">
              <BookOpen className="text-cyber-accent" size={28} />
              <h2 className="font-mono text-2xl font-bold text-cyber-accent">
                {currentLesson.title}
              </h2>
            </div>

            {/* Scrollable content area */}
            <div className="h-[calc(100vh-260px)] overflow-y-auto scrollable-content space-y-6 pr-2">
              {/* Story Section */}
              <div>
                <h3 className="font-mono text-base font-medium text-cyber-neon mb-3">
                  📖 Story
                </h3>
                <div className="bg-cyber-bg/70 p-4 rounded-lg border border-cyber-light/50 min-h-[180px]">
                  <p className="text-cyber-text leading-normal whitespace-pre-line text-xs">
                    {currentLesson.story}
                  </p>
                </div>
              </div>

              {/* Concept Section */}
              <div>
                <h3 className="font-mono text-base font-medium text-cyber-orange mb-3">
                  💡 Concept
                </h3>
                <div className="bg-cyber-bg/70 p-4 rounded-lg border border-cyber-light/50 min-h-[200px]">
                  <div className="text-cyber-text leading-normal whitespace-pre-line text-xs">
                    {currentLesson.concept}
                  </div>
                </div>
              </div>

              {/* How to Solve Section */}
              <div>
                <h3 className="font-mono text-base font-medium text-cyber-accent mb-3">
                  🔧 How to Solve
                </h3>
                <div className="bg-gradient-to-br from-cyber-primary/10 to-cyber-accent/10 p-4 rounded-lg border border-cyber-accent/50 min-h-[180px]">
                  <div className="text-cyber-text leading-normal whitespace-pre-line text-xs">
                    {currentLesson.howToSolve}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Exercise */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-cyber-dark/50 rounded-xl border border-cyber-light/30 p-8"
          >
            {/* Compact Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">🎯</div>
              <h2 className="font-mono text-lg font-bold text-cyber-accent">
                {currentLesson.exercise.title}
              </h2>
              {isCompleted && (
                <div className="flex items-center space-x-2 text-cyber-neon ml-auto">
                  <CheckCircle size={18} />
                  <span className="font-mono text-sm">Done!</span>
                </div>
              )}
            </div>

            {/* Exercise Content - MUCH more scrollable space with instruction inside */}
            <div className="h-[calc(100vh-220px)] overflow-y-auto scrollable-content space-y-4 pr-2">
              
              {/* Instruction section - now inside scrollable area */}
              <div className="bg-cyber-primary/10 p-3 rounded-lg border border-cyber-primary/30 mb-4">
                <p className="text-cyber-text font-mono text-xs mb-1">
                  Click categories to see options, then select the correct payment method.
                </p>
                {activeCategory && (
                  <p className="text-cyber-accent text-xs font-mono animate-pulse">
                    👆 Choose for "{activeCategory}"
                  </p>
                )}
              </div>
                {currentLesson.exercise.categories.map((category) => {
                  const hasCorrectItems = getItemsInCategory(category).every(item => 
                    item && currentLesson.exercise.items.find(i => i.id === item.id)?.type === category
                  );
                  const categoryIcon = category === 'QR Code' ? '📱' : category === 'UPI ID' ? '🆔' : '📞';
                  const isActive = activeCategory === category;
                  const hasItems = getItemsInCategory(category).length > 0;
                  
                  return (
                    <div key={category} className="category-container space-y-3">
                      {/* Category Header */}
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(category)}
                        className={`interactive-button w-full text-left p-10 rounded-xl border-2 transition-all ${
                          isActive
                            ? 'border-cyber-accent bg-cyber-accent/10' 
                            : hasItems
                            ? 'border-cyber-neon bg-cyber-neon/5'
                            : 'border-cyber-light bg-cyber-bg hover:border-cyber-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-4xl">{categoryIcon}</span>
                            <div>
                              <h4 className="font-mono text-xl font-bold text-cyber-neon">
                                {category}
                              </h4>
                              <p className="text-base text-cyber-muted mt-1">
                                {hasItems ? `${getItemsInCategory(category).length} item(s) selected` : 'Click to select payment method'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {hasItems && (
                              <CheckCircle size={24} className="text-cyber-neon" />
                            )}
                            <span className={`text-cyber-muted transition-transform text-xl ${
                              isActive ? 'rotate-180' : ''
                            }`}>▼</span>
                          </div>
                        </div>
                      </button>

                      {/* Selected Items Display */}
                      {hasItems && (
                        <div className="ml-8 space-y-3">
                          {getItemsInCategory(category).map((item) => {
                            const isCorrect = item && currentLesson.exercise.items.find(i => i.id === item.id)?.type === category;
                            return (
                              <div
                                key={item?.id}
                                className={`px-6 py-4 rounded-xl border-2 font-mono text-base flex items-center space-x-4 ${
                                  isCorrect 
                                    ? 'bg-cyber-neon/10 border-cyber-neon text-cyber-neon shadow-lg' 
                                    : 'bg-red-500/10 border-red-500 text-red-400'
                                }`}
                              >
                                <span className="text-2xl">{item?.visual}</span>
                                <span className="flex-1">{item?.text}</span>
                                {isCorrect && (
                                  <CheckCircle size={20} className="text-cyber-neon" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* MCQ Options - Show when category is active - Compact 2x2 grid */}
                      {isActive && getAvailableOptions().length > 0 && (
                        <div className="mcq-options ml-8 bg-cyber-dark/70 p-4 rounded-lg border border-cyber-primary/50">
                          <h5 className="font-mono text-sm font-medium text-cyber-accent mb-3">
                            🎯 Select correct {category.toLowerCase()}:
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            {getAvailableOptions().map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOptionSelect(item, category);
                                }}
                                className="interactive-button text-center bg-cyber-bg px-3 py-3 rounded-lg border border-cyber-light hover:border-cyber-accent hover:bg-cyber-accent/10 transition-all font-mono text-sm flex flex-col items-center space-y-1"
                              >
                                <span className="text-xl">{item.visual}</span>
                                <span className="text-xs leading-tight">{item.text}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Show completion message when no options available */}
                      {isActive && getAvailableOptions().length === 0 && (
                        <div className="ml-8 bg-cyber-neon/15 p-6 rounded-xl border-2 border-cyber-neon/50">
                          <p className="text-cyber-neon font-mono text-lg text-center font-bold">
                            ✅ All payment methods have been categorized!
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </div>
        
        {/* Navigation - Outside panels, at bottom */}
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <div className="flex justify-between items-center py-6 border-t border-cyber-light">
            <button 
              className="flex items-center space-x-2 px-6 py-3 bg-cyber-dark rounded-lg border border-cyber-light hover:border-cyber-accent transition-colors"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} />
              <span className="font-mono text-base">Back to Course</span>
            </button>
            
            <div className="flex items-center space-x-2 px-4 py-2 bg-cyber-bg rounded-lg border border-cyber-light">
              <div className="w-3 h-3 bg-cyber-neon rounded-full"></div>
              <span className="font-mono text-sm text-cyber-muted">Lesson 1 of {course.totalLessons}</span>
            </div>
            
            <button 
              disabled={!isCompleted}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-mono transition-colors ${
                isCompleted 
                  ? 'bg-cyber-accent text-cyber-dark hover:bg-cyber-neon' 
                  : 'bg-cyber-light text-cyber-muted cursor-not-allowed'
              }`}
            >
              <span>Next Lesson</span>
              <ArrowRight size={20} />
            </button>
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
    </div>
  );
}
