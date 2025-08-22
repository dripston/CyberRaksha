import { Profile } from "@/hooks/useAuth";
import BadgeDisplay from "./BadgeDisplay";

interface ProfileCardProps {
  profile: Profile;
  userBadges: any[];
}

export default function ProfileCard({ profile, userBadges }: ProfileCardProps) {
  // Get avatar emoji based on avatar ID
  const getAvatarEmoji = (avatarId: string) => {
    const avatarMap: Record<string, string> = {
      "avatar1": "🛡️",
      "avatar2": "🔒", 
      "avatar3": "🚀",
      "avatar4": "💻",
      "avatar5": "🔐",
      "avatar6": "💡"
    };
    return avatarMap[avatarId] || "👤";
  };

  return (
    <>
      <div className="cyber-card p-8 mb-8">
        <div className="text-center">
          {/* Avatar */}
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="w-full h-full bg-gradient-to-br from-cyber-primary to-cyber-pink rounded-lg border-2 border-cyber-accent flex items-center justify-center">
              <span className="text-4xl">{getAvatarEmoji(profile.avatar)}</span>
            </div>
            <div className="level-indicator absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="font-mono text-xs text-cyber-bg">{profile.level}</span>
            </div>
          </div>
          
          <h2 className="font-mono text-xl text-cyber-secondary mb-3 font-bold" data-testid="text-username">
            {profile.username}
          </h2>
          <div className="text-base text-cyber-accent mb-2 font-medium">{profile.profession}</div>
          <div className="text-base text-cyber-accent mb-6 font-medium">{profile.rank} Cyber Guardian</div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-cyber-bg rounded-lg p-4 border border-cyber-light">
              <div className="font-mono text-sm text-cyber-neon mb-2 font-medium">XP</div>
              <div className="text-2xl font-bold text-cyber-secondary" data-testid="text-xp">
                {profile.xp}
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
                <span>{profile.streak}</span>
                <span className="text-orange-500 ml-2">🔥</span>
              </div>
            </div>
            <div className="bg-cyber-bg rounded-lg p-4 border border-cyber-light">
              <div className="font-mono text-sm text-cyber-pink mb-2 font-medium">Rank</div>
              <div className="text-lg font-bold text-cyber-secondary" data-testid="text-rank">
                {profile.rank}
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
