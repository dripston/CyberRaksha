import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const professions = [
  "Student",
  "Software Developer",
  "Designer",
  "Manager",
  "Teacher",
  "Healthcare Worker",
  "Finance Professional",
  "Marketing Specialist",
  "Engineer",
  "Other"
];

const avatarOptions = [
  { id: "avatar1", name: "Cyber Warrior", emoji: "🛡️" },
  { id: "avatar2", name: "Digital Guardian", emoji: "🔒" },
  { id: "avatar3", name: "Tech Explorer", emoji: "🚀" },
  { id: "avatar4", name: "Code Master", emoji: "💻" },
  { id: "avatar5", name: "Security Expert", emoji: "🔐" },
  { id: "avatar6", name: "Innovation Leader", emoji: "💡" },
];

export default function ProfileSetup() {
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, completeProfileSetup, createProfile } = useAuth();

  // Pre-fill form with Firebase user data if available
  useEffect(() => {
    if (user) {
      if (user.displayName && !username) {
        setUsername(user.displayName);
      }
    }
  }, [user, username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !profession || !selectedAvatar) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      if (user) {
        // Complete profile setup for authenticated user
        await completeProfileSetup({
          username,
          profession,
          avatar: selectedAvatar,
        });
      } else {
        // Legacy fallback for non-authenticated users
        await createProfile({
          username,
          profession,
          avatar: selectedAvatar,
        });
      }
      
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'monospace'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        animation: 'fadeIn 0.6s ease-out forwards'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
          }}>
            <span style={{ fontSize: '2rem' }}>🛡️</span>
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#667eea',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            textShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
          }}>
            Welcome to CyberRaksha
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#a0a0a0'
          }}>
            Let's set up your profile to get started
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#00ff88',
              fontWeight: 'bold'
            }}>
              Create Your Profile
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#a0a0a0',
              marginTop: '0.5rem'
            }}>
              Customize your learning experience
            </p>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Username */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{
                color: '#667eea',
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                👤 Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '1.125rem',
                  padding: '0 1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid #667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Profession */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{
                color: '#667eea',
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💼 Profession
              </label>
              <select 
                value={profession} 
                onChange={(e) => setProfession(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '1.125rem',
                  padding: '0 1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid #667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Select your profession</option>
                {professions.map((prof) => (
                  <option key={prof} value={prof} style={{ background: '#1a1a2e', color: '#ffffff' }}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>

            {/* Avatar Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{
                color: '#667eea',
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🎨 Choose Your Avatar
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem'
              }}>
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: `2px solid ${selectedAvatar === avatar.id ? '#00ff88' : 'rgba(255, 255, 255, 0.2)'}`,
                      background: selectedAvatar === avatar.id ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedAvatar !== avatar.id) {
                        e.currentTarget.style.border = '2px solid #667eea';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedAvatar !== avatar.id) {
                        e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>{avatar.emoji}</div>
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      textAlign: 'center'
                    }}>
                      {avatar.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ paddingTop: '1.5rem' }}>
              <button
                type="submit"
                disabled={isLoading || !username || !profession || !selectedAvatar}
                style={{
                  width: '100%',
                  height: '56px',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isLoading || !username || !profession || !selectedAvatar ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  ...(isLoading || !username || !profession || !selectedAvatar
                    ? {
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#666666'
                      }
                    : {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#ffffff',
                        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
                      }
                  )
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && username && profession && selectedAvatar) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && username && profession && selectedAvatar) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.3)';
                  }
                }}
              >
                {isLoading ? "Creating Profile..." : "Start Learning Journey"}
              </button>
            </div>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={() => window.location.href = "/"}
            style={{
              color: '#667eea',
              background: 'none',
              border: 'none',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00ff88'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#667eea'}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}