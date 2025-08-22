import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text flex flex-col">
      {/* Header */}
      <header className="bg-cyber-dark border-b border-cyber-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-cyber-primary rounded-xl flex items-center justify-center">
                <span className="font-mono text-xs text-cyber-bg font-bold">CR</span>
              </div>
              <h1 className="font-mono text-cyber-primary text-xl font-bold">CyberRaksha</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyber-blue to-cyber-green rounded-lg pixel-border flex items-center justify-center">
                <span className="text-4xl">🎮</span>
              </div>
              <h1 className="font-mono text-5xl md:text-7xl text-cyber-secondary mb-8 font-bold">
                CyberRaksha
              </h1>
              <h2 className="font-mono text-2xl md:text-3xl text-cyber-primary mb-8 font-semibold">
                Gamified Cyber Safety Learning
              </h2>
              <p className="text-lg text-cyber-muted mb-8 max-w-2xl mx-auto font-inter">
                Master cyber safety through gamified learning. Earn XP, unlock badges, 
                and become a cyber security expert with interactive courses on UPI safety, 
                phishing detection, and social media security.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <a
                href="/api/login"
                className="modern-button inline-block px-10 py-4 text-lg font-mono rounded-xl font-semibold"
                data-testid="button-login"
              >
                Start Your Journey
              </a>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="retro-card rounded-lg p-6"
              >
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="font-pixel text-cyber-yellow text-sm mb-2">Earn Badges</h3>
                <p className="text-cyber-muted text-sm">
                  Unlock achievements as you complete courses and quizzes
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="retro-card rounded-lg p-6"
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-pixel text-cyber-yellow text-sm mb-2">Level Up</h3>
                <p className="text-cyber-muted text-sm">
                  Gain XP and advance through levels as you learn
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="retro-card rounded-lg p-6"
              >
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-pixel text-cyber-yellow text-sm mb-2">Stay Safe</h3>
                <p className="text-cyber-muted text-sm">
                  Learn essential cyber safety skills for the digital age
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cyber-dark border-t border-cyber-light py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-pixel text-cyber-yellow text-sm mb-2">CyberRaksha</div>
            <p className="text-cyber-muted text-xs">Building a safer digital future, one lesson at a time.</p>
            <div className="mt-4 text-xs text-cyber-muted">
              Made with ❤️ for cyber safety education in India
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
