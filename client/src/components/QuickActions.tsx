export default function QuickActions() {
  const actions = [
    { icon: "🧠", label: "Take Quiz", action: "takeQuiz", color: "cyber-green" },
    { icon: "📚", label: "Browse Library", action: "browseLibrary", color: "cyber-blue" },
    { icon: "⚡", label: "Daily Challenge", action: "dailyChallenge", color: "cyber-yellow" },
    { icon: "🎖️", label: "Certificates", action: "viewCertificates", color: "cyber-red" },
  ];

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    // TODO: Implement actual actions
  };

  return (
    <div className="retro-card rounded-lg p-6">
      <h3 className="font-pixel text-sm text-cyber-yellow mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.action}
            onClick={() => handleAction(action.action)}
            className={`bg-cyber-light hover:bg-cyber-dark border border-cyber-muted hover:border-${action.color} rounded-lg p-4 text-center transition-all group`}
            data-testid={`button-${action.action}`}
          >
            <div className="text-2xl mb-2 group-hover:animate-bounce">{action.icon}</div>
            <div className="font-pixel text-xs text-cyber-text">{action.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
