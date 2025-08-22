import { Badge } from "@shared/schema";

interface BadgeDisplayProps {
  badge: Badge;
}

export default function BadgeDisplay({ badge }: BadgeDisplayProps) {
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
