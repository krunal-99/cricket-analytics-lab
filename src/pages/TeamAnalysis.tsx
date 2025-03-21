
import React, { useState } from "react";
import { BarChart, Users, TrendingUp, RefreshCw, Shield } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import { StatsHighlight } from "@/components/StatsHighlight";

// Mock team data - would be replaced with actual data in real implementation
const mockTeamData = [
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    color: "#FFFF00",
    matches: 12,
    won: 8,
    lost: 4,
    nrr: 0.432,
    points: 16,
    lastFive: ["W", "W", "L", "W", "L"],
    topScorer: "R Jadeja",
    topWicketTaker: "D Chahar",
    powerplayAvg: 54.3,
    deathOversEcon: 9.2,
  },
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    color: "#004BA0",
    matches: 12,
    won: 7,
    lost: 5,
    nrr: 0.256,
    points: 14,
    lastFive: ["W", "L", "W", "W", "W"],
    topScorer: "R Sharma",
    topWicketTaker: "J Bumrah",
    powerplayAvg: 52.1,
    deathOversEcon: 8.9,
  },
  {
    id: "rcb",
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    color: "#EC1C24",
    matches: 12,
    won: 6,
    lost: 6,
    nrr: -0.132,
    points: 12,
    lastFive: ["L", "W", "L", "W", "W"],
    topScorer: "V Kohli",
    topWicketTaker: "M Siraj",
    powerplayAvg: 55.7,
    deathOversEcon: 10.1,
  },
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    color: "#3A225D",
    matches: 12,
    won: 7,
    lost: 5,
    nrr: 0.312,
    points: 14,
    lastFive: ["W", "W", "W", "L", "L"],
    topScorer: "S Iyer",
    topWicketTaker: "V Chakravarthy",
    powerplayAvg: 50.8,
    deathOversEcon: 9.5,
  },
  {
    id: "dc",
    name: "Delhi Capitals",
    shortName: "DC",
    color: "#0078BC",
    matches: 12,
    won: 5,
    lost: 7,
    nrr: -0.209,
    points: 10,
    lastFive: ["L", "L", "W", "L", "W"],
    topScorer: "R Pant",
    topWicketTaker: "A Nortje",
    powerplayAvg: 48.6,
    deathOversEcon: 9.8,
  },
  {
    id: "pbks",
    name: "Punjab Kings",
    shortName: "PBKS",
    color: "#ED1B24",
    matches: 12,
    won: 5,
    lost: 7,
    nrr: -0.187,
    points: 10,
    lastFive: ["L", "W", "L", "L", "W"],
    topScorer: "S Dhawan",
    topWicketTaker: "A Singh",
    powerplayAvg: 53.2,
    deathOversEcon: 10.2,
  },
  {
    id: "rr",
    name: "Rajasthan Royals",
    shortName: "RR",
    color: "#FF1B98",
    matches: 12,
    won: 7,
    lost: 5,
    nrr: 0.276,
    points: 14,
    lastFive: ["W", "W", "L", "W", "L"],
    topScorer: "J Buttler",
    topWicketTaker: "Y Chahal",
    powerplayAvg: 51.4,
    deathOversEcon: 9.3,
  },
  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    color: "#F7A721",
    matches: 12,
    won: 4,
    lost: 8,
    nrr: -0.421,
    points: 8,
    lastFive: ["L", "L", "W", "L", "L"],
    topScorer: "A Markram",
    topWicketTaker: "B Kumar",
    powerplayAvg: 47.8,
    deathOversEcon: 9.7,
  },
  {
    id: "gt",
    name: "Gujarat Titans",
    shortName: "GT",
    color: "#1C1C1C",
    matches: 12,
    won: 8,
    lost: 4,
    nrr: 0.392,
    points: 16,
    lastFive: ["W", "W", "W", "L", "W"],
    topScorer: "S Gill",
    topWicketTaker: "R Khan",
    powerplayAvg: 49.5,
    deathOversEcon: 8.6,
  },
  {
    id: "lsg",
    name: "Lucknow Super Giants",
    shortName: "LSG",
    color: "#A0E100",
    matches: 12,
    won: 6,
    lost: 6,
    nrr: 0.089,
    points: 12,
    lastFive: ["L", "W", "L", "W", "W"],
    topScorer: "KL Rahul",
    topWicketTaker: "A Bishnoi",
    powerplayAvg: 48.9,
    deathOversEcon: 9.4,
  },
];

const TeamAnalysis = () => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  
  const toggleTeamSelection = (teamId: string) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    } else {
      // Limit to comparing at most 3 teams
      if (selectedTeams.length < 3) {
        setSelectedTeams([...selectedTeams, teamId]);
      }
    }
  };
  
  const sortedTeams = [...mockTeamData].sort((a, b) => b.points - a.points);
  const selectedTeamsData = mockTeamData.filter((team) => 
    selectedTeams.includes(team.id)
  );
  
  // Sample head-to-head data - would come from actual match data in real implementation
  const headToHeadData = {
    "csk-mi": { wins: 5, losses: 7 },
    "csk-rcb": { wins: 8, losses: 3 },
    "mi-rcb": { wins: 6, losses: 4 },
    // more combinations would be here
  };
  
  // Get head-to-head record between two teams
  const getHeadToHead = (team1Id: string, team2Id: string) => {
    const key1 = `${team1Id}-${team2Id}`;
    const key2 = `${team2Id}-${team1Id}`;
    
    if (headToHeadData[key1]) {
      return headToHeadData[key1];
    } else if (headToHeadData[key2]) {
      return { 
        wins: headToHeadData[key2].losses, 
        losses: headToHeadData[key2].wins 
      };
    }
    
    return { wins: 0, losses: 0 };
  };
  
  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Team Analysis
            </h1>
            <p className="text-lg mt-2 text-gray-600">
              Compare team performances and statistics
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="neo-button-yellow flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Stats
            </button>
          </div>
        </div>
      </div>
      
      {/* Points Table */}
      <AnalyticsCard title="IPL 2024 Points Table" className="mb-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-neo-black">
                <th className="py-2 text-left">Team</th>
                <th className="py-2 text-center">M</th>
                <th className="py-2 text-center">W</th>
                <th className="py-2 text-center">L</th>
                <th className="py-2 text-center">Pts</th>
                <th className="py-2 text-center">NRR</th>
                <th className="py-2 text-center">Form</th>
                <th className="py-2 text-center">Compare</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team) => (
                <tr 
                  key={team.id} 
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 flex items-center">
                    <div 
                      className="w-4 h-16 mr-3" 
                      style={{ backgroundColor: team.color }}
                    ></div>
                    <div>
                      <div className="font-bold">{team.shortName}</div>
                      <div className="text-sm text-gray-600">{team.name}</div>
                    </div>
                  </td>
                  <td className="py-3 text-center">{team.matches}</td>
                  <td className="py-3 text-center font-bold text-neo-green">
                    {team.won}
                  </td>
                  <td className="py-3 text-center font-bold text-neo-red">
                    {team.lost}
                  </td>
                  <td className="py-3 text-center font-black text-xl">
                    {team.points}
                  </td>
                  <td className="py-3 text-center">
                    <span className={team.nrr > 0 ? "text-neo-green" : "text-neo-red"}>
                      {team.nrr > 0 ? "+" : ""}{team.nrr.toFixed(3)}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex justify-center space-x-1">
                      {team.lastFive.map((result, idx) => (
                        <span 
                          key={idx}
                          className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold ${
                            result === "W" 
                              ? "bg-neo-green text-white" 
                              : "bg-neo-red text-white"
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => toggleTeamSelection(team.id)}
                      className={`w-6 h-6 rounded-sm border-2 border-neo-black ${
                        selectedTeams.includes(team.id)
                          ? "bg-neo-blue"
                          : "bg-white"
                      }`}
                      aria-label={`Select ${team.shortName} for comparison`}
                    >
                      {selectedTeams.includes(team.id) && (
                        <span className="text-white">✓</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnalyticsCard>
      
      {/* Team Comparison */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Team Comparison</h2>
          {selectedTeams.length > 0 && (
            <button 
              onClick={() => setSelectedTeams([])}
              className="text-sm underline hover:text-neo-blue"
            >
              Clear selection
            </button>
          )}
        </div>
        
        {selectedTeams.length === 0 ? (
          <div className="neo-card p-10 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-bold mb-2">No Teams Selected</h3>
            <p className="text-gray-600 mb-6">
              Select up to 3 teams from the table above to compare their performance
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Team Basic Stats Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedTeamsData.map((team) => (
                <AnalyticsCard 
                  key={team.id} 
                  title={team.name}
                  rotate={true}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Win Percentage</span>
                      <span className="font-bold">
                        {Math.round((team.won / team.matches) * 100)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Top Scorer</span>
                      <span className="font-bold">{team.topScorer}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Top Wicket Taker</span>
                      <span className="font-bold">{team.topWicketTaker}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Powerplay Avg</span>
                      <span className="font-bold">{team.powerplayAvg}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Death Overs Economy</span>
                      <span className="font-bold">{team.deathOversEcon}</span>
                    </div>
                  </div>
                </AnalyticsCard>
              ))}
            </div>
            
            {/* Head-to-Head Records (only if 2 teams are selected) */}
            {selectedTeams.length === 2 && (
              <AnalyticsCard title="Head-to-Head Record" color="yellow">
                <div className="flex items-center justify-center py-6">
                  <div className="text-center px-8">
                    <div className="text-xl font-bold mb-2">
                      {mockTeamData.find(t => t.id === selectedTeams[0])?.shortName}
                    </div>
                    <div className="text-4xl font-black">
                      {getHeadToHead(selectedTeams[0], selectedTeams[1]).wins}
                    </div>
                  </div>
                  
                  <div className="text-4xl font-black px-6">VS</div>
                  
                  <div className="text-center px-8">
                    <div className="text-xl font-bold mb-2">
                      {mockTeamData.find(t => t.id === selectedTeams[1])?.shortName}
                    </div>
                    <div className="text-4xl font-black">
                      {getHeadToHead(selectedTeams[0], selectedTeams[1]).losses}
                    </div>
                  </div>
                </div>
              </AnalyticsCard>
            )}
            
            {/* Performance Radar Chart Placeholder */}
            <AnalyticsCard title="Team Performance Comparison">
              <div className="h-80 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-sm">
                <div className="text-center">
                  <BarChart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    Radar chart comparing team strengths would appear here
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Includes Batting Power, Bowling Economy, Fielding, and more
                  </p>
                </div>
              </div>
            </AnalyticsCard>
          </div>
        )}
      </div>
      
      {/* Team Strengths Analysis */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Team Strengths Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnalyticsCard title="Highest Powerplay Scores" color="blue">
            <div className="space-y-4 pt-2">
              {sortedTeams.slice(0, 5).map((team, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-2 h-10 mr-3" 
                      style={{ backgroundColor: team.color }}
                    ></div>
                    <span className="font-bold">{team.shortName}</span>
                  </div>
                  <span>{team.powerplayAvg.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Best Death Bowling Economy" color="red">
            <div className="space-y-4 pt-2">
              {[...sortedTeams]
                .sort((a, b) => a.deathOversEcon - b.deathOversEcon)
                .slice(0, 5)
                .map((team, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-2 h-10 mr-3" 
                        style={{ backgroundColor: team.color }}
                      ></div>
                      <span className="font-bold">{team.shortName}</span>
                    </div>
                    <span>{team.deathOversEcon.toFixed(1)}</span>
                  </div>
                ))}
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Most Consistent Teams" color="green">
            <div className="space-y-4 pt-2">
              {[...sortedTeams]
                .sort((a, b) => {
                  // Simple consistency metric (more W in last 5 matches)
                  const aWins = a.lastFive.filter(r => r === "W").length;
                  const bWins = b.lastFive.filter(r => r === "W").length;
                  return bWins - aWins;
                })
                .slice(0, 5)
                .map((team, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-2 h-10 mr-3" 
                        style={{ backgroundColor: team.color }}
                      ></div>
                      <span className="font-bold">{team.shortName}</span>
                    </div>
                    <div className="flex space-x-1">
                      {team.lastFive.map((result, idx) => (
                        <span 
                          key={idx}
                          className={`inline-flex items-center justify-center w-5 h-5 text-xs font-bold ${
                            result === "W" 
                              ? "bg-neo-green text-white" 
                              : "bg-neo-red text-white"
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </AnalyticsCard>
        </div>
      </div>
      
      {/* Team Player Analysis Teaser */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Player Analysis</h2>
        <AnalyticsCard title="Top Players by Team" color="purple" rotate={true}>
          <p className="mb-4">
            Explore in-depth player statistics, compare player performances across teams,
            and discover the impact players making the difference this season.
          </p>
          <a href="/players" className="neo-button inline-block">
            View Player Analysis
          </a>
        </AnalyticsCard>
      </div>
    </MainLayout>
  );
};

export default TeamAnalysis;
