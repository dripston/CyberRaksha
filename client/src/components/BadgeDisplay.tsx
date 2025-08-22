import { Badge } from "@shared/schema";

interface BadgeDisplayProps {
  badge?: Badge;
  badges?: any[];
}

export default function BadgeDisplay({ badge, badges }: BadgeDisplayProps) {
  // Handle single badge display
  if (badge) {
    return (
      <div className="flex items-center space-x-3" data-testid={`badge-${badge.id}`}>
        <div className={`w-10 h-10 bg-gradient-to-br from-${badge.color} to-cyber-red rounded badge-glow flex items-center justify-center`}>
          <span className="text-lg">{badge.icon}</span>
        </div>
        <div>
          <div className="text-sm font-medium text-cyber-text" data-testid={`text-badge-name-${badge.id}`}>
            {badge.name}
          </div>
          <div className="text-xs text-cyber-muted">{badge.description}</div>
        </div>
      </div>
    );
  }

  // Handle badges array display
  if (badges && badges.length > 0) {
    return (
      <div className="space-y-3">
        {badges.map((userBadge: any) => (
          <div key={userBadge.id} className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br from-${userBadge.badge?.color || 'cyber-yellow'} to-cyber-red rounded badge-glow flex items-center justify-center`}>
              <span className="text-lg">{userBadge.badge?.icon || '🏆'}</span>
            </div>
            <div>
              <div className="text-sm font-medium text-cyber-text">
                {userBadge.badge?.name || 'Badge'}
              </div>
              <div className="text-xs text-cyber-muted">{userBadge.badge?.description || 'Achievement unlocked'}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Handle empty state
  return (
    <div className="text-center text-cyber-muted text-sm py-4">
      No badges earned yet. Complete courses to earn your first badge!
    </div>
  );
}
