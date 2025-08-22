import { useState, useEffect, useMemo } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Course } from '@shared/schema';

// Mock course data for UPI Payments
const mockCourse: Course = {
  id: "upi-payments-course",
  title: "Safe UPI Payments",
  description: "Master the art of secure digital payments in India's UPI ecosystem.",
  difficulty: "beginner",
  totalLessons: 6,
  xpPerLesson: 50,
  icon: "🎯",
  createdAt: new Date()
};

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
      instruction: 'Click categories to see options, then select the correct payment method.',
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
  },
  'lesson-2': {
    id: 'lesson-2',
    title: 'Mission 1 – Scanning the Gateway',
    story: `You're at a bustling Indian street market. A chaiwala with a warm smile hands you a steaming cup of masala chai. "₹10, please," he says. 

All around you, people are paying with their phones. No cash changes hands. You need to pay using UPI, but which QR code is the real one among the many stickers on his cart?`,

    concept: `🔍 **QR Code Basics:**
- A UPI QR code contains encrypted merchant details
- Valid QR codes have the UPI logo and issuer bank name
- Static QR codes are for fixed amounts, dynamic for variable amounts
- Always verify the merchant name before paying

🛡️ **Safety Tips:**
- Check for tampered stickers (signs of overlay attacks)
- Ensure the QR code is from a trusted source
- Verify the amount before confirming the transaction
- Look for the UPI verification tick mark on official QR codes`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Examine each QR code option** carefully
2. **Look for signs of legitimacy**: UPI logo, bank name, proper formatting
3. **Identify the fake QR codes**: misspellings, incorrect logos, suspicious elements
4. **Select the correct QR code** that shows all the signs of a legitimate UPI QR

💡 **Pro Tip**: Legitimate UPI QR codes always display the merchant name clearly and have a proper bank identification.`,

    exercise: {
      type: 'qr-validation',
      title: 'Identify the Valid QR Code',
      instruction: 'Examine the QR codes below and select the legitimate UPI QR code.',
      options: [
        {
          id: 'qr-option-1',
          image: '⬜⬛⬜⬛⬜\n⬛🟦⬛🟦⬛\n⬜⬛🏦⬛⬜\n⬛🟦⬛🟦⬛\n⬜⬛⬜⬛⬜',
          text: 'Shows bank logo and UPI symbol',
          isCorrect: true
        },
        {
          id: 'qr-option-2',
          image: '🟥🟥🟥🟥🟥\n🟥💰💰💰🟥\n🟥💰⬜💰🟥\n🟥💰💰💰🟥\n🟥🟥🟥🟥🟥',
          text: 'Promises "double money return"',
          isCorrect: false,
          explanation: 'Fake QR codes often make unrealistic promises'
        },
        {
          id: 'qr-option-3',
          image: '⬛⬜⬛⬜⬛\n⬜🔒⬜🔒⬜\n⬛⬜UPI⬜⬛\n⬜🔒⬜🔒⬜\n⬛⬜⬛⬜⬛',
          text: 'Has misspelled "UPI" as "UPI"',
          isCorrect: false,
          explanation: 'Look for typos and misspellings in fake QR codes'
        },
        {
          id: 'qr-option-4',
          image: '🟩🟩🟩🟩🟩\n🟩📱💳📱🟩\n🟩💳❌💳🟩\n🟩📱💳📱🟩\n🟩🟩🟩🟩🟩',
          text: 'Requests extra authentication',
          isCorrect: false,
          explanation: 'Legitimate UPI QR codes don\'t ask for additional authentication beyond your PIN'
        }
      ]
    }
  },
  'lesson-3': {
    id: 'lesson-3',
    title: 'Mission 2 – The Secret PIN',
    story: `The digital payment world is under siege by hackers. Your UPI PIN is the last line of defense protecting your hard-earned money.

You receive a message that looks like it's from your bank. But something feels off. Can you spot the phishing attempt before it's too late?`,

    concept: `🔐 **UPI PIN Security:**
- Your UPI PIN is like the key to your digital wallet
- Never share it with anyone, including bank representatives
- Banks never ask for your UPI PIN via call, message, or email
- Change your PIN regularly for added security

🚨 **Phishing Red Flags:**
- Urgent language creating panic
- Requests for sensitive information
- Suspicious links or phone numbers
- Grammar mistakes and unprofessional design
- Offers that seem too good to be true`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each message carefully**
2. **Look for phishing indicators**: urgency, requests for PIN/OTP, suspicious links
3. **Identify which messages are phishing attempts**
4. **Select only the legitimate messages**

💡 **Pro Tip**: Legitimate banks never ask for your UPI PIN or OTP through messages. When in doubt, contact your bank directly through official channels.`,

    exercise: {
      type: 'phishing-detection',
      title: 'Spot the Phishing Attempts',
      instruction: 'Identify which of these messages are phishing attempts. Select all that apply.',
      messages: [
        {
          id: 'msg-1',
          text: 'Your bank account has been locked. Call 1800-XXX-XXXX immediately to unlock.',
          isPhishing: true,
          explanation: 'Legitimate banks never ask you to call unknown numbers to unlock accounts.'
        },
        {
          id: 'msg-2',
          text: 'UPI Alert: ₹1500 paid to Amazon. Call 0124-XXXXX if not you.',
          isPhishing: false,
          explanation: 'This is a legitimate transaction alert with a proper customer care number.'
        },
        {
          id: 'msg-3',
          text: 'Congratulations! You won ₹50,000. Click here to claim: bit.ly/usp123',
          isPhishing: true,
          explanation: 'Unexpected winning announcements with shortened links are common phishing tactics.'
        },
        {
          id: 'msg-4',
          text: 'Enter your UPI PIN to receive ₹500 from your friend. PIN not shared with anyone.',
          isPhishing: true,
          explanation: 'You never need to enter your PIN to receive money - this is a classic scam.'
        },
        {
          id: 'msg-5',
          text: 'Your statement is ready for May 2023. Download from our official app.',
          isPhishing: false,
          explanation: 'This is a legitimate notification about statement availability.'
        }
      ]
    }
  },
  'lesson-4': {
    id: 'lesson-4',
    title: 'Mission 3 – Pay or Request?',
    story: `After enjoying hot samosas with your friend at a roadside stall, you realize someone needs to pay. Your friend quickly scans the QR code and pays ₹40 for both.

Now it's time to settle up. Do you send money or request money from your friend? Understanding this difference is crucial in the UPI world.`,

    concept: `💸 **Pay vs. Request:**
- **Pay**: You send money to someone (debits your account)
- **Request**: You ask someone to send money to you (credits your account when they pay)

🎯 **When to Use Which:**
- Use "Pay" when you owe money to someone
- Use "Request" when someone owes money to you
- Always verify the recipient's details before paying
- Double-check request messages before approving them

⚠️ **Common Mistakes:**
- Paying when you should request (losing money)
- Approving requests without verifying (paying unnecessarily)
- Confusing payment links with requests (scam alert)`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each scenario carefully**
2. **Determine if you should Pay or Request money**
3. **Select the correct action for each situation**
4. **Learn from the explanations for each answer**

💡 **Pro Tip**: When in doubt, communicate with the other person to confirm what transaction should happen. Misunderstandings can lead to financial losses.`,

    exercise: {
      type: 'pay-or-request',
      title: 'Pay or Request?',
      instruction: 'For each scenario, select whether you should Pay or Request money.',
      scenarios: [
        {
          id: 'scenario-1',
          text: 'Your friend just paid for your movie ticket (₹250).',
          correctAnswer: 'pay',
          explanation: 'You owe money to your friend, so you should Pay them.'
        },
        {
          id: 'scenario-2',
          text: 'You booked train tickets for your group trip (₹1200 total).',
          correctAnswer: 'request',
          explanation: 'Your friends owe you money, so you should Request from them.'
        },
        {
          id: 'scenario-3',
          text: 'Your roommate bought groceries for both of you (₹800).',
          correctAnswer: 'pay',
          explanation: 'You owe your share, so you should Pay your roommate.'
        },
        {
          id: 'scenario-4',
          text: 'You paid for dinner with colleagues (₹3000).',
          correctAnswer: 'request',
          explanation: 'Your colleagues owe you their shares, so you should Request from them.'
        },
        {
          id: 'scenario-5',
          text: 'Your friend forgot their wallet and you paid for their coffee (₹150).',
          correctAnswer: 'request',
          explanation: 'Your friend owes you money, so you should Request from them.'
        }
      ]
    }
  },
  'lesson-5': {
    id: 'lesson-5',
    title: 'Mission 4 – Splitting the Feast',
    story: `The aroma of biryani fills the air as you and your friends dig into a feast at your favorite restaurant. The bill arrives: ₹500 for 4 people.

Everyone whips out their phones. "I'll pay, and you all can send me your shares," you offer. But how much should each person pay?`,

    concept: `🍽️ **Splitting Bills with UPI:**
- Many UPI apps have built-in bill splitting features
- You can split equally or by specific amounts
- Always verify the total and number of people
- Send payment requests with clear descriptions

🧮 **Calculation Basics:**
- Equal split: Total amount ÷ Number of people
- Include taxes and tips in the total before splitting
- Confirm everyone agrees on the split method
- Keep a record of who has paid

🔒 **Security Considerations:**
- Only split bills with people you know
- Verify payment requests before approving
- Be wary of unknown requests even if they mention splitting`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Calculate the equal share for each person**
2. **Enter the correct amount in the field provided**
3. **Submit your answer to check if it's correct**
4. **Try again if needed until you get it right**

💡 **Pro Tip**: Most UPI apps have a built-in calculator for bill splitting. Use it to avoid errors and ensure fair splits.`,

    exercise: {
      type: 'split-payment',
      title: 'Split the Bill',
      instruction: 'Calculate the equal share each person should pay for the biryani feast.',
      totalAmount: 500,
      numberOfPeople: 4,
      correctAnswer: 125
    }
  },
  'lesson-6': {
    id: 'lesson-6',
    title: 'Mission 5 – The Final Boss (Fraudster)',
    story: `Just as you're getting comfortable with UPI, a message pops up: "You've received ₹5000 from an unknown sender. Enter your UPI PIN to accept."

Your Spidey sense tingles. This feels wrong. You remember the golden rule: never enter your PIN to receive money. But the temptation is strong...`,

    concept: `🎭 **Common UPI Scams:**
- Fake payment requests that ask for your PIN to "receive" money
- Phishing messages pretending to be from banks or popular apps
- Fraudulent calls claiming to be customer support
- Fake UPI handles that mimic legitimate businesses

🛡️ **Golden Rules of UPI Safety:**
- NEVER enter your UPI PIN to receive money
- Verify all payment requests before approving
- Don't share OTPs, PINs, or passwords with anyone
- Use official apps and websites only
- Enable two-factor authentication where available

🚨 **When in Doubt:**
- Contact your bank directly using official numbers
- Check transaction status in your bank app, not via links
- Report suspicious messages to your bank and cyber crime authorities`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read the scenario carefully**
2. **Determine if this is a legitimate transaction or a scam**
3. **Choose to Accept or Decline the transaction**
4. **Learn why your decision was correct or incorrect**

💡 **Pro Tip**: If something feels wrong, it probably is. Trust your instincts and always err on the side of caution when it comes to financial transactions.`,

    exercise: {
      type: 'fraud-simulation',
      title: 'Spot the Scam',
      instruction: 'You received this payment request. What should you do?',
      scenario: 'You\'ve received ₹5000 from an unknown sender. Enter your UPI PIN to accept the payment.',
      options: [
        {
          id: 'accept',
          text: 'Accept & Enter PIN',
          isCorrect: false,
          explanation: 'NEVER enter your UPI PIN to receive money. This is a common scam where fraudsters trick you into "accepting" money that was never sent.'
        },
        {
          id: 'decline',
          text: 'Decline & Report',
          isCorrect: true,
          explanation: 'Correct! You should never enter your PIN to receive money. This is definitely a scam. Report it to your bank and block the sender.'
        }
      ]
    }
  }
};

// TypeScript interfaces
interface LessonItem {
  id: string;
  text: string;
  type: string;
  visual: string;
}

interface LessonExerciseBase {
  type: string;
  title: string;
  instruction: string;
}

interface MCQExercise extends LessonExerciseBase {
  type: 'mcq-categorization';
  items: LessonItem[];
  categories: string[];
}

interface QROption {
  id: string;
  image: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QRValidationExercise extends LessonExerciseBase {
  type: 'qr-validation';
  options: QROption[];
}

interface PhishingMessage {
  id: string;
  text: string;
  isPhishing: boolean;
  explanation: string;
}

interface PhishingDetectionExercise extends LessonExerciseBase {
  type: 'phishing-detection';
  messages: PhishingMessage[];
}

interface Scenario {
  id: string;
  text: string;
  correctAnswer: 'pay' | 'request';
  explanation: string;
}

interface PayOrRequestExercise extends LessonExerciseBase {
  type: 'pay-or-request';
  scenarios: Scenario[];
}

interface SplitPaymentExercise extends LessonExerciseBase {
  type: 'split-payment';
  totalAmount: number;
  numberOfPeople: number;
  correctAnswer: number;
}

interface FraudOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface FraudSimulationExercise extends LessonExerciseBase {
  type: 'fraud-simulation';
  scenario: string;
  options: FraudOption[];
}

type LessonExercise = MCQExercise | QRValidationExercise | PhishingDetectionExercise | 
                     PayOrRequestExercise | SplitPaymentExercise | FraudSimulationExercise;

interface Lesson {
  id: string;
  title: string;
  story: string;
  concept: string;
  howToSolve: string;
  exercise: LessonExercise;
}

export default function CoursePage() {
  const [, params] = useRoute<{ courseId: string; lessonId?: string }>('/course/:courseId/:lessonId?');
  const { profile } = useAuth();
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({
    'QR Code': [],
    'UPI ID': [],
    'Phone Number': []
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, 'pay' | 'request'>>({});
  const [splitAmount, setSplitAmount] = useState<string>('');
  const [splitError, setSplitError] = useState<string>('');
  const [fraudAnswer, setFraudAnswer] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const courseId = params?.courseId;
  const lessonId = params?.lessonId || 'lesson-1';

  // Use mock course data instead of API call
  const course = useMemo(() => mockCourse, []);
  const currentLesson = lessonsData[lessonId as keyof typeof lessonsData] as Lesson;

  // Reset completion state when lesson changes
  useEffect(() => {
    setIsCompleted(false);
    setSelectedOption(null);
    setSelectedMessages([]);
    setScenarioAnswers({});
    setSplitAmount('');
    setSplitError('');
    setFraudAnswer(null);
  }, [lessonId]);

  // Check if all items are correctly placed (for lesson 1)
  useEffect(() => {
    if (currentLesson.exercise.type === 'mcq-categorization') {
      const allItems = currentLesson.exercise.items || [];
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
    }
  }, [selectedItems, currentLesson, isCompleted]);

  // Check answers for other lesson types
  const checkAnswers = () => {
    if (currentLesson.exercise.type === 'qr-validation') {
      const selected = currentLesson.exercise.options.find(opt => opt.id === selectedOption);
      if (selected && selected.isCorrect) {
        setIsCompleted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } else if (currentLesson.exercise.type === 'phishing-detection') {
      const allPhishing = currentLesson.exercise.messages
        .filter(msg => msg.isPhishing)
        .map(msg => msg.id);
      
      const allCorrect = allPhishing.every(id => selectedMessages.includes(id)) &&
        selectedMessages.every(id => allPhishing.includes(id));
      
      if (allCorrect) {
        setIsCompleted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } else if (currentLesson.exercise.type === 'pay-or-request') {
      const allCorrect = currentLesson.exercise.scenarios.every(
        scenario => scenarioAnswers[scenario.id] === scenario.correctAnswer
      );
      
      if (allCorrect && Object.keys(scenarioAnswers).length === currentLesson.exercise.scenarios.length) {
        setIsCompleted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } else if (currentLesson.exercise.type === 'split-payment') {
      const amount = parseFloat(splitAmount);
      if (amount === currentLesson.exercise.correctAnswer) {
        setIsCompleted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setSplitError(`Incorrect. Try again! Each person should pay ₹${currentLesson.exercise.correctAnswer}`);
      }
    } else if (currentLesson.exercise.type === 'fraud-simulation') {
      const selected = currentLesson.exercise.options.find(opt => opt.id === fraudAnswer);
      if (selected && selected.isCorrect) {
        setIsCompleted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  // Function to handle category click (show options)
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // Function to handle option selection within a category
  const handleOptionSelect = (item: LessonItem, category: string) => {
    const newSelected = { ...selectedItems };
    
    // Remove the item from any category it might be in
    Object.keys(newSelected).forEach(cat => {
      newSelected[cat] = newSelected[cat].filter(id => id !== item.id);
    });
    
    // Add the item to the selected category
    newSelected[category] = [...(newSelected[category] || []), item.id];
    
    setSelectedItems(newSelected);
    setActiveCategory(null); // Close the options after selection
  };

  // Helper functions
  const getItemsInCategory = (category: string): LessonItem[] => {
    return (selectedItems[category] || [])
      .map(id => currentLesson.exercise.type === 'mcq-categorization' ? 
        currentLesson.exercise.items.find(item => item.id === id) : undefined)
      .filter((item): item is LessonItem => !!item);
  };

  const getUnassignedItems = (): LessonItem[] => {
    if (currentLesson.exercise.type !== 'mcq-categorization') return [];
    
    const assignedIds = Object.values(selectedItems).flat();
    return currentLesson.exercise.items.filter(item => 
      !assignedIds.includes(item.id)
    );
  };

  const getAvailableOptions = (): LessonItem[] => {
    return getUnassignedItems();
  };

  const handleMessageSelect = (messageId: string) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter(id => id !== messageId));
    } else {
      setSelectedMessages([...selectedMessages, messageId]);
    }
  };

  const handleScenarioAnswer = (scenarioId: string, answer: 'pay' | 'request') => {
    setScenarioAnswers({
      ...scenarioAnswers,
      [scenarioId]: answer
    });
  };

  const handleSplitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkAnswers();
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-cyber-text font-mono">Loading lesson...</div>
      </div>
    );
  }

  const lessonNumber = parseInt(lessonId.split('-')[1]);
  const isLastLesson = lessonNumber === course.totalLessons;

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text">
      {/* Simplified CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
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
        
        .interactive-button {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .interactive-button:hover {
          transform: translateY(-1px);
        }

        .qr-code {
          font-family: monospace;
          white-space: pre;
          line-height: 1;
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
                  Lesson {lessonNumber} of {course.totalLessons}
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

            {/* Exercise Content */}
            <div className="h-[calc(100vh-220px)] overflow-y-auto scrollable-content space-y-4 pr-2">
              
              {/* Instruction section */}
              <div className="bg-cyber-primary/10 p-3 rounded-lg border border-cyber-primary/30 mb-4">
                <p className="text-cyber-text font-mono text-xs mb-1">
                  {currentLesson.exercise.instruction}
                </p>
                {activeCategory && currentLesson.exercise.type === 'mcq-categorization' && (
                  <p className="text-cyber-accent text-xs font-mono animate-pulse">
                    👆 Choose for "{activeCategory}"
                  </p>
                )}
              </div>

              {/* Render different exercise types */}
              {currentLesson.exercise.type === 'mcq-categorization' && (
                <>
                  {/* Categories */}
                  {currentLesson.exercise.categories.map((category) => {
                    const hasCorrectItems = getItemsInCategory(category).every(item => {
                      if (!item || currentLesson.exercise.type !== 'mcq-categorization') return false;
                      return currentLesson.exercise.items.find((i: LessonItem) => i.id === item.id)?.type === category;
                    });
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
                              const isCorrect = item && currentLesson.exercise.type === 'mcq-categorization' && currentLesson.exercise.items.find((i: LessonItem) => i.id === item.id)?.type === category;
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

                        {/* MCQ Options - Show when category is active */}
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
                </>
              )}

              {/* QR Validation Exercise */}
              {currentLesson.exercise.type === 'qr-validation' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentLesson.exercise.options.map((option) => (
                      <div
                        key={option.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedOption === option.id
                            ? option.isCorrect
                              ? 'border-cyber-neon bg-cyber-neon/10'
                              : 'border-red-500 bg-red-500/10'
                            : 'border-cyber-light bg-cyber-bg hover:border-cyber-primary'
                        }`}
                        onClick={() => setSelectedOption(option.id)}
                      >
                        <div className="qr-code text-center mb-3 text-xl">
                          {option.image}
                        </div>
                        <p className="text-center font-mono text-sm">{option.text}</p>
                        
                        {selectedOption === option.id && !option.isCorrect && option.explanation && (
                          <div className="mt-3 p-2 bg-red-500/20 rounded-lg">
                            <p className="text-red-300 text-xs">{option.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {selectedOption && (
                    <button
                      onClick={checkAnswers}
                      className="w-full py-3 bg-cyber-accent text-cyber-dark font-mono rounded-lg hover:bg-cyber-neon transition-colors"
                    >
                      Check Answer
                    </button>
                  )}
                </div>
              )}

              {/* Phishing Detection Exercise */}
              {currentLesson.exercise.type === 'phishing-detection' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {currentLesson.exercise.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedMessages.includes(message.id)
                            ? message.isPhishing
                              ? 'border-cyber-neon bg-cyber-neon/10'
                              : 'border-red-500 bg-red-500/10'
                            : 'border-cyber-light bg-cyber-bg hover:border-cyber-primary'
                        }`}
                        onClick={() => handleMessageSelect(message.id)}
                      >
                        <p className="font-mono text-sm mb-2">💬 {message.text}</p>
                        
                        {selectedMessages.includes(message.id) && (
                          <div className={`mt-2 p-2 rounded-lg text-xs ${
                            message.isPhishing 
                              ? 'bg-cyber-neon/20 text-cyber-neon' 
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {message.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {selectedMessages.length > 0 && (
                    <button
                      onClick={checkAnswers}
                      className="w-full py-3 bg-cyber-accent text-cyber-dark font-mono rounded-lg hover:bg-cyber-neon transition-colors"
                    >
                      Check Answers
                    </button>
                  )}
                </div>
              )}

              {/* Pay or Request Exercise */}
              {currentLesson.exercise.type === 'pay-or-request' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    {currentLesson.exercise.scenarios.map((scenario) => (
                      <div key={scenario.id} className="p-4 rounded-xl border border-cyber-light bg-cyber-bg">
                        <p className="font-mono text-sm mb-3">💭 {scenario.text}</p>
                        
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleScenarioAnswer(scenario.id, 'pay')}
                            className={`flex-1 py-2 rounded-lg font-mono text-sm transition-colors ${
                              scenarioAnswers[scenario.id] === 'pay'
                                ? scenario.correctAnswer === 'pay'
                                  ? 'bg-cyber-neon text-cyber-dark'
                                  : 'bg-red-500 text-white'
                                : 'bg-cyber-light text-cyber-text hover:bg-cyber-primary'
                            }`}
                          >
                            Pay
                          </button>
                          <button
                            onClick={() => handleScenarioAnswer(scenario.id, 'request')}
                            className={`flex-1 py-2 rounded-lg font-mono text-sm transition-colors ${
                              scenarioAnswers[scenario.id] === 'request'
                                ? scenario.correctAnswer === 'request'
                                  ? 'bg-cyber-neon text-cyber-dark'
                                  : 'bg-red-500 text-white'
                                : 'bg-cyber-light text-cyber-text hover:bg-cyber-primary'
                            }`}
                          >
                            Request
                          </button>
                        </div>
                        
                        {scenarioAnswers[scenario.id] && (
                          <div className={`mt-3 p-2 rounded-lg text-xs ${
                            scenarioAnswers[scenario.id] === scenario.correctAnswer
                              ? 'bg-cyber-neon/20 text-cyber-neon'
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {scenario.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {Object.keys(scenarioAnswers).length === currentLesson.exercise.scenarios.length && (
                    <button
                      onClick={checkAnswers}
                      className="w-full py-3 bg-cyber-accent text-cyber-dark font-mono rounded-lg hover:bg-cyber-neon transition-colors"
                    >
                      Check Answers
                    </button>
                  )}
                </div>
              )}

              {/* Split Payment Exercise */}
              {currentLesson.exercise.type === 'split-payment' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-cyber-light bg-cyber-bg">
                    <p className="font-mono text-sm mb-4">
                      The total bill is <span className="text-cyber-neon">₹{currentLesson.exercise.totalAmount}</span> for{' '}
                      <span className="text-cyber-neon">{currentLesson.exercise.numberOfPeople}</span> people.
                    </p>
                    
                    <form onSubmit={handleSplitSubmit} className="space-y-3">
                      <div>
                        <label className="block text-sm font-mono mb-2">How much should each person pay?</label>
                        <input
                          type="number"
                          value={splitAmount}
                          onChange={(e) => setSplitAmount(e.target.value)}
                          className="w-full p-3 bg-cyber-dark border border-cyber-light rounded-lg font-mono focus:border-cyber-accent focus:outline-none"
                          placeholder="Enter amount"
                        />
                      </div>
                      
                      {splitError && (
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <p className="text-red-300 text-xs">{splitError}</p>
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-cyber-accent text-cyber-dark font-mono rounded-lg hover:bg-cyber-neon transition-colors"
                      >
                        Submit Answer
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Fraud Simulation Exercise */}
              {currentLesson.exercise.type === 'fraud-simulation' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-cyber-light bg-cyber-bg">
                    <p className="font-mono text-sm mb-4">📩 {currentLesson.exercise.scenario}</p>
                    
                    <div className="space-y-3">
                      {currentLesson.exercise.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setFraudAnswer(option.id)}
                          className={`w-full py-3 rounded-lg font-mono transition-colors ${
                            fraudAnswer === option.id
                              ? option.isCorrect
                                ? 'bg-cyber-neon text-cyber-dark'
                                : 'bg-red-500 text-white'
                              : 'bg-cyber-light text-cyber-text hover:bg-cyber-primary'
                          }`}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                    
                    {fraudAnswer && (
                      <div className={`mt-4 p-3 rounded-lg text-xs ${
                        currentLesson.exercise.options.find(opt => opt.id === fraudAnswer)?.isCorrect
                          ? 'bg-cyber-neon/20 text-cyber-neon'
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        <p>
                          {currentLesson.exercise.options.find(opt => opt.id === fraudAnswer)?.explanation}
                        </p>
                        
                        {!currentLesson.exercise.options.find(opt => opt.id === fraudAnswer)?.isCorrect && (
                          <button
                            onClick={() => setFraudAnswer(null)}
                            className="mt-2 px-3 py-1 bg-cyber-dark text-cyber-text rounded text-xs"
                          >
                            Try Again
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {fraudAnswer && currentLesson.exercise.options.find(opt => opt.id === fraudAnswer)?.isCorrect && (
                    <button
                      onClick={checkAnswers}
                      className="w-full py-3 bg-cyber-accent text-cyber-dark font-mono rounded-lg hover:bg-cyber-neon transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              )}
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
              <span className="font-mono text-sm text-cyber-muted">Lesson {lessonNumber} of {course.totalLessons}</span>
            </div>
            
            {isLastLesson ? (
              <button 
                onClick={() => setShowCompletion(true)}
                disabled={!isCompleted}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-mono transition-colors ${
                  isCompleted 
                    ? 'bg-cyber-accent text-cyber-dark hover:bg-cyber-neon' 
                    : 'bg-cyber-light text-cyber-muted cursor-not-allowed'
                }`}
              >
                <span>Complete Course</span>
                <CheckCircle size={20} />
              </button>
            ) : (
              <button 
                disabled={!isCompleted}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-mono transition-colors ${
                  isCompleted 
                    ? 'bg-cyber-accent text-cyber-dark hover:bg-cyber-neon' 
                    : 'bg-cyber-light text-cyber-muted cursor-not-allowed'
                }`}
                onClick={() => {
                  window.location.href = `/course/${courseId}/lesson-${lessonNumber + 1}`;
                }}
              >
                <span>Next Lesson</span>
                <ArrowRight size={20} />
              </button>
            )}
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
                Great job! You've mastered this UPI concept.
              </p>
              <div className="flex items-center justify-center space-x-2 text-cyber-accent">
                <Zap size={20} />
                <span className="font-mono font-bold">+{course.xpPerLesson} XP Earned!</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Course Completion Overlay */}
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
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
              <h3 className="font-mono text-2xl font-bold text-cyber-neon mb-2">
                🎉 Course Completed!
              </h3>
              <p className="text-cyber-text mb-4">
                Congratulations! You've mastered safe UPI payments.
              </p>
              <div className="flex items-center justify-center space-x-2 text-cyber-accent mb-6">
                <Zap size={20} />
                <span className="font-mono font-bold">+{(course.xpPerLesson || 0) * (course.totalLessons || 0)} XP Earned!</span>
              </div>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-cyber-accent text-cyber-dark font-mono rounded-lg hover:bg-cyber-neon transition-colors"
              >
                Return to Course List
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}