import { User } from "@shared/schema";

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-cyber-dark border-b border-cyber-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyber-primary to-cyber-accent rounded-xl flex items-center justify-center">
              <span className="font-mono text-xs text-cyber-bg font-bold">CR</span>
            </div>
            <h1 className="font-mono text-cyber-accent text-xl font-bold">CyberRaksha</h1>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a href="#" className="text-cyber-secondary hover:text-cyber-accent transition-colors font-medium text-base">
              Dashboard
            </a>
            <a href="#" className="text-cyber-muted hover:text-cyber-neon transition-colors font-medium text-base">
              Courses
            </a>
            <a href="#" className="text-cyber-muted hover:text-cyber-orange transition-colors font-medium text-base">
              Badges
            </a>
            <a href="#" className="text-cyber-muted hover:text-cyber-pink transition-colors font-medium text-base">
              Leaderboard
            </a>
          </nav>
          
          {/* User Profile Quick Access */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyber-neon to-cyber-accent rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-cyber-bg">{user?.level || 1}</span>
              </div>
              <span className="font-mono text-sm text-cyber-accent font-semibold">
                Level {user?.level || 1}
              </span>
            </div>
            <a 
              href="/api/logout"
              className="w-10 h-10 bg-cyber-light rounded-lg border border-cyber-muted hover:border-cyber-primary transition-colors flex items-center justify-center"
              data-testid="button-logout"
            >
              <span className="text-sm">👤</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
