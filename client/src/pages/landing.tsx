import { useState } from "react";
import { motion } from "framer-motion";
import AuthModal from "@/components/AuthModal";

export default function Landing() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-bg via-slate-900 to-cyber-dark text-cyber-text relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyber-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyber-neon/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-primary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-cyber-dark/80 backdrop-blur-xl border-b border-cyber-accent/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyber-accent via-cyber-neon to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-cyber-accent/25">
                <span className="font-mono text-sm text-cyber-bg font-bold">CR</span>
              </div>
              <h1 className="font-mono text-cyber-secondary text-2xl font-bold tracking-tight">CyberRaksha</h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyber-accent to-cyber-neon text-cyber-bg font-mono font-semibold rounded-xl hover:shadow-lg hover:shadow-cyber-accent/25 transition-all duration-300 hover:scale-105"
                data-testid="button-header-login"
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              {/* Floating Icon with Glow Effect */}
              <div className="relative inline-block mb-8">
                <motion.div 
                  className="w-40 h-40 mx-auto bg-gradient-to-br from-cyber-accent via-cyber-neon to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyber-accent/30"
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <span className="text-6xl">🛡️</span>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-accent/20 to-cyber-neon/20 rounded-3xl blur-xl animate-pulse"></div>
              </div>

              {/* Main Headline */}
              <motion.h1 
                className="font-mono text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-cyber-secondary via-white to-cyber-accent mb-6 font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                CyberRaksha
              </motion.h1>

              {/* Subtitle */}
              <motion.h2 
                className="font-mono text-3xl md:text-4xl text-cyber-accent mb-8 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Level Up Your Cyber Defense
              </motion.h2>

              {/* Description */}
              <motion.p 
                className="text-xl md:text-2xl text-cyber-muted mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                🎮 <span className="text-cyber-neon font-semibold">Gamified learning</span> meets cutting-edge cybersecurity. 
                Earn XP, unlock achievements, and master digital safety through 
                <span className="text-cyber-accent font-semibold"> interactive missions</span> designed for the modern threat landscape.
              </motion.p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-20"
            >
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="group relative inline-flex items-center px-12 py-6 text-xl font-mono font-bold text-cyber-bg bg-gradient-to-r from-cyber-accent via-cyber-neon to-cyan-400 rounded-2xl shadow-2xl shadow-cyber-accent/30 hover:shadow-cyber-neon/40 transition-all duration-500 hover:scale-110 transform"
                data-testid="button-login"
              >
                <span className="relative z-10">Start Your Mission</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-neon via-cyan-400 to-cyber-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div
                  className="ml-3 text-2xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚀
                </motion.div>
              </button>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="group cyber-card p-8 hover:bg-cyber-dark/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyber-neon/20"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
                <h3 className="font-mono text-cyber-neon text-xl mb-4 font-bold">Achievement System</h3>
                <p className="text-cyber-muted text-lg leading-relaxed">
                  Unlock exclusive badges and certificates as you master cybersecurity fundamentals
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="group cyber-card p-8 hover:bg-cyber-dark/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyber-accent/20"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h3 className="font-mono text-cyber-accent text-xl mb-4 font-bold">XP & Leaderboards</h3>
                <p className="text-cyber-muted text-lg leading-relaxed">
                  Compete with peers and climb rankings while building real security skills
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="group cyber-card p-8 hover:bg-cyber-dark/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎯</div>
                <h3 className="font-mono text-cyan-400 text-xl mb-4 font-bold">Real-World Scenarios</h3>
                <p className="text-cyber-muted text-lg leading-relaxed">
                  Practice with authentic threats: UPI fraud, phishing, and social engineering
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="relative z-10 py-20 bg-cyber-dark/50 backdrop-blur-xl border-y border-cyber-accent/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-mono text-4xl md:text-5xl text-cyber-secondary mb-6 font-bold">
              Join the <span className="text-cyber-accent">Cyber Elite</span>
            </h2>
            <p className="text-xl text-cyber-muted max-w-3xl mx-auto">
              Thousands of learners are already building their cybersecurity superpowers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Learners", icon: "👥" },
              { number: "50+", label: "Security Courses", icon: "📚" },
              { number: "1M+", label: "XP Earned", icon: "⭐" },
              { number: "95%", label: "Success Rate", icon: "🎯" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center cyber-card p-6 hover:shadow-xl hover:shadow-cyber-accent/20 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="font-mono text-3xl font-bold text-cyber-accent mb-2">{stat.number}</div>
                <div className="text-cyber-muted font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-cyber-dark via-slate-900 to-cyber-dark border-t border-cyber-accent/20 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyber-accent to-cyber-neon rounded-2xl flex items-center justify-center">
                <span className="font-mono text-sm text-cyber-bg font-bold">CR</span>
              </div>
              <div className="font-mono text-cyber-secondary text-2xl font-bold">CyberRaksha</div>
            </div>
            <p className="text-cyber-muted text-lg mb-4 max-w-2xl mx-auto">
              Empowering the next generation of cybersecurity professionals through 
              gamified learning and hands-on experience.
            </p>
            <div className="flex items-center justify-center space-x-8 mb-8">
              <span className="text-cyber-accent font-mono">🇮🇳 Made in India</span>
              <span className="text-cyber-muted">•</span>
              <span className="text-cyber-neon font-mono">🔒 Security First</span>
              <span className="text-cyber-muted">•</span>
              <span className="text-cyan-400 font-mono">🎮 Learn by Playing</span>
            </div>
            <div className="text-sm text-cyber-muted/70">
              © 2025 CyberRaksha. Building a safer digital future, one mission at a time.
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode="signup"
      />
    </div>
  );
}
