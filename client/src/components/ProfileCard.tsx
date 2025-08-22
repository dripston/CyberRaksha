import { User } from "@shared/schema";
import BadgeDisplay from "./BadgeDisplay";

interface ProfileCardProps {
  user: User;
  userBadges: any[];
}

export default function ProfileCard({ user, userBadges }: ProfileCardProps) {
  const displayName = user.firstName || user.email?.split('@')[0] || 'Player';
  const initials = user.firstName 
    ? `${user.firstName[0]}${user.lastName?.[0] || ''}` 
    : displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <div className="cyber-card p-8 mb-8">
        <div className="text-center">
          {/* Avatar */}
          <div className="w-24 h-24 mx-auto mb-4 relative">
            {user.profileImageUrl ? (
              <img 
                src={user.profileImageUrl} 
                alt="Profile"
                className="w-full h-full rounded-lg pixel-border object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-cyber-primary to-cyber-pink rounded-lg border-2 border-cyber-accent flex items-center justify-center">
                <span className="font-mono text-lg text-cyber-bg font-bold">{initials}</span>
              </div>
            )}
            <div className="level-indicator absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="font-pixel text-xs text-cyber-bg">{user.level || 1}</span>
            </div>
          </div>
          
          <h2 className="font-mono text-xl text-cyber-secondary mb-3 font-bold" data-testid="text-username">
            {displayName}
          </h2>
          <div className="text-base text-cyber-accent mb-6 font-medium">{user.rank || 'Bronze'} Cyber Guardian</div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-cyber-bg rounded-lg p-4 border border-cyber-light">
              <div className="font-mono text-sm text-cyber-neon mb-2 font-medium">XP</div>
              <div className="text-2xl font-bold text-cyber-secondary" data-testid="text-xp">
                {user.xp || 0}
              </div>
            </div>
            <div className="bg-cyber-bg rounded-lg p-4 border border-cyber-light">
              <div className="font-mono text-sm text-cyber-accent mb-2 font-medium">Badges</div>
              <div className="text-2xl font-bold text-cyber-secondary" data-testid="text-badges">
                {userBadges.length}
              </div>
            </div>
            <div className="bg-cyber-bg rounded-lg p-4 border border-cyber-light">
              <div className="font-mono text-sm text-cyber-orange mb-2 font-medium">Streak</div>
              <div className="text-2xl font-bold text-cyber-secondary flex items-center" data-testid="text-streak">
                <span>{user.streak || 0}</span>
                <span className="text-orange-500 ml-2">🔥</span>
              </div>
            </div>
            <div className="bg-cyber-bg rounded-lg p-4 border border-cyber-light">
              <div className="font-mono text-sm text-cyber-pink mb-2 font-medium">Rank</div>
              <div className="text-lg font-bold text-cyber-secondary" data-testid="text-rank">
                {user.rank || 'Bronze'}
              </div>
            </div>
          </div>
          
          <button 
            className="modern-button w-full py-4 px-6 rounded-lg font-mono text-base"
            data-testid="button-view-profile"
          >
            View Profile
          </button>
        </div>
      </div>
      
      {/* Recent Badges */}
      <div className="cyber-card p-8">
        <h3 className="font-mono text-base text-cyber-accent mb-6 font-semibold">Recent Badges</h3>
        <div className="space-y-3">
          {userBadges.length === 0 ? (
            <div className="text-center text-cyber-muted text-sm py-4">
              No badges earned yet. Complete courses to earn your first badge!
            </div>
          ) : (
            userBadges.slice(0, 3).map((userBadge: any) => (
              <BadgeDisplay key={userBadge.id} badge={userBadge.badge} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
