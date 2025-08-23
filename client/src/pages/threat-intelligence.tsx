import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

// Types for the API response
interface NewsArticle {
  article_id: string;
  title: string;
  description: string;
  pubDate: string;
  source_id: string;
  link: string;
  content: string;
}

interface NewsApiResponse {
  status: string;
  results: NewsArticle[];
  totalResults: number;
}

export default function ThreatIntelligence() {
  const [, setLocation] = useLocation();
  const [threats, setThreats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);

  // Fetch data from NewsData.io API
  useEffect(() => {
    const fetchThreats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Using a more specific query for cybersecurity threats
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_ce1a0ea08174475d8ef0b18f7e0af7e0&q=cybersecurity%20OR%20hack%20OR%20data%20breach%20OR%20ransomware%20OR%20phishing&language=en&category=technology`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: NewsApiResponse = await response.json();
        
        if (data.status === "success") {
          // Transform API data to match our threat format
          const transformedThreats = data.results.map((article, index) => {
            // Determine severity based on keywords in title/content
            let severity = "medium";
            const title = article.title.toLowerCase();
            const content = article.content?.toLowerCase() || "";
            
            if (title.includes("critical") || title.includes("emergency") || 
                title.includes("zero-day") || title.includes("massive") ||
                content.includes("millions") || content.includes("billions")) {
              severity = "critical";
            } else if (title.includes("high") || title.includes("major") || 
                      title.includes("alert") || content.includes("thousands")) {
              severity = "high";
            } else if (title.includes("low") || title.includes("minor")) {
              severity = "low";
            }
            
            // Generate relevant safety tips based on content
            let tips = "Stay vigilant and follow cybersecurity best practices. Verify information from official sources.";
            
            if (title.includes("phishing") || content.includes("phishing")) {
              tips = "Never click on suspicious links in emails. Verify sender addresses and look for grammatical errors. Use multi-factor authentication.";
            } else if (title.includes("ransomware") || content.includes("ransomware")) {
              tips = "Maintain regular backups of important data. Keep systems updated with security patches. Avoid opening suspicious attachments.";
            } else if (title.includes("data breach") || content.includes("data breach")) {
              tips = "Change passwords immediately if affected. Enable two-factor authentication. Monitor financial accounts for suspicious activity.";
            } else if (title.includes("virus") || title.includes("malware")) {
              tips = "Keep antivirus software updated. Avoid downloading software from untrusted sources. Regularly scan your systems for threats.";
            }
            
            return {
              id: article.article_id || index.toString(),
              date: new Date(article.pubDate).toLocaleDateString(),
              title: article.title,
              description: article.description || "No description available",
              severity: severity,
              tips: tips,
              source: article.source_id || "Unknown Source",
              link: article.link
            };
          });
          
          setThreats(transformedThreats);
          console.log("API response:", data);
          console.log("Transformed threats:", transformedThreats);
        } else {
          throw new Error("API returned unsuccessful status");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching threats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreats();
  }, []);

  // Filter threats based on severity
  const filteredThreats = filter === "all" 
    ? threats 
    : threats.filter(threat => threat.severity === filter);

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "low": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "high": return "bg-orange-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-bg via-slate-900 to-cyber-dark text-cyber-text">
      {/* Header */}
      <header className="bg-cyber-dark/80 backdrop-blur-xl border-b border-cyber-accent/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setLocation("/")}>
              <div className="w-12 h-12 bg-gradient-to-br from-cyber-accent via-cyber-neon to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-cyber-accent/25">
                <span className="font-mono text-sm text-cyber-bg font-bold">CR</span>
              </div>
              <h1 className="font-mono text-cyber-secondary text-2xl font-bold tracking-tight">CyberRaksha</h1>
            </div>
            
            <button
              onClick={() => setLocation("/")}
              className="px-6 py-2 border border-cyber-accent text-cyber-accent font-mono rounded-xl hover:bg-cyber-accent/10 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-secondary via-white to-cyber-accent mb-4">
              Threat Intelligence Feed
            </h1>
            <p className="text-xl text-cyber-muted max-w-3xl mx-auto">
              Stay informed about the latest cybersecurity threats and get actionable safety tips to protect yourself online.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              <p className="font-mono">Error: {error}</p>
              <p className="text-sm mt-2">Using mock data as fallback</p>
            </div>
          )}

          {/* Filter Controls */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-mono text-sm ${filter === "all" ? "bg-cyber-accent text-cyber-bg" : "bg-cyber-dark border border-cyber-accent/30 text-cyber-muted hover:border-cyber-accent/60"}`}
            >
              All Threats
            </button>
            <button 
              onClick={() => setFilter("low")}
              className={`px-4 py-2 rounded-lg font-mono text-sm ${filter === "low" ? "bg-green-500 text-cyber-bg" : "bg-cyber-dark border border-green-500/30 text-cyber-muted hover:border-green-500/60"}`}
            >
              Low Severity
            </button>
            <button 
              onClick={() => setFilter("medium")}
              className={`px-4 py-2 rounded-lg font-mono text-sm ${filter === "medium" ? "bg-yellow-500 text-cyber-bg" : "bg-cyber-dark border border-yellow-500/30 text-cyber-muted hover:border-yellow-500/60"}`}
            >
              Medium Severity
            </button>
            <button 
              onClick={() => setFilter("high")}
              className={`px-4 py-2 rounded-lg font-mono text-sm ${filter === "high" ? "bg-orange-500 text-cyber-bg" : "bg-cyber-dark border border-orange-500/30 text-cyber-muted hover:border-orange-500/60"}`}
            >
              High Severity
            </button>
            <button 
              onClick={() => setFilter("critical")}
              className={`px-4 py-2 rounded-lg font-mono text-sm ${filter === "critical" ? "bg-red-500 text-cyber-bg" : "bg-cyber-dark border border-red-500/30 text-cyber-muted hover:border-red-500/60"}`}
            >
              Critical Severity
            </button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-cyber-accent/30 border-t-cyber-accent rounded-full animate-spin"></div>
              <p className="ml-4 text-cyber-muted">Fetching latest threat intelligence...</p>
            </div>
          ) : (
            /* Threat Feed */
            <div className="space-y-6">
              {filteredThreats.length === 0 ? (
                <div className="text-center py-12 text-cyber-muted">
                  No threats found matching the selected filter.
                </div>
              ) : (
                filteredThreats.map((threat) => (
                  <motion.div
                    key={threat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-cyber-dark/60 backdrop-blur-sm border border-cyber-accent/20 rounded-xl p-6 hover:border-cyber-accent/40 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-mono font-bold text-cyber-accent mb-1">{threat.title}</h2>
                        <div className="flex items-center space-x-4 text-sm text-cyber-muted">
                          <span>{threat.date}</span>
                          <span>Source: {threat.source}</span>
                        </div>
                      </div>
                      <div className={`${getSeverityColor(threat.severity)} px-3 py-1 rounded-full text-xs font-mono font-bold text-white`}>
                        {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                      </div>
                    </div>
                    <p className="text-cyber-text mb-4">{threat.description}</p>
                    <div className="bg-cyber-bg/20 border-l-4 border-cyber-neon p-4 rounded">
                      <h3 className="font-mono text-cyber-neon font-bold mb-2">Safety Tips:</h3>
                      <p className="text-cyber-muted mb-2">{threat.tips}</p>
                      {threat.link && (
                        <a 
                          href={threat.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyber-accent hover:underline text-sm"
                        >
                          Read the full article
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* API Note */}
          <div className="mt-12 p-6 bg-cyber-dark/40 border border-cyber-accent/20 rounded-xl">
            <h3 className="font-mono text-xl font-bold text-cyber-accent mb-4">Implementation Note</h3>
            <p className="text-cyber-muted mb-4">
              This is now using the NewsData.io API to fetch real cybersecurity news. The severity levels are determined based on keywords in the article content.
            </p>
            <div className="bg-cyber-bg/30 p-4 rounded-lg">
              <h4 className="font-mono text-cyber-neon font-bold mb-2">API Information:</h4>
              <ul className="list-disc list-inside space-y-2 text-cyber-muted">
                <li><span className="text-cyber-accent">API Source:</span> NewsData.io</li>
                <li><span className="text-cyber-accent">Query:</span> Cybersecurity, hacks, data breaches, ransomware, phishing</li>
                <li><span className="text-cyber-accent">Results:</span> {threats.length} articles fetched</li>
                <li><span className="text-cyber-accent">Status:</span> {error ? `Error: ${error}` : 'Connected successfully'}</li>
              </ul>
              <p className="mt-4 text-sm text-cyber-muted">
                All articles include direct links to the original sources for verification.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-cyber-dark/60 border-t border-cyber-accent/20 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-cyber-muted">
          <p>© 2023 CyberRaksha. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This threat intelligence feed uses real data from NewsData.io. Always verify information with official sources.
          </p>
        </div>
      </footer>
    </div>
  );
}