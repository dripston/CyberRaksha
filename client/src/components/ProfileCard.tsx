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
      <div className="retro-card rounded-lg p-6 mb-6">
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
              <div className="w-full h-full bg-gradient-to-br from-cyber-blue to-cyber-green rounded-lg pixel-border flex items-center justify-center">
                <span className="font-pixel text-lg text-cyber-bg">{initials}</span>
              </div>
            )}
            <div className="level-indicator absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="font-pixel text-xs text-cyber-bg">{user.level || 1}</span>
            </div>
          </div>
          
          <h2 className="font-pixel text-lg text-cyber-yellow mb-2" data-testid="text-username">
            {displayName}
          </h2>
          <div className="text-sm text-cyber-muted mb-4">{user.rank || 'Bronze'} Cyber Guardian</div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-cyber-bg rounded p-3 border border-cyber-light">
              <div className="font-pixel text-xs text-cyber-green mb-1">XP</div>
              <div className="text-xl font-bold text-cyber-text" data-testid="text-xp">
                {user.xp || 0}
              </div>
            </div>
            <div className="bg-cyber-bg rounded p-3 border border-cyber-light">
              <div className="font-pixel text-xs text-cyber-blue mb-1">Badges</div>
              <div className="text-xl font-bold text-cyber-text" data-testid="text-badges">
                {userBadges.length}
              </div>
            </div>
            <div className="bg-cyber-bg rounded p-3 border border-cyber-light">
              <div className="font-pixel text-xs text-cyber-yellow mb-1">Streak</div>
              <div className="text-xl font-bold text-cyber-text flex items-center" data-testid="text-streak">
                <span>{user.streak || 0}</span>
                <span className="text-cyber-red ml-1">🔥</span>
              </div>
            </div>
            <div className="bg-cyber-bg rounded p-3 border border-cyber-light">
              <div className="font-pixel text-xs text-cyber-red mb-1">Rank</div>
              <div className="text-sm font-bold text-cyber-text" data-testid="text-rank">
                {user.rank || 'Bronze'}
              </div>
            </div>
          </div>
          
          <button 
            className="pixel-button w-full py-3 px-4 rounded font-pixel text-xs"
            data-testid="button-view-profile"
          >
            View Profile
          </button>
        </div>
      </div>
      
      {/* Recent Badges */}
      <div className="retro-card rounded-lg p-6">
        <h3 className="font-pixel text-sm text-cyber-yellow mb-4">Recent Badges</h3>
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
