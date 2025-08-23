import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { motion } from "framer-motion";

// Define demographic types
type Demographic = "student" | "homemaker" | "senior" | "professional" | null;

// Content for each demographic
const demographicContent = {
  student: {
    title: "Cyber Safety for Students",
    tips: [
      "Be cautious about what you share on social media - future employers may see it",
      "Use strong, unique passwords for school accounts to protect your academic data",
      "Be wary of free Wi-Fi networks on campus - use a VPN when possible",
      "Watch out for phishing emails offering scholarships or financial aid",
      "Protect your devices with updated antivirus software"
    ],
    icon: "🎓"
  },
  homemaker: {
    title: "Cyber Safety for Homemakers",
    tips: [
      "Secure your home Wi-Fi network with a strong password and WPA3 encryption",
      "Be cautious of online shopping scams and verify websites before purchasing",
      "Use parental controls to protect children's online activities",
      "Be wary of smart home device security - change default passwords",
      "Watch out for identity theft when managing family finances online"
    ],
    icon: "🏠"
  },
  professional: {
    title: "Cyber Safety for Professionals",
    tips: [
      "Use multi-factor authentication for all work-related accounts and applications",
      "Be vigilant about business email compromise (BEC) scams targeting professionals",
      "Secure your remote work environment with encrypted connections and VPNs",
      "Regularly back up critical work data following the 3-2-1 backup strategy",
      "Be cautious with confidential information when working in public spaces"
    ],
    icon: "💼"
  },
  senior: {
    title: "Cyber Safety for Senior Citizens",
    tips: [
      "Be cautious of phone calls or emails claiming to be from government agencies",
      "Never share banking information with unsolicited callers or emails",
      "Be wary of medical scams offering miracle cures or discounted medications",
      "Use large text and accessibility features to better see suspicious elements",
      "Ask a trusted family member before installing new software or making payments"
    ],
    icon: "👴"
  }
};

export default function Personalization() {
  const { toast } = useToast();
  const { profile, isLoading } = useAuth();
  const [selectedDemographic, setSelectedDemographic] = useState<Demographic>(null);
  const [savedDemographic, setSavedDemographic] = useState<Demographic>(null);

  // Load saved demographic preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cyberRakshaDemographic');
      if (saved) {
        setSavedDemographic(saved as Demographic);
        setSelectedDemographic(saved as Demographic);
      }
    } catch (error) {
      console.error('Error loading demographic preference:', error);
    }
  }, []);

  // Handle demographic selection with proper event handling
  const handleDemographicSelect = (demographic: Demographic) => {
    console.log('Selecting demographic:', demographic); // Debug log
    setSelectedDemographic(demographic);
  };

  // Save demographic preference
  const saveDemographic = () => {
    if (selectedDemographic) {
      try {
        localStorage.setItem('cyberRakshaDemographic', selectedDemographic);
        setSavedDemographic(selectedDemographic);
        toast({
          title: "Preferences Saved",
          description: "Your personalized content is now available!",
          variant: "default",
        });
      } catch (error) {
        console.error('Error saving demographic preference:', error);
        toast({
          title: "Error",
          description: "Failed to save preferences. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-cyber-text font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text">
      <Header profile={profile} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-cyber-accent mb-4">
            Personalized Cyber Safety
          </h1>
          <p className="text-xl text-cyber-muted">
            Get customized cyber safety tips based on your demographic profile.
          </p>
        </motion.div>

        {/* Demographic Selection */}
        <div className="mb-12 bg-cyber-dark p-6 rounded-lg">
          <h2 className="text-2xl font-mono font-bold text-cyber-neon mb-6">
            Select Your Demographic
          </h2>
          
          {/* Horizontal Radio Button Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center p-4 bg-cyber-dark rounded-lg border border-cyber-muted">
              <input 
                type="radio" 
                id="student" 
                name="demographic" 
                value="student"
                checked={selectedDemographic === "student"}
                onChange={() => handleDemographicSelect("student")}
                className="w-6 h-6 accent-cyber-primary cursor-pointer"
              />
              <label htmlFor="student" className="ml-3 text-xl font-mono font-bold text-cyber-accent cursor-pointer flex items-center">
                <span className="mr-2">🎓</span> Student
              </label>
            </div>
            
            <div className="flex items-center p-4 bg-cyber-dark rounded-lg border border-cyber-muted">
              <input 
                type="radio" 
                id="homemaker" 
                name="demographic" 
                value="homemaker"
                checked={selectedDemographic === "homemaker"}
                onChange={() => handleDemographicSelect("homemaker")}
                className="w-6 h-6 accent-cyber-neon cursor-pointer"
              />
              <label htmlFor="homemaker" className="ml-3 text-xl font-mono font-bold text-cyber-accent cursor-pointer flex items-center">
                <span className="mr-2">🏠</span> Homemaker
              </label>
            </div>
            
            <div className="flex items-center p-4 bg-cyber-dark rounded-lg border border-cyber-muted">
              <input 
                type="radio" 
                id="professional" 
                name="demographic" 
                value="professional"
                checked={selectedDemographic === "professional"}
                onChange={() => handleDemographicSelect("professional")}
                className="w-6 h-6 accent-cyber-pink cursor-pointer"
              />
              <label htmlFor="professional" className="ml-3 text-xl font-mono font-bold text-cyber-accent cursor-pointer flex items-center">
                <span className="mr-2">💼</span> Professional
              </label>
            </div>
            
            <div className="flex items-center p-4 bg-cyber-dark rounded-lg border border-cyber-muted">
              <input 
                type="radio" 
                id="senior" 
                name="demographic" 
                value="senior"
                checked={selectedDemographic === "senior"}
                onChange={() => handleDemographicSelect("senior")}
                className="w-6 h-6 accent-cyber-orange cursor-pointer"
              />
              <label htmlFor="senior" className="ml-3 text-xl font-mono font-bold text-cyber-accent cursor-pointer flex items-center">
                <span className="mr-2">👴</span> Senior Citizen
              </label>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={saveDemographic}
              disabled={!selectedDemographic}
              className={`px-6 py-3 font-mono rounded-lg transition-all duration-300 ${
                selectedDemographic 
                  ? "bg-gradient-to-r from-cyber-primary to-cyber-accent text-cyber-bg hover:shadow-lg hover:shadow-cyber-primary/30" 
                  : "bg-cyber-muted/30 text-cyber-muted cursor-not-allowed"
              }`}
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Personalized Content */}
        {savedDemographic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="cyber-card p-8">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">{demographicContent[savedDemographic].icon}</span>
                <h2 className="text-2xl font-mono font-bold text-cyber-secondary">
                  {demographicContent[savedDemographic].title}
                </h2>
              </div>
              
              <ul className="space-y-4">
                {demographicContent[savedDemographic].tips.map((tip, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                    className="flex items-start"
                  >
                    <span className="text-cyber-accent mr-3 mt-1">→</span>
                    <p className="text-cyber-text">{tip}</p>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-cyber-dark/50 rounded-lg border border-cyber-muted">
                <p className="text-cyber-muted text-sm">
                  <span className="text-cyber-accent">Note:</span> These tips are personalized based on your selected demographic. 
                  We regularly update our recommendations to keep you safe in the evolving cyber landscape.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}