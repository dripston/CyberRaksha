import { useState, useEffect, useMemo } from 'react';
import { useRoute, useLocation } from 'wouter';
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

// Mock course data for Password Security Fundamentals
const mockPasswordCourse: Course = {
  id: "password-security-course",
  title: "Password Security Fundamentals",
  description: "Learn the basics of creating and managing secure passwords to protect your digital identity.",
  difficulty: "beginner",
  totalLessons: 5,
  xpPerLesson: 50,
  icon: "🔒",
  createdAt: new Date()
};

// Mock course data for Social Media Safety
const mockSocialMediaCourse: Course = {
  id: "social-media-safety-course",
  title: "Social Media Safety",
  description: "Navigate social media platforms safely and protect your privacy online.",
  difficulty: "beginner",
  totalLessons: 5,
  xpPerLesson: 50,
  icon: "📱",
  createdAt: new Date()
};

// Mock course data for Email Security
const mockEmailCourse: Course = {
  id: "email-security-course",
  title: "Email Security",
  description: "Master email security to avoid phishing attacks and protect sensitive information.",
  difficulty: "beginner",
  totalLessons: 5,
  xpPerLesson: 50,
  icon: "📧",
  createdAt: new Date()
};

// Mock course data for Public WiFi Security
const mockWifiCourse: Course = {
  id: "public-wifi-security-course",
  title: "Public WiFi Security",
  description: "Stay safe when using public WiFi networks and protect your data.",
  difficulty: "beginner",
  totalLessons: 5,
  xpPerLesson: 50,
  icon: "📶",
  createdAt: new Date()
};

// Mock course data for Mobile Device Security
const mockMobileCourse: Course = {
  id: "mobile-device-security-course",
  title: "Mobile Device Security",
  description: "Secure your mobile devices and protect your data on the go.",
  difficulty: "beginner",
  totalLessons: 5,
  xpPerLesson: 50,
  icon: "📱",
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

// Lesson data for "Password Security Fundamentals" course
const passwordLessonsData = {
  'lesson-1': {
    id: 'lesson-1',
    title: 'Intro – The Digital Fortress',
    story: `In the vast digital realm, your passwords are the keys to your personal kingdom. Every account, every service, every piece of your digital life is protected by these secret combinations.

But the cyber world is full of cunning hackers, password crackers, and digital thieves. They're constantly trying to break into your accounts, steal your information, and wreak havoc in your digital life.

Your mission: Master the art of creating unbreakable passwords and protecting them with your life. The fate of your digital identity depends on it.`,

    concept: `🔐 **What is a Password?**
A password is a secret combination of characters that proves you are who you claim to be. Think of it as a digital signature that only you know.

🛡️ **Why Passwords Matter:**
- They protect your personal information
- They secure your financial accounts
- They guard your social media presence
- They protect your work and school accounts
- They are your first line of defense against cyber attacks

💀 **The Consequences of Weak Passwords:**
- Identity theft and fraud
- Financial losses
- Privacy violations
- Reputation damage
- Legal complications

Remember: A weak password is like leaving your house keys under the doormat - convenient for you, but also for burglars!`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Click on each category** to reveal password strength indicators
2. **Select the correct option** for each category:
   - 🔴 **Weak**: Easily guessable or crackable passwords
   - 🟡 **Medium**: Somewhat secure but could be stronger
   - 🟢 **Strong**: Hard to crack and secure passwords

3. **Watch the colors**: 
   - ✅ Green = Correct placement
   - ❌ Red = Wrong category

4. **Complete all categories** to unlock the next lesson!

💡 **Pro Tip**: Strong passwords are your digital armor. Learn to recognize what makes them strong!`,

    exercise: {
      type: 'mcq-categorization',
      title: 'Categorize Password Strength',
      instruction: 'Click categories to see options, then select the correct password strength level.',
      items: [
        { 
          id: 'weak-1', 
          text: 'password123', 
          type: 'Weak',
          visual: '🔴'
        },
        { 
          id: 'weak-2', 
          text: '123456789', 
          type: 'Weak',
          visual: '🔴'
        },
        { 
          id: 'weak-3', 
          text: 'qwerty', 
          type: 'Weak',
          visual: '🔴'
        },
        { 
          id: 'medium-1', 
          text: 'mypassword2023', 
          type: 'Medium',
          visual: '🟡'
        },
        { 
          id: 'medium-2', 
          text: 'john1234', 
          type: 'Medium',
          visual: '🟡'
        },
        { 
          id: 'strong-1', 
          text: 'K9#mP2$vL8@nR5', 
          type: 'Strong',
          visual: '🟢'
        },
        { 
          id: 'strong-2', 
          text: 'Tr0ub4dor&3', 
          type: 'Strong',
          visual: '🟢'
        },
        { 
          id: 'strong-3', 
          text: 'correcthorsebatterystaple', 
          type: 'Strong',
          visual: '🟢'
        }
      ],
      categories: ['Weak', 'Medium', 'Strong']
    }
  },
  'lesson-2': {
    id: 'lesson-2',
    title: 'Mission 1 – The Password Recipe',
    story: `You're in a digital kitchen, and you need to cook up the perfect password. But what ingredients make a password truly secure?

Your cybersecurity mentor hands you a recipe book. "The secret," they whisper, "is in the ingredients and how you mix them. A strong password is like a complex dish - it needs variety, balance, and the right techniques."`,

    concept: `🍳 **The Password Recipe - Essential Ingredients:**

🔤 **Uppercase Letters (A-Z)**: Adds complexity and variety
🔤 **Lowercase Letters (a-z)**: The base of your password
🔢 **Numbers (0-9)**: Makes it harder to guess
🔣 **Special Characters (!@#$%^&*)**: The secret sauce that confuses hackers
📏 **Length (12+ characters)**: More characters = more combinations = harder to crack

🧮 **The Math Behind It:**
- 26 lowercase letters = 26 possibilities per character
- Add uppercase = 52 possibilities per character  
- Add numbers = 62 possibilities per character
- Add special characters = 95+ possibilities per character
- 12 characters with 95 possibilities = 95^12 = trillions of combinations!

💡 **Pro Tip**: Think of it like a lock combination - more numbers and variety make it exponentially harder to crack!`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Examine each password option** carefully
2. **Look for the essential ingredients**: uppercase, lowercase, numbers, special characters, length
3. **Identify which passwords are missing key ingredients**
4. **Select the password that has ALL the required elements**

💡 **Pro Tip**: A strong password is like a complete meal - it needs all the food groups to be nutritious!`,

    exercise: {
      type: 'qr-validation',
      title: 'Find the Complete Password',
      instruction: 'Examine the passwords below and select the one that contains ALL required elements for maximum security.',
      options: [
        {
          id: 'password-1',
          image: '🔤🔤🔢🔣🔤🔤🔢🔣🔤🔤🔢🔣',
          text: 'MyPass123!@# (12 chars, all elements)',
          isCorrect: true
        },
        {
          id: 'password-2',
          image: '🔤🔤🔢🔤🔤🔢🔤🔤🔢',
          text: 'MyPass123 (9 chars, missing special chars)',
          isCorrect: false,
          explanation: 'Missing special characters and too short'
        },
        {
          id: 'password-3',
          image: '🔤🔤🔤🔤🔤🔤🔤🔤🔤🔤🔤🔤',
          text: 'mypassword (12 chars, only lowercase)',
          isCorrect: false,
          explanation: 'Missing uppercase, numbers, and special characters'
        },
        {
          id: 'password-4',
          image: '🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢',
          text: '123456789012 (12 chars, only numbers)',
          isCorrect: false,
          explanation: 'Missing letters and special characters - very weak!'
        }
      ]
    }
  },
  'lesson-3': {
    id: 'lesson-3',
    title: 'Mission 2 – Spot the Weaklings',
    story: `The digital realm is under attack! Hackers are trying to break into accounts using weak passwords. You've been recruited as a password security guard.

Your job: Identify which passwords are weak and vulnerable to attacks. The faster you spot them, the more accounts you can save from being compromised.`,

    concept: `🚨 **Weak Password Red Flags:**

🔴 **Common Patterns:**
- Sequential numbers (123456, 987654)
- Keyboard patterns (qwerty, asdfgh)
- Common words (password, admin, user)
- Personal info (name, birthdate, pet name)

🔴 **Too Short:**
- Less than 8 characters
- Easy to brute force
- Quick to crack with modern tools

🔴 **Predictable:**
- Single word from dictionary
- No variety in character types
- Easy to guess based on context

🔴 **Personal Information:**
- Your name or username
- Birth dates or anniversaries
- Family member names
- Address or phone numbers

💀 **Why They're Dangerous:**
- Can be cracked in seconds
- Often tried first by hackers
- Easy to guess with social engineering
- Provide access to multiple accounts if reused`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each password carefully**
2. **Look for weak password indicators**: common words, patterns, personal info, short length
3. **Identify which passwords are weak and vulnerable**
4. **Select all the weak passwords you can find**

💡 **Pro Tip**: If you can easily guess a password, so can a hacker. When in doubt, assume it's weak!`,

    exercise: {
      type: 'phishing-detection',
      title: 'Identify Weak Passwords',
      instruction: 'Identify which of these passwords are weak and vulnerable to attacks. Select all that apply.',
      messages: [
        {
          id: 'pass-1',
          text: 'password123',
          isPhishing: true,
          explanation: 'Contains "password" (most common weak password) and sequential numbers.'
        },
        {
          id: 'pass-2',
          text: 'K9#mP2$vL8@nR5',
          isPhishing: false,
          explanation: 'Strong password with uppercase, lowercase, numbers, special characters, and good length.'
        },
        {
          id: 'pass-3',
          text: 'qwertyuiop',
          isPhishing: true,
          explanation: 'Keyboard pattern - very easy to guess and crack.'
        },
        {
          id: 'pass-4',
          text: 'john1985',
          isPhishing: true,
          explanation: 'Personal name with birth year - easily guessable with social engineering.'
        },
        {
          id: 'pass-5',
          text: 'correcthorsebatterystaple',
          isPhishing: false,
          explanation: 'Strong passphrase - long, memorable, and hard to crack.'
        }
      ]
    }
  },
  'lesson-4': {
    id: 'lesson-4',
    title: 'Mission 3 – The Memory Game',
    story: `Creating strong passwords is one thing, but remembering them is another challenge entirely. You need a system that creates secure passwords you can actually recall.

Your memory coach shows you different techniques: "Some people use patterns, others use phrases, and some create stories. The key is finding what works for your brain while keeping security high."`,

    concept: `🧠 **Password Creation Techniques:**

🎭 **Passphrase Method:**
- Use 4+ random words (e.g., "correcthorsebatterystaple")
- Easy to remember, hard to crack
- Add numbers/symbols for extra security

🔤 **Acronym Method:**
- Create a memorable sentence
- Use first letters of each word
- Add numbers and symbols (e.g., "I love pizza on Fridays!" → "Ilp0F!")

🎨 **Pattern Method:**
- Use keyboard patterns with variations
- Add numbers and symbols strategically
- Create visual patterns you can remember

🔢 **Substitution Method:**
- Replace letters with similar numbers/symbols
- Use consistent substitutions (e.g., a→@, e→3, i→1)
- Combine with other techniques

💡 **Pro Tip**: The best technique is the one you'll actually use consistently!`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each password creation scenario**
2. **Determine which technique was used** to create the password
3. **Select the correct technique for each example**
4. **Learn how different methods work**

💡 **Pro Tip**: Understanding these techniques will help you create your own strong, memorable passwords!`,

    exercise: {
      type: 'pay-or-request',
      title: 'Identify Password Techniques',
      instruction: 'For each password, select which creation technique was used.',
      scenarios: [
        {
          id: 'scenario-1',
          text: 'Password: "correcthorsebatterystaple"',
          correctAnswer: 'request',
          explanation: 'This is a passphrase - 4 random words that are easy to remember but hard to crack.'
        },
        {
          id: 'scenario-2',
          text: 'Password: "Ilp0F!" (from "I love pizza on Fridays!")',
          correctAnswer: 'pay',
          explanation: 'This uses the acronym method - first letters of each word in a memorable sentence.'
        },
        {
          id: 'scenario-3',
          text: 'Password: "P@ssw0rd" (from "Password")',
          correctAnswer: 'pay',
          explanation: 'This uses the substitution method - replacing letters with similar numbers/symbols.'
        },
        {
          id: 'scenario-4',
          text: 'Password: "qaz2wsx3edc4" (keyboard pattern with numbers)',
          correctAnswer: 'pay',
          explanation: 'This uses the pattern method - following keyboard layout with strategic number additions.'
        },
        {
          id: 'scenario-5',
          text: 'Password: "MyF@v0riteC0l0r!" (from "My favorite color!")',
          correctAnswer: 'request',
          explanation: 'This combines multiple techniques: acronym + substitution + special characters.'
        }
      ]
    }
  },

  'lesson-5': {
    id: 'lesson-5',
    title: 'Mission 4 – The Final Boss (Social Engineering)',
    story: `You've mastered password creation and management. But there's one more threat: social engineering attacks that trick you into giving away your passwords.

A suspicious email arrives: "Your account has been compromised. Click here to reset your password immediately." It looks official, but something feels off. Can you spot the deception before it's too late?`,

    concept: `🎭 **Social Engineering - The Human Factor:**

🧠 **What It Is:**
Social engineering manipulates human psychology to bypass security measures. It's often more effective than technical attacks because it targets human nature.

🚨 **Common Social Engineering Tactics:**

📧 **Phishing Emails:**
- Fake urgency and threats
- Impersonating trusted organizations
- Requesting sensitive information
- Suspicious links and attachments

📞 **Vishing (Voice Phishing):**
- Impersonating tech support
- Creating false emergencies
- Requesting remote access
- Asking for passwords over phone

👥 **Pretexting:**
- Creating fake scenarios
- Impersonating authority figures
- Building false trust relationships
- Gathering information gradually

💀 **Why It Works:**
- Exploits human emotions (fear, greed, urgency)
- Bypasses technical security measures
- Often more effective than brute force
- Targets the weakest link: human psychology

🛡️ **Defense Strategies:**
- Verify sender identity independently
- Never share passwords via email/phone
- Question urgent requests
- Use official contact methods
- Trust your instincts`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each social engineering scenario carefully**
2. **Look for red flags**: urgency, requests for passwords, suspicious links, impersonation
3. **Identify which scenarios are social engineering attacks**
4. **Select all the deceptive scenarios you can spot**

💡 **Pro Tip**: If someone is trying to rush you into doing something with your passwords, it's probably a scam. Take your time and verify everything!`,

    exercise: {
      type: 'phishing-detection',
      title: 'Spot Social Engineering Attacks',
      instruction: 'Identify which of these scenarios are social engineering attacks. Select all that apply.',
      messages: [
        {
          id: 'attack-1',
          text: 'URGENT: Your account will be deleted in 1 hour. Click here to verify: bit.ly/secure123',
          isPhishing: true,
          explanation: 'Creates false urgency and uses suspicious shortened links - classic phishing tactics.'
        },
        {
          id: 'attack-2',
          text: 'Hi, I\'m from Microsoft Support. Your computer has a virus. I need your password to fix it.',
          isPhishing: true,
          explanation: 'Impersonates tech support and requests passwords - never legitimate.'
        },
        {
          id: 'attack-3',
          text: 'Your monthly statement is ready. Download from our official website: bankname.com',
          isPhishing: false,
          explanation: 'Legitimate notification with official website (no suspicious elements).'
        },
        {
          id: 'attack-4',
          text: 'Congratulations! You won $50,000! Enter your password to claim: free-money.com',
          isPhishing: true,
          explanation: 'Too-good-to-be-true offer requesting passwords - obvious scam.'
        },
        {
          id: 'attack-5',
          text: 'Security alert: Unusual login detected. If this wasn\'t you, change your password now.',
          isPhishing: false,
          explanation: 'Legitimate security notification with appropriate action (no suspicious links).'
        }
      ]
    }
     }
 };

// Lesson data for "Social Media Safety" course
const socialMediaLessonsData = {
  'lesson-1': {
    id: 'lesson-1',
    title: 'Intro – The Digital Social Jungle',
    story: `Welcome to the digital social jungle where billions of people connect, share, and interact every day. Social media platforms have become the new town squares, but they're also hunting grounds for cyber predators, data harvesters, and privacy invaders.

Your mission: Navigate this complex social landscape safely, protect your personal information, and maintain your digital reputation while staying connected with friends and family.`,
    
    concept: `📱 **What is Social Media Safety?**
Social media safety is the practice of protecting yourself, your personal information, and your digital reputation while using social networking platforms.

🛡️ **Key Areas of Protection:**
- **Privacy Settings**: Control who sees your information
- **Personal Data**: Protect sensitive information from exposure
- **Digital Footprint**: Manage what you post and share
- **Online Interactions**: Stay safe from cyberbullying and scams
- **Account Security**: Prevent unauthorized access

💀 **Common Dangers:**
- Oversharing personal information
- Falling for fake news and scams
- Cyberbullying and harassment
- Privacy violations and data mining
- Reputation damage from inappropriate posts`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Click on each category** to reveal social media safety elements
2. **Select the correct option** for each category:
   - 🔴 **High Risk**: Dangerous practices that put you at risk
   - 🟡 **Medium Risk**: Somewhat risky but common behaviors
   - 🟢 **Safe Practice**: Secure and recommended behaviors

3. **Watch the colors**: 
   - ✅ Green = Correct placement
   - ❌ Red = Wrong category

4. **Complete all categories** to unlock the next lesson!

💡 **Pro Tip**: Understanding risk levels helps you make better decisions about your online behavior!`,

    exercise: {
      type: 'mcq-categorization',
      title: 'Categorize Social Media Safety',
      instruction: 'Click categories to see options, then select the correct safety level.',
      items: [
        { 
          id: 'high-1', 
          text: 'Posting your home address publicly', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'high-2', 
          text: 'Sharing your phone number with strangers', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'medium-1', 
          text: 'Using public WiFi for social media', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'medium-2', 
          text: 'Accepting friend requests from unknown people', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'safe-1', 
          text: 'Using strong, unique passwords', 
          type: 'Safe Practice',
          visual: '🟢'
        },
        { 
          id: 'safe-2', 
          text: 'Reviewing privacy settings regularly', 
          type: 'Safe Practice',
          visual: '🟢'
        },
        { 
          id: 'safe-3', 
          text: 'Thinking before posting personal info', 
          type: 'Safe Practice',
          visual: '🟢'
        }
      ],
      categories: ['High Risk', 'Medium Risk', 'Safe Practice']
    }
  },
  'lesson-2': {
    id: 'lesson-2',
    title: 'Mission 1 – Privacy Settings Mastery',
    story: `You've just created your first social media account. The platform asks for your permission to access your contacts, location, and camera. You're excited to start sharing, but something tells you to be careful about what you're giving away.

Your privacy mentor appears: "Every permission you grant is like opening a door to your digital life. Some doors are necessary, others are optional, and some should stay locked forever."`,
    
    concept: `🔒 **Privacy Settings - Your Digital Doors:**

🚪 **Location Services:**
- Only enable when absolutely necessary
- Disable for apps that don't need location
- Be aware of background location tracking

📱 **Camera & Microphone:**
- Grant only when actively using features
- Revoke access when not needed
- Check which apps have background access

👥 **Contact Access:**
- Be cautious about sharing your contact list
- Some apps use contacts for targeted advertising
- Consider using fake contacts for testing

📊 **Data Sharing:**
- Review what data is shared with third parties
- Opt out of unnecessary data collection
- Understand how your data is used for advertising`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Examine each privacy setting option** carefully
2. **Look for signs of security**: necessary permissions, minimal data sharing, user control
3. **Identify which settings are safe and which are risky**
4. **Select the privacy setting that offers the best protection**

💡 **Pro Tip**: When in doubt, choose the option that gives you the most control and shares the least data!`,

    exercise: {
      type: 'qr-validation',
      title: 'Choose the Safest Privacy Setting',
      instruction: 'Examine the privacy settings below and select the one that offers the best protection.',
      options: [
        {
          id: 'setting-1',
          image: '🔒🔒🔒🔒🔒\n🔒📱🔒📱🔒\n🔒🔒🔒🔒🔒\n🔒📱🔒📱🔒\n🔒🔒🔒🔒🔒',
          text: 'Location: Only while using app, Contacts: Never, Camera: Only when needed',
          isCorrect: true
        },
        {
          id: 'setting-2',
          image: '🔒🔒🔒🔒🔒\n🔒📱🔒📱🔒\n🔒🔒🔒🔒🔒\n🔒📱🔒📱🔒\n🔒🔒🔒🔒🔒',
          text: 'Location: Always, Contacts: Always, Camera: Always',
          isCorrect: false
        },
        {
          id: 'setting-3',
          image: '🔒🔒🔒🔒🔒\n🔒📱🔒📱🔒\n🔒🔒🔒🔒🔒\n🔒📱🔒📱🔒\n🔒🔒🔒🔒🔒',
          text: 'Location: Never, Contacts: Never, Camera: Never',
          isCorrect: false
        }
      ]
    }
  },
  'lesson-3': {
    id: 'lesson-3',
    title: 'Mission 2 – Spot the Fake Profile',
    story: `You're scrolling through your social media feed when you notice a profile that seems suspicious. The person claims to be a celebrity, but something about their posts and behavior doesn't add up.

Your social media mentor appears: "Fake profiles are like digital wolves in sheep's clothing. They're designed to trick you into trusting them, but their true intentions are often malicious."`,
    
    concept: `🎭 **Fake Profile Red Flags:**

👤 **Profile Picture Issues:**
- Stolen celebrity photos
- Generic stock images
- Poor quality or blurry images
- Images that seem too perfect

📝 **Content Red Flags:**
- Posts that seem too good to be true
- Excessive use of trending hashtags
- Generic or copied content
- Inconsistent posting patterns

🔗 **Behavior Patterns:**
- Aggressive friend requests
- Immediate requests for personal information
- Suspicious links in messages
- Unusual account activity

💰 **Financial Scams:**
- Requests for money or gifts
- Investment opportunities
- Charity scams
- Romance scams`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Examine each profile carefully**
2. **Look for fake profile indicators**: stolen photos, suspicious content, unusual behavior
3. **Identify which profiles are fake**
4. **Select all the fake profiles you can find**

💡 **Pro Tip**: If something seems too good to be true, it probably is! Trust your instincts.`,

    exercise: {
      type: 'phishing-detection',
      title: 'Spot the Fake Profiles',
      instruction: 'Identify which of these social media profiles are fake. Select all that apply.',
      messages: [
        {
          id: 'profile-1',
          text: 'Profile: @celebrity_official - "I\'m giving away $10,000 to my fans! DM me your bank details!"',
          isPhishing: true,
          explanation: 'Celebrity impersonation with financial scam'
        },
        {
          id: 'profile-2',
          text: 'Profile: @tech_company - "Download our latest security update from secure-link.com"',
          isPhishing: false,
          explanation: 'Legitimate company with official domain'
        },
        {
          id: 'profile-3',
          text: 'Profile: @random_user - "I\'m a model from Paris, want to chat? Click here: chat-app.com"',
          isPhishing: true,
          explanation: 'Suspicious profile with external link request'
        },
        {
          id: 'profile-4',
          text: 'Profile: @local_business - "We\'re hiring! Apply at our official website: business.com"',
          isPhishing: false,
          explanation: 'Legitimate business with official website'
        },
        {
          id: 'profile-5',
          text: 'Profile: @charity_org - "Help earthquake victims! Send money to this account: 1234-5678"',
          isPhishing: true,
          explanation: 'Charity scam with direct money request'
        }
      ]
    }
  },
  'lesson-4': {
    id: 'lesson-4',
    title: 'Mission 3 – Safe Sharing Practices',
    story: `You want to share your vacation photos and update your friends about your trip. But before you post, you realize you need to think about what information you're revealing and who might see it.

Your social media mentor appears: "Every post you make creates a digital footprint. Think about what you're sharing, who can see it, and how it might affect your safety and privacy."`,
    
    concept: `📸 **Safe Sharing Guidelines:**

🔒 **Personal Information:**
- Never share your home address
- Avoid posting your phone number
- Don't reveal your daily routine
- Be careful with location tags

⏰ **Timing Considerations:**
- Don't post about vacations while away
- Avoid sharing your work schedule
- Be mindful of when you're home alone
- Consider the timing of personal updates

👥 **Audience Awareness:**
- Review your privacy settings regularly
- Be selective about who can see your posts
- Consider creating private groups for close friends
- Think about who might find your information

🛡️ **Content Safety:**
- Avoid sharing financial information
- Don't post about valuable possessions
- Be careful with family photos
- Think before sharing personal achievements`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each sharing scenario carefully**
2. **Identify the security risks** in each situation
3. **Choose the safest option** for each scenario
4. **Consider privacy, safety, and digital footprint**

💡 **Pro Tip**: When in doubt, ask yourself: "Would I want this information to be public forever?"`,

    exercise: {
      type: 'scenario',
      title: 'Choose Safe Sharing Options',
      instruction: 'For each scenario, select the safest way to share information.',
      scenarios: [
        {
          id: 'scenario-1',
          question: 'You\'re going on vacation next week. What\'s the safest way to share this?',
          options: [
            { id: 'option-1a', text: 'Post photos while you\'re away with location tags', isCorrect: false },
            { id: 'option-1b', text: 'Share photos after returning home, no location tags', isCorrect: true },
            { id: 'option-1c', text: 'Post your travel itinerary with dates and locations', isCorrect: false }
          ]
        },
        {
          id: 'scenario-2',
          question: 'You got a new job! How should you share this news?',
          options: [
            { id: 'option-2a', text: 'Post your new company name and position immediately', isCorrect: false },
            { id: 'option-2b', text: 'Wait until you\'ve started and share general excitement', isCorrect: true },
            { id: 'option-2c', text: 'Share your new salary and benefits package', isCorrect: false }
          ]
        },
        {
          id: 'scenario-3',
          question: 'You\'re home alone for the weekend. What should you do?',
          options: [
            { id: 'option-3a', text: 'Post about being home alone with your address', isCorrect: false },
            { id: 'option-3b', text: 'Share that you\'re having a quiet weekend at home', isCorrect: false },
            { id: 'option-3c', text: 'Don\'t post about being home alone', isCorrect: true }
          ]
        }
      ]
    }
  },
  'lesson-5': {
    id: 'lesson-5',
    title: 'Mission 4 – Cyberbullying Defense',
    story: `You notice that one of your friends is being targeted by cyberbullies in the comments section. The bullies are posting mean comments, spreading rumors, and trying to embarrass your friend.

Your social media mentor appears: "Cyberbullying is a serious issue that affects millions of people. Learning how to recognize, report, and prevent it is crucial for creating a safer online environment."`,
    
    concept: `🛡️ **Cyberbullying Defense Strategies:**

🚨 **Recognizing Cyberbullying:**
- Repeated mean or threatening messages
- Spreading rumors or false information
- Posting embarrassing photos or videos
- Creating fake profiles to harass someone
- Excluding someone from online groups

📱 **Immediate Actions:**
- Don't respond to the bully
- Save evidence (screenshots, messages)
- Block the bully from your accounts
- Report the behavior to the platform
- Tell a trusted adult or authority figure

💪 **Supporting Victims:**
- Offer emotional support
- Help document the bullying
- Encourage reporting to authorities
- Don't share or forward harmful content
- Stand up against bullying when safe to do so

🔒 **Prevention Measures:**
- Use privacy settings to control who can contact you
- Be careful about what you share online
- Think before you post or comment
- Treat others with respect online
- Build a positive online reputation`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each cyberbullying scenario carefully**
2. **Identify the best response** for each situation
3. **Choose actions that protect the victim** and prevent further harm
4. **Consider both immediate safety and long-term solutions**

💡 **Pro Tip**: The best response to cyberbullying is often to not engage and to report it immediately.`,

    exercise: {
      type: 'scenario',
      title: 'Respond to Cyberbullying',
      instruction: 'For each cyberbullying scenario, select the best response.',
      scenarios: [
        {
          id: 'scenario-1',
          question: 'Someone is posting mean comments on your friend\'s photos. What should you do first?',
          options: [
            { id: 'option-1a', text: 'Respond with mean comments back at the bully', isCorrect: false },
            { id: 'option-1b', text: 'Take screenshots and report the behavior', isCorrect: true },
            { id: 'option-1c', text: 'Ignore it and hope it goes away', isCorrect: false }
          ]
        },
        {
          id: 'scenario-2',
          question: 'You receive a threatening message from an unknown account. What\'s your first step?',
          options: [
            { id: 'option-2a', text: 'Reply and ask them to stop', isCorrect: false },
            { id: 'option-2b', text: 'Block the account and save the message', isCorrect: true },
            { id: 'option-2c', text: 'Share the message with all your friends', isCorrect: false }
          ]
        },
        {
          id: 'scenario-3',
          question: 'Someone creates a fake profile using your photos. What should you do?',
          options: [
            { id: 'option-3a', text: 'Confront them directly through the fake profile', isCorrect: false },
            { id: 'option-3b', text: 'Report the fake profile to the platform', isCorrect: true },
            { id: 'option-3c', text: 'Ignore it since it\'s not your real account', isCorrect: false }
          ]
        }
      ]
    }
  }
};

// Lesson data for "Email Security" course
const emailLessonsData = {
  'lesson-1': {
    id: 'lesson-1',
    title: 'Intro – The Digital Mailbox',
    story: `Your email inbox is like a digital mailbox that receives messages from around the world. But unlike a physical mailbox, this one is constantly under attack from cyber criminals, scammers, and malicious hackers.

Your mission: Master the art of email security to protect yourself from phishing attacks, malware, and data theft while maintaining safe communication with legitimate contacts.`,
    
    concept: `📧 **What is Email Security?**
Email security involves protecting your email communications from various threats and ensuring the confidentiality, integrity, and availability of your messages.

🛡️ **Common Email Threats:**
- **Phishing**: Fake emails designed to steal information
- **Malware**: Viruses and malicious software attachments
- **Spam**: Unwanted and potentially dangerous messages
- **Spoofing**: Emails that appear to come from trusted sources
- **Data Breaches**: Unauthorized access to email accounts

💀 **Why Email is Vulnerable:**
- Emails can contain malicious links and attachments
- Sender addresses can be easily forged
- Users often trust emails from familiar sources
- Email clients may not always detect threats
- One click can compromise your entire system`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Click on each category** to reveal email security elements
2. **Select the correct option** for each category:
   - 🔴 **High Risk**: Dangerous email practices that put you at risk
   - 🟡 **Medium Risk**: Somewhat risky but common behaviors
   - 🟢 **Safe Practice**: Secure and recommended behaviors

3. **Watch the colors**: 
   - ✅ Green = Correct placement
   - ❌ Red = Wrong category

4. **Complete all categories** to unlock the next lesson!

💡 **Pro Tip**: Email security is your first line of defense against cyber attacks!`,

    exercise: {
      type: 'mcq-categorization',
      title: 'Categorize Email Security Practices',
      instruction: 'Click categories to see options, then select the correct security level.',
      items: [
        { 
          id: 'high-1', 
          text: 'Clicking links in suspicious emails', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'high-2', 
          text: 'Opening attachments from unknown senders', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'medium-1', 
          text: 'Using the same password for email and other accounts', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'medium-2', 
          text: 'Not enabling two-factor authentication', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'safe-1', 
          text: 'Verifying sender addresses carefully', 
          type: 'Safe Practice',
          visual: '🟢'
        },
        { 
          id: 'safe-2', 
          text: 'Using strong, unique passwords', 
          type: 'Safe Practice',
          visual: '🟢'
        },
        { 
          id: 'safe-3', 
          text: 'Enabling spam filters and security features', 
          type: 'Safe Practice',
          visual: '🟢'
        }
      ],
      categories: ['High Risk', 'Medium Risk', 'Safe Practice']
    }
  },
  'lesson-2': {
    id: 'lesson-2',
    title: 'Mission 1 – Spot the Phishing Hook',
    story: `Your inbox is flooded with emails claiming to be from your bank, social media accounts, and even government agencies. Some look legitimate, others seem suspicious, but you need to know which ones are real and which are phishing attempts.

Your email security mentor appears: "Phishing emails are like fishing hooks - they're designed to catch you off guard and steal your information. The key is learning to spot the bait before you bite."`,
    
    concept: `🎣 **Phishing Email Red Flags:**

📧 **Sender Address Issues:**
- Slight misspellings in domain names
- Unusual email addresses
- Impersonating trusted companies
- Generic sender names

🚨 **Urgency and Threats:**
- "Your account will be closed in 24 hours"
- "Immediate action required"
- "Security breach detected"
- "Legal action pending"

🔗 **Suspicious Links:**
- Shortened URLs (bit.ly, tinyurl)
- Mismatched link text and destination
- Links to unfamiliar domains
- Requests to verify information

💰 **Financial Requests:**
- Asking for banking details
- Requesting credit card information
- Offering unexpected money
- Demanding immediate payment`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Examine each email carefully**
2. **Look for phishing indicators**: urgency, suspicious links, requests for information
3. **Identify which emails are phishing attempts**
4. **Select all the suspicious emails you can find**

💡 **Pro Tip**: When in doubt, don't click! Contact the company directly through official channels.`,

    exercise: {
      type: 'phishing-detection',
      title: 'Spot the Phishing Emails',
      instruction: 'Identify which of these emails are phishing attempts. Select all that apply.',
      messages: [
        {
          id: 'email-1',
          text: 'URGENT: Your bank account has been compromised. Click here to verify: bit.ly/secure123',
          isPhishing: true,
          explanation: 'Creates false urgency and uses suspicious shortened links'
        },
        {
          id: 'email-2',
          text: 'Your monthly statement is ready. Download from our official website: bankname.com',
          isPhishing: false,
          explanation: 'Legitimate notification with official website'
        },
        {
          id: 'email-3',
          text: 'Congratulations! You won $50,000! Enter your details to claim: free-money.com',
          isPhishing: true,
          explanation: 'Too-good-to-be-true offer with suspicious domain'
        },
        {
          id: 'email-4',
          text: 'Security alert: Unusual login detected. If this wasn\'t you, change your password now.',
          isPhishing: false,
          explanation: 'Legitimate security notification with appropriate action'
        },
        {
          id: 'email-5',
          text: 'Hi, I\'m from Microsoft Support. Your computer has a virus. I need your password to fix it.',
          isPhishing: true,
          explanation: 'Impersonates tech support and requests passwords'
        }
      ]
    }
  },
  'lesson-3': {
    id: 'lesson-3',
    title: 'Mission 2 – Secure Email Habits',
    story: `You've learned to spot phishing emails, but now you need to develop secure email habits that protect you every day. Your email is your digital identity, and every message you send or receive could be a potential security risk.

Your email security mentor appears: "Good habits are like a strong foundation - they protect you even when you're not actively thinking about security. Build these habits now, and they'll serve you for life."`,
    
    concept: `📧 **Secure Email Habits:**

🔐 **Password Security:**
- Use strong, unique passwords for email accounts
- Enable two-factor authentication (2FA)
- Never share your email password with anyone
- Change passwords regularly, especially after breaches

📱 **Device Security:**
- Log out of email when using shared devices
- Don't save passwords on public computers
- Use secure networks when accessing email
- Keep your devices updated and secure

📤 **Sending Safely:**
- Double-check recipient addresses before sending
- Be careful with "Reply All" - only include necessary people
- Don't send sensitive information via email
- Use encryption for confidential communications

📥 **Receiving Safely:**
- Don't open attachments from unknown senders
- Be suspicious of unexpected emails
- Verify sender addresses carefully
- Don't click links without verification`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each email security scenario carefully**
2. **Identify the secure practice** for each situation
3. **Choose the option that best protects your security**
4. **Consider both immediate safety and long-term habits**

💡 **Pro Tip**: Secure habits become automatic with practice. Start building them today!`,

    exercise: {
      type: 'scenario',
      title: 'Choose Secure Email Practices',
      instruction: 'For each scenario, select the most secure email practice.',
      scenarios: [
        {
          id: 'scenario-1',
          question: 'You need to send your bank statement to your accountant. What\'s the safest way?',
          options: [
            { id: 'option-1a', text: 'Email it directly as an attachment', isCorrect: false },
            { id: 'option-1b', text: 'Use a secure file sharing service with password protection', isCorrect: true },
            { id: 'option-1c', text: 'Send it to their personal email address', isCorrect: false }
          ]
        },
        {
          id: 'scenario-2',
          question: 'You receive an email from your bank asking to verify your account. What should you do?',
          options: [
            { id: 'option-2a', text: 'Click the link and enter your details immediately', isCorrect: false },
            { id: 'option-2b', text: 'Call your bank directly using the number from their official website', isCorrect: true },
            { id: 'option-2c', text: 'Forward the email to your bank\'s support address', isCorrect: false }
          ]
        },
        {
          id: 'scenario-3',
          question: 'You\'re using a public computer to check your email. What\'s the most important step?',
          options: [
            { id: 'option-3a', text: 'Save your password for convenience', isCorrect: false },
            { id: 'option-3b', text: 'Log out completely when finished', isCorrect: true },
            { id: 'option-3c', text: 'Use the same password you use at home', isCorrect: false }
          ]
        }
      ]
    }
  },
  'lesson-4': {
    id: 'lesson-4',
    title: 'Mission 3 – Email Encryption Basics',
    story: `You've learned about secure habits, but now you discover that some emails need extra protection. Your company is sending sensitive information, and you need to understand how encryption works to keep communications secure.

Your email security mentor appears: "Encryption is like putting your message in a locked box. Only the person with the right key can read what's inside. It's essential for protecting sensitive information."`,
    
    concept: `🔐 **Email Encryption Explained:**

🔒 **What is Encryption?**
- Encryption converts readable text into unreadable code
- Only authorized recipients can decrypt and read the message
- Protects your emails from hackers and unauthorized access
- Essential for sensitive business and personal communications

📊 **Types of Email Encryption:**
- **Transport Layer Security (TLS)**: Protects emails in transit
- **End-to-End Encryption**: Only sender and recipient can read
- **File Encryption**: Protects attachments and documents
- **Digital Signatures**: Verifies sender authenticity

🛡️ **When to Use Encryption:**
- Sending financial information
- Sharing personal data
- Business communications
- Legal documents
- Medical information
- Any sensitive or confidential data

💻 **How to Enable Encryption:**
- Use email providers that support TLS
- Enable encryption in your email client
- Use encrypted file sharing for attachments
- Consider end-to-end encryption for sensitive messages`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each encryption scenario carefully**
2. **Identify which situations require encryption**
3. **Choose the appropriate encryption method**
4. **Consider the sensitivity of the information being shared**

💡 **Pro Tip**: When in doubt about whether to encrypt, it's better to be safe than sorry!`,

    exercise: {
      type: 'mcq-categorization',
      title: 'Categorize Encryption Needs',
      instruction: 'Click categories to see options, then select the correct encryption level.',
      items: [
        { 
          id: 'high-1', 
          text: 'Sending your social security number', 
          type: 'High Security',
          visual: '🔴'
        },
        { 
          id: 'high-2', 
          text: 'Sharing company trade secrets', 
          type: 'High Security',
          visual: '🔴'
        },
        { 
          id: 'medium-1', 
          text: 'Sending a resume to a potential employer', 
          type: 'Medium Security',
          visual: '🟡'
        },
        { 
          id: 'medium-2', 
          text: 'Sharing personal photos with family', 
          type: 'Medium Security',
          visual: '🟡'
        },
        { 
          id: 'low-1', 
          text: 'Sending a casual greeting to a friend', 
          type: 'Low Security',
          visual: '🟢'
        },
        { 
          id: 'low-2', 
          text: 'Sharing a public news article', 
          type: 'Low Security',
          visual: '🟢'
        },
        { 
          id: 'low-3', 
          text: 'Sending a joke or meme', 
          type: 'Low Security',
          visual: '🟢'
        }
      ],
      categories: ['High Security', 'Medium Security', 'Low Security']
    }
  },
  'lesson-5': {
    id: 'lesson-5',
    title: 'Mission 4 – Advanced Threat Detection',
    story: `You've learned the basics of email security, but cyber criminals are constantly evolving their tactics. You need to learn about advanced threats like spear phishing, business email compromise, and sophisticated malware attacks.

Your email security mentor appears: "Advanced threats are like professional con artists - they study their targets and create highly convincing attacks. Your best defense is knowledge and constant vigilance."`,
    
    concept: `🎯 **Advanced Email Threats:**

🎭 **Spear Phishing:**
- Targeted attacks against specific individuals or organizations
- Attackers research their targets for maximum believability
- Uses personal information to gain trust
- Often targets executives and employees with access to sensitive data

🏢 **Business Email Compromise (BEC):**
- Attackers impersonate company executives or vendors
- Requests for urgent wire transfers or sensitive information
- Often involves social engineering and psychological manipulation
- Can result in massive financial losses

🦠 **Advanced Malware:**
- Sophisticated viruses that evade traditional detection
- Ransomware that encrypts your files and demands payment
- Keyloggers that record your keystrokes
- Remote access trojans that give attackers control of your device

🔍 **Detection Techniques:**
- Look for subtle inconsistencies in sender addresses
- Be suspicious of urgent requests for money or information
- Verify unusual requests through alternative channels
- Pay attention to changes in communication patterns`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Examine each advanced threat scenario carefully**
2. **Look for sophisticated attack indicators**: targeted information, urgency, unusual requests
3. **Identify which emails contain advanced threats**
4. **Select all the suspicious emails you can find**

💡 **Pro Tip**: Advanced threats often look very convincing. When in doubt, verify through official channels!`,

    exercise: {
      type: 'phishing-detection',
      title: 'Spot Advanced Email Threats',
      instruction: 'Identify which of these emails contain advanced threats. Select all that apply.',
      messages: [
        {
          id: 'email-1',
          text: 'Hi [Your Name], I need you to process an urgent wire transfer for $50,000 to account 1234-5678. This is confidential.',
          isPhishing: true,
          explanation: 'Business email compromise with urgent financial request'
        },
        {
          id: 'email-2',
          text: 'Your package has been delivered. Track it at: ups-tracking.com/secure-delivery',
          isPhishing: false,
          explanation: 'Legitimate delivery notification'
        },
        {
          id: 'email-3',
          text: 'Hi [Your Name], I noticed you work at [Company]. I have a business proposal that could benefit both of us. Let\'s discuss.',
          isPhishing: true,
          explanation: 'Spear phishing using personal information'
        },
        {
          id: 'email-4',
          text: 'Your monthly newsletter is ready. Read the latest updates from our team.',
          isPhishing: false,
          explanation: 'Legitimate newsletter subscription'
        },
        {
          id: 'email-5',
          text: 'URGENT: Your account has been suspended due to suspicious activity. Click here immediately to restore access: secure-login.com',
          isPhishing: true,
          explanation: 'Advanced phishing with urgency and suspicious link'
        }
      ]
    }
  }
};

// Lesson data for "Public WiFi Security" course
const wifiLessonsData = {
  'lesson-1': {
    id: 'lesson-1',
    title: 'Intro – The Wireless Wilderness',
    story: `You're at a coffee shop, airport, or library, and you need to check your email or browse the web. Free WiFi is everywhere, but so are cyber predators lurking in the digital shadows, waiting to intercept your data.

Your mission: Navigate the wireless wilderness safely, protect your personal information, and understand the hidden dangers of public WiFi networks.`,
    
    concept: `📶 **What is Public WiFi Security?**
Public WiFi security involves protecting your data and devices when connecting to wireless networks in public places like cafes, airports, hotels, and libraries.

🛡️ **Risks of Public WiFi:**
- **Man-in-the-Middle Attacks**: Hackers intercepting your data
- **Packet Sniffing**: Criminals reading your unencrypted traffic
- **Fake Hotspots**: Malicious networks that look legitimate
- **Session Hijacking**: Attackers stealing your login sessions
- **Malware Distribution**: Viruses spread through compromised networks

💀 **Why Public WiFi is Dangerous:**
- No encryption on most public networks
- Anyone on the same network can potentially see your traffic
- Fake networks can trick you into connecting
- Your device may automatically connect to dangerous networks
- One wrong connection can compromise your entire device`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Click on each category** to reveal WiFi security elements
2. **Select the correct option** for each category:
   - 🔴 **High Risk**: Dangerous WiFi practices that put you at risk
   - 🟡 **Medium Risk**: Somewhat risky but common behaviors
   - 🟢 **Safe Practice**: Secure and recommended behaviors

3. **Watch the colors**: 
   - ✅ Green = Correct placement
   - ❌ Red = Wrong category

4. **Complete all categories** to unlock the next lesson!

💡 **Pro Tip**: Public WiFi is like a crowded street - you need to be extra careful about what you're carrying!`,

    exercise: {
      type: 'mcq-categorization',
      title: 'Categorize WiFi Security Practices',
      instruction: 'Click categories to see options, then select the correct security level.',
      items: [
        { 
          id: 'high-1', 
          text: 'Connecting to any free WiFi network', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'high-2', 
          text: 'Online banking on public WiFi', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'medium-1', 
          text: 'Checking email on public WiFi', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'medium-2', 
          text: 'Not using a VPN on public networks', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'safe-1', 
          text: 'Using a VPN on public WiFi', 
          type: 'Safe Practice',
          visual: '🟢'
        },
        { 
          id: 'safe-2', 
          text: 'Verifying network names with staff', 
          type: 'Safe Practice',
          visual: '🟢'
        },
        { 
          id: 'safe-3', 
          text: 'Disabling auto-connect to WiFi', 
          type: 'Safe Practice',
          visual: '🟢'
        }
      ],
      categories: ['High Risk', 'Medium Risk', 'Safe Practice']
    }
  },
  'lesson-2': {
    id: 'lesson-2',
    title: 'Mission 1 – Network Verification',
    story: `You're at a busy airport and see multiple WiFi networks available. Some look official, others seem suspicious. You need to connect to the internet, but you also need to stay safe from fake networks and cyber attacks.

Your WiFi security mentor appears: "Fake networks are like digital traps - they look legitimate but are designed to steal your information. Always verify before you connect."`,
    
    concept: `🔍 **Network Verification Strategies:**

🏢 **Official Network Identification:**
- Look for official business names and branding
- Check with staff for the correct network name
- Avoid networks with generic names like "Free WiFi"
- Be suspicious of networks with slight misspellings

📱 **Network Security Indicators:**
- Official networks often require passwords
- Free networks without passwords are more risky
- Look for networks with security certificates
- Avoid networks that ask for personal information

🚨 **Red Flags to Watch For:**
- Networks with names very similar to official ones
- Networks that appear and disappear suddenly
- Networks that ask for credit card information
- Networks that redirect you to suspicious websites

✅ **Safe Connection Steps:**
- Ask staff for the official network name
- Verify the network requires a password
- Use a VPN when connecting to public networks
- Avoid accessing sensitive accounts on public WiFi`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Examine each WiFi network carefully**
2. **Look for security indicators**: official branding, password requirements, staff verification
3. **Identify which networks are safe to connect to**
4. **Select the safest network option**

💡 **Pro Tip**: When in doubt about a network, ask staff or use your mobile data instead!`,

    exercise: {
      type: 'scenario',
      title: 'Choose the Safest WiFi Network',
      instruction: 'For each scenario, select the safest WiFi network to connect to.',
      scenarios: [
        {
          id: 'scenario-1',
          question: 'You\'re at a coffee shop and see these networks: "CoffeeShop_WiFi", "Free_WiFi_123", "CoffeeShop_Guest". Which should you choose?',
          options: [
            { id: 'option-1a', text: 'CoffeeShop_WiFi (no password required)', isCorrect: false },
            { id: 'option-1b', text: 'Free_WiFi_123 (generic name)', isCorrect: false },
            { id: 'option-1c', text: 'CoffeeShop_Guest (ask staff for password)', isCorrect: true }
          ]
        },
        {
          id: 'scenario-2',
          question: 'At the airport, you see "Airport_Free_WiFi" and "Airport_Secure". What should you do?',
          options: [
            { id: 'option-2a', text: 'Connect to Airport_Free_WiFi immediately', isCorrect: false },
            { id: 'option-2b', text: 'Ask airport staff about Airport_Secure', isCorrect: true },
            { id: 'option-2c', text: 'Connect to both networks for better coverage', isCorrect: false }
          ]
        },
        {
          id: 'scenario-3',
          question: 'A network called "Hotel_Guest" appears without a password. What\'s your best action?',
          options: [
            { id: 'option-3a', text: 'Connect immediately since it\'s free', isCorrect: false },
            { id: 'option-3b', text: 'Ask hotel staff to confirm the network', isCorrect: true },
            { id: 'option-3c', text: 'Use your mobile data instead', isCorrect: false }
          ]
        }
      ]
    }
  },
  'lesson-3': {
    id: 'lesson-3',
    title: 'Mission 2 – VPN Protection',
    story: `You've learned to identify safe networks, but even legitimate public WiFi can be dangerous. You need to understand how Virtual Private Networks (VPNs) create a secure tunnel for your data, protecting you from hackers and snoopers.

Your WiFi security mentor appears: "A VPN is like having a private, encrypted tunnel through the public internet. It keeps your data safe even when the network around you isn't."`,
    
    concept: `🔒 **VPN Protection Explained:**

🌐 **What is a VPN?**
- Virtual Private Network creates an encrypted connection
- Routes your internet traffic through secure servers
- Hides your IP address and location
- Protects your data from network snoopers

🛡️ **How VPNs Protect You:**
- **Encryption**: Scrambles your data so hackers can't read it
- **Tunneling**: Creates a private path through public networks
- **IP Masking**: Hides your real location and identity
- **Traffic Protection**: Prevents man-in-the-middle attacks

📱 **When to Use VPNs:**
- Connecting to any public WiFi network
- Accessing sensitive accounts or data
- Browsing from restricted locations
- Protecting privacy from network administrators
- Securing business communications

💻 **VPN Best Practices:**
- Choose reputable VPN providers
- Enable VPN before connecting to public networks
- Keep VPN software updated
- Use VPN on all your devices
- Don't disable VPN while on public networks`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each VPN scenario carefully**
2. **Identify when VPN protection is needed**
3. **Choose the correct VPN setup for each situation**
4. **Consider both security and convenience**

💡 **Pro Tip**: Always enable your VPN before connecting to public WiFi - it\'s your digital security blanket!`,

    exercise: {
      type: 'scenario',
      title: 'VPN Setup and Usage',
      instruction: 'For each scenario, select the best VPN practice.',
      scenarios: [
        {
          id: 'scenario-1',
          question: 'You\'re about to connect to airport WiFi. When should you enable your VPN?',
          options: [
            { id: 'option-1a', text: 'After connecting to the network', isCorrect: false },
            { id: 'option-1b', text: 'Before connecting to the network', isCorrect: true },
            { id: 'option-1c', text: 'Only when accessing banking websites', isCorrect: false }
          ]
        },
        {
          id: 'scenario-2',
          question: 'Your VPN connection is slow. What should you do?',
          options: [
            { id: 'option-2a', text: 'Disable VPN to browse faster', isCorrect: false },
            { id: 'option-2b', text: 'Switch to a different VPN server', isCorrect: true },
            { id: 'option-2c', text: 'Use the network without VPN protection', isCorrect: false }
          ]
        },
        {
          id: 'scenario-3',
          question: 'You\'re using hotel WiFi with VPN. What\'s safe to do?',
          options: [
            { id: 'option-3a', text: 'Online banking and shopping', isCorrect: true },
            { id: 'option-3b', text: 'Entering passwords without VPN', isCorrect: false },
            { id: 'option-3c', text: 'Sharing sensitive documents', isCorrect: false }
          ]
        }
      ]
    }
  },
  'lesson-4': {
    id: 'lesson-4',
    title: 'Mission 3 – Safe Browsing on Public WiFi',
    story: `You have your VPN enabled and you're connected to a verified network. But you still need to be careful about what you do online. Some activities are safe, others can put you at risk even with VPN protection.

Your WiFi security mentor appears: "VPNs provide excellent protection, but they're not a license to be careless. Smart browsing habits are still essential for staying safe on public networks."`,
    
    concept: `🌐 **Safe Browsing Guidelines:**

🔐 **High-Risk Activities (Avoid):**
- Online banking and financial transactions
- Entering credit card information
- Accessing medical or legal records
- Logging into work or business accounts
- Sharing sensitive personal information

⚠️ **Medium-Risk Activities (Use Caution):**
- Checking personal email
- Social media browsing
- Reading news and articles
- Online shopping (without payment)
- Streaming entertainment content

✅ **Safe Activities (Generally OK):**
- Reading public websites
- Checking weather and maps
- Browsing social media feeds
- Watching public videos
- General web surfing

🛡️ **Additional Safety Measures:**
- Use HTTPS websites whenever possible
- Don't save passwords or login information
- Clear browser cache and cookies after use
- Log out of all accounts when finished
- Be aware of your surroundings`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each browsing scenario carefully**
2. **Identify the security risk level** of each activity
3. **Choose the safest browsing option** for each situation
4. **Consider both VPN protection and activity sensitivity**

💡 **Pro Tip**: Even with VPN, think twice before doing anything that involves sensitive information on public WiFi!`,

    exercise: {
      type: 'mcq-categorization',
      title: 'Categorize Browsing Activities',
      instruction: 'Click categories to see options, then select the correct risk level.',
      items: [
        { 
          id: 'high-1', 
          text: 'Online banking and bill payment', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'high-2', 
          text: 'Entering credit card details', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'medium-1', 
          text: 'Checking personal email', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'medium-2', 
          text: 'Online shopping (browsing only)', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'safe-1', 
          text: 'Reading news articles', 
          type: 'Safe Activity',
          visual: '🟢'
        },
        { 
          id: 'safe-2', 
          text: 'Checking weather forecast', 
          type: 'Safe Activity',
          visual: '🟢'
        },
        { 
          id: 'safe-3', 
          text: 'Browsing social media feeds', 
          type: 'Safe Activity',
          visual: '🟢'
        }
      ],
      categories: ['High Risk', 'Medium Risk', 'Safe Activity']
    }
  },
  'lesson-5': {
    id: 'lesson-5',
    title: 'Mission 4 – Emergency Response',
    story: `Despite all your precautions, you suspect your device might have been compromised while using public WiFi. You notice unusual activity, strange pop-ups, or unexpected behavior. You need to know how to respond quickly and effectively.

Your WiFi security mentor appears: "When you suspect a security breach, time is critical. Quick, decisive action can prevent a minor incident from becoming a major disaster."`,
    
    concept: `🚨 **Emergency Response Protocol:**

🔍 **Immediate Detection Signs:**
- Unusual pop-ups or error messages
- Slow device performance
- Unexpected network activity
- Strange emails or messages sent from your account
- Unfamiliar programs or apps

⚡ **Immediate Actions (First 5 Minutes):**
- Disconnect from the WiFi network immediately
- Disable WiFi and Bluetooth on your device
- Change passwords for critical accounts
- Contact your bank if financial accounts are involved
- Document what you were doing when issues started

🛡️ **Short-term Recovery (Next Hour):**
- Run full antivirus scan on your device
- Check for unauthorized transactions or activities
- Monitor your accounts for suspicious activity
- Update all passwords and enable 2FA
- Consider freezing credit if financial data was exposed

🔒 **Long-term Protection:**
- Monitor accounts for several weeks
- Report incidents to relevant authorities
- Learn from the experience to prevent future issues
- Consider using a dedicated device for sensitive activities
- Regularly backup important data`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each emergency scenario carefully**
2. **Identify the immediate threat** in each situation
3. **Choose the best emergency response** for each scenario
4. **Consider both immediate safety and long-term recovery**

💡 **Pro Tip**: In a security emergency, speed and decisiveness are your best allies. Don't hesitate to take action!`,

    exercise: {
      type: 'scenario',
      title: 'Respond to WiFi Security Emergencies',
      instruction: 'For each emergency scenario, select the best immediate response.',
      scenarios: [
        {
          id: 'scenario-1',
          question: 'While using public WiFi, you see a pop-up saying "Your device has been infected with 5 viruses!" What should you do first?',
          options: [
            { id: 'option-1a', text: 'Click the pop-up to remove the viruses', isCorrect: false },
            { id: 'option-1b', text: 'Disconnect from WiFi immediately', isCorrect: true },
            { id: 'option-1c', text: 'Restart your device to fix the issue', isCorrect: false }
          ]
        },
        {
          id: 'scenario-2',
          question: 'You notice your email is sending strange messages to contacts. What\'s your first step?',
          options: [
            { id: 'option-2a', text: 'Change your email password immediately', isCorrect: true },
            { id: 'option-2b', text: 'Send an apology email to all contacts', isCorrect: false },
            { id: 'option-2c', text: 'Wait to see if it stops on its own', isCorrect: false }
          ]
        },
        {
          id: 'scenario-3',
          question: 'Your bank calls about suspicious transactions. What should you do?',
          options: [
            { id: 'option-3a', text: 'Hang up and call the bank back yourself', isCorrect: true },
            { id: 'option-3b', text: 'Provide your account details to verify', isCorrect: false },
            { id: 'option-3c', text: 'Ignore the call as it might be a scam', isCorrect: false }
          ]
        }
      ]
    }
  }
};

// Lesson data for "Mobile Device Security" course
const mobileLessonsData = {
  'lesson-1': {
    id: 'lesson-1',
    title: 'Intro – The Pocket-Sized Fortress',
    story: `Your smartphone is more than just a phone - it's your digital life in your pocket. It contains your photos, messages, banking apps, social media accounts, and access to your entire digital world.

Your mission: Transform your mobile device into an impenetrable fortress, protecting it from theft, malware, and unauthorized access while maintaining the convenience you love.`,
    
    concept: `📱 **What is Mobile Device Security?**
Mobile device security involves protecting your smartphones, tablets, and other portable devices from various threats and ensuring the safety of your personal data.

🛡️ **Mobile Security Threats:**
- **Device Theft**: Physical loss or theft of your device
- **Malware**: Viruses and malicious apps
- **Data Breaches**: Unauthorized access to your information
- **Network Attacks**: Intercepting data on unsecured networks
- **App Vulnerabilities**: Security flaws in mobile applications

💀 **Why Mobile Devices are Vulnerable:**
- Small size makes them easy to lose or steal
- Users often download apps without checking security
- Many devices lack proper security features enabled
- Users may connect to unsecured networks
- One compromised app can access your entire device`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Click on each category** to reveal mobile security elements
2. **Select the correct option** for each category:
   - 🔴 **High Risk**: Dangerous mobile practices that put you at risk
   - 🟡 **Medium Risk**: Somewhat risky but common behaviors
   - 🟢 **Safe Practice**: Secure and recommended behaviors

3. **Watch the colors**: 
   - ✅ Green = Correct placement
   - ❌ Red = Wrong category

4. **Complete all categories** to unlock the next lesson!

💡 **Pro Tip**: Your mobile device is your digital wallet - protect it like your life depends on it!`,

    exercise: {
      type: 'mcq-categorization',
      title: 'Categorize Mobile Security Practices',
      instruction: 'Click categories to see options, then select the correct security level.',
      items: [
        { 
          id: 'high-1', 
          text: 'Downloading apps from unknown sources', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'high-2', 
          text: 'Not using a screen lock or PIN', 
          type: 'High Risk',
          visual: '🔴'
        },
        { 
          id: 'medium-1', 
          text: 'Using public WiFi without VPN', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'medium-2', 
          text: 'Not updating apps regularly', 
          type: 'Medium Risk',
          visual: '🟡'
        },
        { 
          id: 'safe-1', 
          text: 'Enabling biometric authentication', 
          type: 'Safe Practice',
          visual: '🟢'
        },
        { 
          id: 'safe-2', 
          text: 'Using app store security features', 
          type: 'Safe Practice',
          visual: '🟢'
        },
        { 
          id: 'safe-3', 
          text: 'Regularly backing up your data', 
          type: 'Safe Practice',
          visual: '🟢'
        }
      ],
      categories: ['High Risk', 'Medium Risk', 'Safe Practice']
    }
  },
  'lesson-2': {
    id: 'lesson-2',
    title: 'Mission 1 – Privacy Settings Mastery',
    story: `You've just created your first social media account. The platform asks for your permission to access your contacts, location, and camera. You're excited to start sharing, but something tells you to be careful about what you're giving away.

Your privacy mentor appears: "Every permission you grant is like opening a door to your digital life. Some doors are necessary, others are optional, and some should stay locked forever."`,
    
    concept: `🔒 **Privacy Settings - Your Digital Doors:**

🚪 **Location Services:**
- Only enable when absolutely necessary
- Disable for apps that don't need location
- Be aware of background location tracking

📱 **Camera & Microphone:**
- Grant only when actively using features
- Revoke access when not needed
- Check which apps have background access

👥 **Contact Access:**
- Be cautious about sharing your contact list
- Some apps use contacts for targeted advertising
- Consider using fake contacts for testing

📊 **Data Sharing:**
- Review what data is shared with third parties
- Opt out of unnecessary data collection
- Understand how your data is used for advertising`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Examine each privacy setting option** carefully
2. **Look for signs of security**: necessary permissions, minimal data sharing, user control
3. **Identify which settings are safe and which are risky**
4. **Select the privacy setting that offers the best protection**

💡 **Pro Tip**: When in doubt, choose the option that gives you the most control and shares the least data!`,

    exercise: {
      type: 'qr-validation',
      title: 'Choose the Safest Privacy Setting',
      instruction: 'Examine the privacy settings below and select the one that offers the best protection.',
      options: [
        {
          id: 'setting-1',
          image: '🔒🔒🔒🔒🔒\n🔒📱🔒📱🔒\n🔒🔒🔒🔒🔒\n🔒📱🔒📱🔒\n🔒🔒🔒🔒🔒',
          text: 'Location: Only while using app, Contacts: Never, Camera: Only when needed',
          isCorrect: true
        },
        {
          id: 'setting-2',
          image: '🟥🟥🟥🟥🟥\n🟥📱🟥📱🟥\n🟥🟥🟥🟥🟥\n🟥📱🟥📱🟥\n🟥🟥🟥🟥🟥',
          text: 'Location: Always, Contacts: Always, Camera: Always',
          isCorrect: false,
          explanation: 'Giving apps unlimited access to all permissions is very risky'
        },
        {
          id: 'setting-3',
          image: '🟡🟡🟡🟡🟡\n🟡📱🟡📱🟡\n🟡🟡🟡🟡🟡\n🟡📱🟡📱🟡\n🟡🟡🟡🟡🟡',
          text: 'Location: While using app, Contacts: Sometimes, Camera: Sometimes',
          isCorrect: false,
          explanation: 'Vague permissions like "sometimes" can be exploited'
        }
      ]
    }
  },
  'lesson-3': {
    id: 'lesson-3',
    title: 'Mission 2 – Spot the Oversharers',
    story: `You're scrolling through your social media feed when you notice some friends are sharing very personal information. One posts their exact location, another shares their salary, and someone else posts their child's school details.

Your social media safety coach warns: "Oversharing is like leaving your diary open in a crowded room. You never know who might be reading."`,
    
    concept: `🚨 **Oversharing Red Flags:**

📍 **Location Oversharing:**
- Posting exact addresses or coordinates
- Checking in at home or work locations
- Sharing vacation plans before leaving
- Revealing daily routines and schedules

💰 **Financial Oversharing:**
- Sharing salary or income details
- Posting expensive purchases
- Revealing bank account information
- Discussing financial problems publicly

👨‍👩‍👧‍👦 **Personal Information:**
- Children's names, schools, or schedules
- Medical information or health details
- Relationship problems or conflicts
- Work-related confidential information

💀 **Why It's Dangerous:**
- Enables stalking and harassment
- Increases risk of identity theft
- Can lead to targeted scams
- Damages professional reputation`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each social media post carefully**
2. **Look for oversharing indicators**: personal details, locations, financial info, private matters
3. **Identify which posts contain dangerous oversharing**
4. **Select all the risky posts you can find**

💡 **Pro Tip**: If you wouldn't share it with a stranger on the street, don't share it online!`,

    exercise: {
      type: 'phishing-detection',
      title: 'Identify Oversharing Posts',
      instruction: 'Identify which of these social media posts contain dangerous oversharing. Select all that apply.',
      messages: [
        {
          id: 'post-1',
          text: 'Just got my new iPhone 15 Pro! So excited! #newphone #excited',
          isPhishing: false,
          explanation: 'Sharing a new purchase is generally safe, though it could attract thieves'
        },
        {
          id: 'post-2',
          text: 'Home alone tonight at 123 Main Street. Anyone want to hang out?',
          isPhishing: true,
          explanation: 'Sharing exact address and being home alone is extremely dangerous'
        },
        {
          id: 'post-3',
          text: 'My son Tommy starts kindergarten at Lincoln Elementary tomorrow!',
          isPhishing: true,
          explanation: 'Sharing child\'s name and school location is risky for child safety'
        },
        {
          id: 'post-4',
          text: 'Finally got that promotion! New salary: $75,000/year!',
          isPhishing: true,
          explanation: 'Sharing exact salary information can make you a target for scams'
        },
        {
          id: 'post-5',
          text: 'Beautiful sunset at the beach today! #nature #peaceful',
          isPhishing: false,
          explanation: 'Sharing general location like "beach" is usually safe'
        }
      ]
    }
  },
  'lesson-4': {
    id: 'lesson-4',
    title: 'Mission 3 – Friend or Foe?',
    story: `Your social media notifications are blowing up with friend requests. Some are from people you know, others from mutual friends, and some from complete strangers with attractive profile pictures.

Your social media guardian angel whispers: "Not every friend request is friendly. Some are data collectors, some are scammers, and some might be dangerous predators."`,
    
    concept: `👥 **Friend Request Safety:**

✅ **Safe to Accept:**
- People you know personally
- Mutual friends with many connections
- Professional contacts in your field
- Verified accounts of public figures

⚠️ **Be Cautious About:**
- Strangers with few mutual friends
- Accounts with very attractive profile pictures
- People claiming to know you but you don't recognize
- Accounts with suspicious usernames or content

❌ **Never Accept:**
- Accounts with no profile picture
- Users with very few posts or friends
- Accounts that immediately message you
- Profiles that seem too good to be true

🔍 **Red Flags to Watch For:**
- Generic or copied profile information
- Recent account creation dates
- Inconsistent posting patterns
- Aggressive messaging after accepting`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each friend request scenario carefully**
2. **Determine if you should Accept, Decline, or Investigate further**
3. **Select the correct action for each situation**
4. **Learn how different methods work**

💡 **Pro Tip**: Understanding these techniques will help you create your own strong, memorable passwords!`,

    exercise: {
      type: 'pay-or-request',
      title: 'Friend Request Decisions',
      instruction: 'For each friend request scenario, select whether you should Accept or Decline.',
      scenarios: [
        {
          id: 'scenario-1',
          text: 'Friend request from your high school best friend with 500+ mutual friends',
          correctAnswer: 'pay',
          explanation: 'This is clearly a legitimate request from someone you know well'
        },
        {
          id: 'scenario-2',
          text: 'Friend request from "Sarah Johnson" with no mutual friends and a suspicious profile',
          correctAnswer: 'request',
          explanation: 'No mutual friends and suspicious profile = likely fake account'
        },
        {
          id: 'scenario-3',
          text: 'Friend request from a colleague at work with 50+ mutual professional connections',
          correctAnswer: 'pay',
          explanation: 'Professional connection with mutual colleagues is safe to accept'
        },
        {
          id: 'scenario-4',
          text: 'Friend request from "Mike" claiming to be your cousin but you don\'t recognize the name',
          correctAnswer: 'request',
          explanation: 'Claiming to be family but no recognition = potential scam'
        },
        {
          id: 'scenario-5',
          text: 'Friend request from your neighbor with 20+ mutual local friends',
          correctAnswer: 'pay',
          explanation: 'Local connection with mutual friends is legitimate'
        }
      ]
    }
  },
  'lesson-5': {
    id: 'lesson-5',
    title: 'Mission 4 – The Final Boss (Digital Reputation)',
    story: `You're about to graduate and start applying for jobs. Your dream company asks for your social media profiles during the interview process. You panic - you've been posting everything online for years!

Your career counselor explains: "Your digital footprint is like a permanent tattoo. It can open doors or slam them shut. The internet never forgets."`,
    
    concept: `🎭 **Digital Reputation Management:**

📱 **What Employers Look For:**
- Professional behavior and communication
- Appropriate content and language
- Political and social views
- Hobbies and interests
- Professional achievements

🚨 **Red Flags for Employers:**
- Inappropriate or offensive content
- Excessive partying or unprofessional behavior
- Complaints about previous employers
- Political extremism or controversial views
- Evidence of illegal activities

🛡️ **Protection Strategies:**
- Review and clean up old posts
- Use privacy settings effectively
- Think before posting anything
- Separate personal and professional accounts
- Google yourself regularly

💡 **Pro Tip**: If you wouldn't want your grandmother or future boss to see it, don't post it!`,

    howToSolve: `🎯 **How to Complete This Exercise:**

1. **Read each social media scenario carefully**
2. **Look for reputation risks**: inappropriate content, oversharing, unprofessional behavior
3. **Identify which scenarios could damage your digital reputation**
4. **Select all the risky scenarios you can spot**

💡 **Pro Tip**: Your online reputation is your digital business card. Protect it like your most valuable asset!`,

    exercise: {
      type: 'phishing-detection',
      title: 'Spot Reputation Risks',
      instruction: 'Identify which of these social media behaviors could damage your digital reputation. Select all that apply.',
      messages: [
        {
          id: 'behavior-1',
          text: 'Posting a photo of yourself at a professional networking event',
          isPhishing: false,
          explanation: 'Professional networking photos enhance your reputation'
        },
        {
          id: 'behavior-2',
          text: 'Complaining about your boss and company on social media',
          isPhishing: true,
          explanation: 'Public complaints about employers are unprofessional and risky'
        },
        {
          id: 'behavior-3',
          text: 'Sharing your graduation certificate and achievements',
          isPhishing: false,
          explanation: 'Sharing achievements and milestones is positive'
        },
        {
          id: 'behavior-4',
          text: 'Posting inappropriate memes that could offend others',
          isPhishing: true,
          explanation: 'Offensive content can damage relationships and reputation'
        },
        {
          id: 'behavior-5',
          text: 'Sharing volunteer work and community service',
          isPhishing: false,
          explanation: 'Community service shows positive character and values'
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
  const [, setLocation] = useLocation();
  const { profile } = useAuth();
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
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
  const course = useMemo(() => {
    if (courseId === 'password-security-course') {
      return mockPasswordCourse;
    } else if (courseId === 'social-media-safety-course') {
      return mockSocialMediaCourse;
    } else if (courseId === 'email-security-course') {
      return mockEmailCourse;
    } else if (courseId === 'public-wifi-security-course') {
      return mockWifiCourse;
    } else if (courseId === 'mobile-device-security-course') {
      return mockMobileCourse;
    }
    return mockCourse;
  }, [courseId]);
  
  const currentLesson = useMemo(() => {
    if (courseId === 'password-security-course') {
      return passwordLessonsData[lessonId as keyof typeof passwordLessonsData] as Lesson;
    } else if (courseId === 'social-media-safety-course') {
      return socialMediaLessonsData[lessonId as keyof typeof socialMediaLessonsData] as Lesson;
    } else if (courseId === 'email-security-course') {
      return emailLessonsData[lessonId as keyof typeof emailLessonsData] as Lesson;
    } else if (courseId === 'public-wifi-security-course') {
      return wifiLessonsData[lessonId as keyof typeof wifiLessonsData] as Lesson;
    } else if (courseId === 'mobile-device-security-course') {
      return mobileLessonsData[lessonId as keyof typeof mobileLessonsData] as Lesson;
    }
    return lessonsData[lessonId as keyof typeof lessonsData] as Lesson;
  }, [courseId, lessonId]);

  // Reset completion state when lesson changes
  useEffect(() => {
    setIsCompleted(false);
    setSelectedOption(null);
    setSelectedMessages([]);
    setScenarioAnswers({});
    setSplitAmount('');
    setSplitError('');
    setFraudAnswer(null);
    
    // Initialize selectedItems based on current lesson categories
    if (currentLesson?.exercise?.type === 'mcq-categorization' && currentLesson.exercise.categories) {
      const initialSelectedItems: Record<string, string[]> = {};
      currentLesson.exercise.categories.forEach(category => {
        initialSelectedItems[category] = [];
      });
      setSelectedItems(initialSelectedItems);
    }
  }, [lessonId, currentLesson]);

  // Check if all items are correctly placed (for lesson 1)
  useEffect(() => {
    if (currentLesson.exercise.type === 'mcq-categorization') {
      const allItems = currentLesson.exercise.items || [];
      const allAssigned = Object.values(selectedItems).flat();
      
      console.log('🔍 MCQ Completion Check:', {
        totalItems: allItems.length,
        assignedItems: allAssigned.length,
        selectedItems,
        isCompleted
      });
      
      if (allAssigned.length === allItems.length) {
        const allCorrect = Object.entries(selectedItems).every(([category, itemIds]) => {
          const categoryCorrect = itemIds.every(itemId => {
            const item = allItems.find(i => i.id === itemId);
            const isCorrect = item?.type === category;
            console.log(`  Item ${itemId} in category ${category}: ${isCorrect ? '✅' : '❌'} (expected: ${item?.type})`);
            return isCorrect;
          });
          console.log(`Category ${category}: ${categoryCorrect ? '✅' : '❌'}`);
          return categoryCorrect;
        });
        
        console.log('🎯 All items assigned:', allAssigned.length, '/', allItems.length, '| All correct:', allCorrect);
        
        if (allCorrect && !isCompleted) {
          console.log('🎉 TRIGGERING COMPLETION!');
          setIsCompleted(true);
          setShowSuccess(true);
          awardLessonXP();
          setTimeout(() => setShowSuccess(false), 3000);
        }
      }
    }
  }, [selectedItems, currentLesson, isCompleted]);

  // Track XP when lesson is completed (Frontend only)
  const awardLessonXP = async () => {
    if (!profile?.username) {
      console.error('Profile not available for XP award');
      return;
    }
    
    try {
      // Update XP directly in localStorage
      const xpGained = course.xpPerLesson || 0;
      const newXP = (profile.xp || 0) + xpGained;
      const newLevel = Math.floor(newXP / 500) + 1; // 500 XP per level
      
      // Calculate new rank based on XP
      let newRank = profile.rank;
      if (newXP >= 2000) newRank = "Diamond";
      else if (newXP >= 1500) newRank = "Platinum";
      else if (newXP >= 1000) newRank = "Gold";
      else if (newXP >= 500) newRank = "Silver";
      else newRank = "Bronze";
      
      const updatedProfile = { 
        ...profile, 
        xp: newXP,
        level: newLevel,
        rank: newRank
      };
      
      // Save to localStorage
      localStorage.setItem('cyberRakshaProfile', JSON.stringify(updatedProfile));
      
      // Save progress for this course
      const progressKey = `course_progress_${courseId}`;
      const courseProgress = {
        courseId: courseId,
        completedLessons: lessonNumber,
        isCompleted: isLastLesson,
        lastAccessedAt: new Date().toISOString()
      };
      localStorage.setItem(progressKey, JSON.stringify(courseProgress));


      
      console.log('🎆 XP Awarded:', xpGained, '| Total XP:', newXP, '| Level:', newLevel, '| Rank:', newRank);
    } catch (error) {
      console.error('Error awarding XP:', error);
    }
  };

  // Check answers for other lesson types
  const checkAnswers = () => {
    console.log('🎯 Checking answers for lesson type:', currentLesson.exercise.type);
    
    let isCorrectAnswer = false;
    
    if (currentLesson.exercise.type === 'qr-validation') {
      const exercise = currentLesson.exercise as QRValidationExercise;
      const selected = exercise.options.find(opt => opt.id === selectedOption);
      console.log('📍 QR Validation - Selected:', selectedOption, 'Is Correct:', selected?.isCorrect);
      isCorrectAnswer = !!(selected && selected.isCorrect);
    } else if (currentLesson.exercise.type === 'phishing-detection') {
      const exercise = currentLesson.exercise as PhishingDetectionExercise;
      const allPhishing = exercise.messages
        .filter(msg => msg.isPhishing)
        .map(msg => msg.id);
      
      isCorrectAnswer = allPhishing.every(id => selectedMessages.includes(id)) &&
        selectedMessages.every(id => allPhishing.includes(id));
      
      console.log('🎣 Phishing Detection - Expected phishing IDs:', allPhishing, 'Selected:', selectedMessages, 'All Correct:', isCorrectAnswer);
    } else if (currentLesson.exercise.type === 'pay-or-request') {
      const exercise = currentLesson.exercise as PayOrRequestExercise;
      const allCorrect = exercise.scenarios.every(
        scenario => scenarioAnswers[scenario.id] === scenario.correctAnswer
      );
      
      isCorrectAnswer = allCorrect && Object.keys(scenarioAnswers).length === exercise.scenarios.length;
      
      console.log('💰 Pay or Request - Answers:', scenarioAnswers, 'All Correct:', allCorrect, 'All Answered:', Object.keys(scenarioAnswers).length === exercise.scenarios.length);
    } else if (currentLesson.exercise.type === 'split-payment') {
      const exercise = currentLesson.exercise as SplitPaymentExercise;
      const amount = parseFloat(splitAmount);
      console.log('🧮 Split Payment - Input:', splitAmount, 'Parsed:', amount, 'Expected:', exercise.correctAnswer);
      isCorrectAnswer = amount === exercise.correctAnswer;
      
      if (!isCorrectAnswer) {
        setSplitError(`Incorrect. Try again! Each person should pay ₹${exercise.correctAnswer}`);
        return;
      }
    } else if (currentLesson.exercise.type === 'fraud-simulation') {
      const exercise = currentLesson.exercise as FraudSimulationExercise;
      const selected = exercise.options.find(opt => opt.id === fraudAnswer);
      console.log('🚨 Fraud Simulation - Selected:', fraudAnswer, 'Is Correct:', selected?.isCorrect);
      isCorrectAnswer = !!(selected && selected.isCorrect);
    }
    
    // Award XP and mark as completed if answer is correct
    if (isCorrectAnswer && !isCompleted) {
      console.log('✅ Lesson completed - awarding XP!');
      setIsCompleted(true);
      setShowSuccess(true);
      awardLessonXP();
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Function to handle category click (show options)
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // Function to handle option selection within a category
  const handleOptionSelect = (item: LessonItem, category: string) => {
    console.log('🎯 Selecting item:', item.id, 'for category:', category, 'item type:', item.type);
    const newSelected = { ...selectedItems };
    
    // Remove the item from any category it might be in
    Object.keys(newSelected).forEach(cat => {
      newSelected[cat] = newSelected[cat].filter(id => id !== item.id);
    });
    
    // Add the item to the selected category
    newSelected[category] = [...(newSelected[category] || []), item.id];
    
    console.log('📝 Updated selectedItems:', newSelected);
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
                    const categoryIcon = category === 'Weak' ? '🔴' : category === 'Medium' ? '🟡' : category === 'Strong' ? '🟢' : 
                                       category === 'QR Code' ? '📱' : category === 'UPI ID' ? '🆔' : category === 'Phone Number' ? '📞' :
                                       category === 'SMS/Text' ? '📱' : category === 'Authenticator App' ? '🔐' : category === 'Security Key' ? '🗝️' : category === 'Biometric' ? '👁️' : '🔒';
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
                                  {hasItems ? `${getItemsInCategory(category).length} item(s) selected` : `Click to select ${courseId === 'password-security-course' ? 'password strength' : 'payment method'}`}
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
                 className="flex items-center space-x-2 px-6 py-3 rounded-lg font-mono transition-colors bg-cyber-accent text-cyber-dark hover:bg-cyber-neon"
               >
                 <span>Complete Course</span>
                 <CheckCircle size={20} />
               </button>
             ) : (
              <button 
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-mono transition-colors bg-cyber-accent text-cyber-dark hover:bg-cyber-neon"
                onClick={() => {
                  console.log('🚀 FORCE NAVIGATING to next lesson:', `lesson-${lessonNumber + 1}`);
                  setLocation(`/course/${courseId}/lesson-${lessonNumber + 1}`);
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
                Great job! You've mastered this {course.title.toLowerCase()} concept.
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
                Congratulations! You've mastered {course.title.toLowerCase()}.
              </p>
              <div className="flex items-center justify-center space-x-2 text-cyber-accent mb-6">
                <Zap size={20} />
                <span className="font-mono font-bold">+{(course.xpPerLesson || 0) * (course.totalLessons || 0)} XP Earned!</span>
              </div>
              <button
                onClick={() => {
                  // Update localStorage for immediate UI update
                  const progressKey = `course_progress_${courseId}`;
                  const courseProgress = {
                    courseId: courseId,
                    completedLessons: course.totalLessons,
                    isCompleted: true,
                    lastAccessedAt: new Date().toISOString()
                  };
                  localStorage.setItem(progressKey, JSON.stringify(courseProgress));

                  // Navigate back to dashboard
                  window.location.href = '/dashboard';
                }}
                className="px-6 py-3 bg-cyber-accent text-cyber-dark font-mono rounded-lg hover:bg-cyber-neon transition-colors"
              >
                Return to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}