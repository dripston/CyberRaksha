import { User } from "@shared/schema";

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-cyber-dark border-b-2 border-cyber-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyber-yellow to-cyber-green rounded pixel-border flex items-center justify-center">
              <span className="font-pixel text-xs text-cyber-bg">CR</span>
            </div>
            <h1 className="font-pixel text-cyber-yellow text-lg">CyberRaksha</h1>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-cyber-text hover:text-cyber-green transition-colors font-medium">
              Dashboard
            </a>
            <a href="#" className="text-cyber-muted hover:text-cyber-green transition-colors font-medium">
              Courses
            </a>
            <a href="#" className="text-cyber-muted hover:text-cyber-green transition-colors font-medium">
              Badges
            </a>
            <a href="#" className="text-cyber-muted hover:text-cyber-green transition-colors font-medium">
              Leaderboard
            </a>
          </nav>
          
          {/* User Profile Quick Access */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-cyber-yellow rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-cyber-bg">{user.level || 1}</span>
              </div>
              <span className="font-pixel text-xs text-cyber-yellow">
                Lvl {user.level || 1}
              </span>
            </div>
            <a 
              href="/api/logout"
              className="w-8 h-8 bg-cyber-light rounded border border-cyber-muted hover:border-cyber-green transition-colors flex items-center justify-center"
              data-testid="button-logout"
            >
              <span className="text-xs">👤</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
