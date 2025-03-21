
import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar 
} from "recharts";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

// Mock team data for predictions
const teamData = [
  { 
    id: "MI", 
    name: "Mumbai Indians", 
    played: 14, 
    won: 8, 
    lost: 6, 
    nrr: 0.423, 
    points: 16,
    remainingMatches: [
      { opponent: "RCB", winProbability: 55 },
      { opponent: "CSK", winProbability: 48 }
    ],
    strengths: {
      batting: 85,
      bowling: 78,
      fielding: 80,
      powerplay: 82,
      death: 86,
      consistency: 75
    },
    qualificationProbability: 92
  },
  { 
    id: "CSK", 
    name: "Chennai Super Kings", 
    played: 14, 
    won: 7, 
    lost: 7, 
    nrr: 0.208, 
    points: 14,
    remainingMatches: [
      { opponent: "MI", winProbability: 52 },
      { opponent: "RR", winProbability: 45 }
    ],
    strengths: {
      batting: 80,
      bowling: 82,
      fielding: 85,
      powerplay: 75,
      death: 78,
      consistency: 88
    },
    qualificationProbability: 78
  },
  { 
    id: "RCB", 
    name: "Royal Challengers Bengaluru", 
    played: 14, 
    won: 7, 
    lost: 7, 
    nrr: 0.119, 
    points: 14,
    remainingMatches: [
      { opponent: "MI", winProbability: 45 },
      { opponent: "SRH", winProbability: 52 }
    ],
    strengths: {
      batting: 88,
      bowling: 72,
      fielding: 75,
      powerplay: 84,
      death: 70,
      consistency: 65
    },
    qualificationProbability: 75
  },
  { 
    id: "GT", 
    name: "Gujarat Titans", 
    played: 14, 
    won: 7, 
    lost: 7, 
    nrr: 0.097, 
    points: 14,
    remainingMatches: [
      { opponent: "DC", winProbability: 60 },
      { opponent: "KKR", winProbability: 40 }
    ],
    strengths: {
      batting: 76,
      bowling: 84,
      fielding: 78,
      powerplay: 72,
      death: 80,
      consistency: 82
    },
    qualificationProbability: 73
  },
  { 
    id: "RR", 
    name: "Rajasthan Royals", 
    played: 14, 
    won: 9, 
    lost: 5, 
    nrr: 0.319, 
    points: 18,
    remainingMatches: [
      { opponent: "CSK", winProbability: 55 },
      { opponent: "KKR", winProbability: 45 }
    ],
    strengths: {
      batting: 84,
      bowling: 85,
      fielding: 78,
      powerplay: 80,
      death: 75,
      consistency: 80
    },
    qualificationProbability: 95
  },
  { 
    id: "KKR", 
    name: "Kolkata Knight Riders", 
    played: 14, 
    won: 10, 
    lost: 4, 
    nrr: 1.428, 
    points: 20,
    remainingMatches: [
      { opponent: "RR", winProbability: 55 },
      { opponent: "GT", winProbability: 60 }
    ],
    strengths: {
      batting: 87,
      bowling: 84,
      fielding: 82,
      powerplay: 88,
      death: 82,
      consistency: 85
    },
    qualificationProbability: 98
  },
  { 
    id: "SRH", 
    name: "Sunrisers Hyderabad", 
    played: 14, 
    won: 8, 
    lost: 6, 
    nrr: 0.406, 
    points: 16,
    remainingMatches: [
      { opponent: "LSG", winProbability: 62 },
      { opponent: "RCB", winProbability: 48 }
    ],
    strengths: {
      batting: 90,
      bowling: 78,
      fielding: 75,
      powerplay: 92,
      death: 75,
      consistency: 70
    },
    qualificationProbability: 85
  },
  { 
    id: "LSG", 
    name: "Lucknow Super Giants", 
    played: 14, 
    won: 7, 
    lost: 7, 
    nrr: -0.100, 
    points: 14,
    remainingMatches: [
      { opponent: "SRH", winProbability: 38 },
      { opponent: "DC", winProbability: 55 }
    ],
    strengths: {
      batting: 78,
      bowling: 82,
      fielding: 80,
      powerplay: 75,
      death: 80,
      consistency: 75
    },
    qualificationProbability: 65
  },
  { 
    id: "DC", 
    name: "Delhi Capitals", 
    played: 14, 
    won: 5, 
    lost: 9, 
    nrr: -0.478, 
    points: 10,
    remainingMatches: [
      { opponent: "GT", winProbability: 40 },
      { opponent: "LSG", winProbability: 45 }
    ],
    strengths: {
      batting: 75,
      bowling: 78,
      fielding: 75,
      powerplay: 72,
      death: 74,
      consistency: 65
    },
    qualificationProbability: 25
  },
  { 
    id: "PBKS", 
    name: "Punjab Kings", 
    played: 14, 
    won: 5, 
    lost: 9, 
    nrr: -0.292, 
    points: 10,
    remainingMatches: [
      { opponent: "RCB", winProbability: 42 },
      { opponent: "CSK", winProbability: 40 }
    ],
    strengths: {
      batting: 80,
      bowling: 72,
      fielding: 75,
      powerplay: 85,
      death: 68,
      consistency: 60
    },
    qualificationProbability: 22
  }
].sort((a, b) => b.qualificationProbability - a.qualificationProbability);

// Playoff qualification scenarios based on points
const playoffScenarios = [
  { points: 20, probability: 98, teams: ["KKR"] },
  { points: 18, probability: 95, teams: ["RR"] },
  { points: 16, probability: 85, teams: ["MI", "SRH"] },
  { points: 14, probability: 65, teams: ["CSK", "RCB", "GT", "LSG"] },
  { points: 12, probability: 25, teams: [] },
  { points: 10, probability: 5, teams: ["DC", "PBKS"] }
];

// Random colors for prediction visualization
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B66FF'];

const PredictionsPage: React.FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [comparisonMetric, setComparisonMetric] = useState<string>("overall");

  const toggleTeamSelection = (teamId: string) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId) 
        : [...prev, teamId].slice(0, 3) // Limit to 3 teams
    );
  };

  // Format data for radar chart comparison
  const radarData = [
    { subject: 'Batting', fullMark: 100 },
    { subject: 'Bowling', fullMark: 100 },
    { subject: 'Fielding', fullMark: 100 },
    { subject: 'Powerplay', fullMark: 100 },
    { subject: 'Death Overs', fullMark: 100 },
    { subject: 'Consistency', fullMark: 100 },
  ].map(item => {
    const result = { subject: item.subject, fullMark: item.fullMark };
    selectedTeams.forEach(teamId => {
      const team = teamData.find(t => t.id === teamId);
      if (team) {
        const key = item.subject.toLowerCase().replace(" overs", "");
        result[teamId] = team.strengths[key as keyof typeof team.strengths];
      }
    });
    return result;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-black tracking-tight">IPL 2024 Predictions & Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyticsCard 
            title="Playoff Qualification Probability" 
            color="purple"
            className="md:col-span-2"
          >
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamData.slice(0, 8)} // Show top 8 teams
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Qualification Probability']} />
                  <Legend />
                  <Bar 
                    dataKey="qualificationProbability" 
                    name="Qualification Probability (%)" 
                    fill="#8884d8" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsCard>

          <AnalyticsCard 
            title="Points Table Status" 
            color="blue"
          >
            <div className="space-y-4">
              {playoffScenarios.map((scenario, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded ${scenario.probability > 80 
                    ? 'bg-green-100 border-l-4 border-green-500' 
                    : scenario.probability > 50 
                      ? 'bg-yellow-100 border-l-4 border-yellow-500' 
                      : 'bg-red-100 border-l-4 border-red-500'}`}
                >
                  <div className="flex justify-between">
                    <span className="font-bold">{scenario.points} Points</span>
                    <span className="font-medium">{scenario.probability}%</span>
                  </div>
                  <div className="text-sm mt-1">
                    {scenario.teams.length > 0 
                      ? scenario.teams.join(', ') 
                      : 'No teams currently'}
                  </div>
                </div>
              ))}
            </div>
          </AnalyticsCard>
        </div>

        <AnalyticsCard title="Team Strength Comparison" color="white">
          <div className="mb-4">
            <p className="font-medium mb-2">Select up to 3 teams to compare:</p>
            <div className="flex flex-wrap gap-2">
              {teamData.map(team => (
                <Button
                  key={team.id}
                  variant={selectedTeams.includes(team.id) ? "default" : "outline"}
                  onClick={() => toggleTeamSelection(team.id)}
                  className="neo-button"
                >
                  {team.id}
                </Button>
              ))}
            </div>
          </div>

          {selectedTeams.length > 0 ? (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={120} width={730} height={400} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  
                  {selectedTeams.map((teamId, index) => (
                    <Radar
                      key={teamId}
                      name={teamData.find(t => t.id === teamId)?.name || teamId}
                      dataKey={teamId}
                      stroke={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                      fillOpacity={0.3}
                    />
                  ))}
                  
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Select teams above to view comparison
            </div>
          )}
        </AnalyticsCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnalyticsCard 
            title="Key Upcoming Matches" 
            color="yellow"
            rotate
          >
            <div className="space-y-3">
              {teamData.slice(0, 5).flatMap(team => 
                team.remainingMatches.map((match, idx) => ({
                  team1: team.id,
                  team1Name: team.name,
                  team2: match.opponent,
                  team2Name: teamData.find(t => t.id === match.opponent)?.name || match.opponent,
                  winProbability: match.winProbability,
                  impact: (team.qualificationProbability / 20) * (match.winProbability / 100) * 100
                }))
              )
              .sort((a, b) => b.impact - a.impact)
              .slice(0, 5)
              .map((match, index) => (
                <div key={index} className="p-3 bg-neo-cream rounded neo-card">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">{match.team1} vs {match.team2}</div>
                    <div className={`px-2 py-1 rounded text-white text-sm ${
                      match.winProbability > 55 ? 'bg-green-500' : 
                      match.winProbability > 45 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {match.winProbability}% {match.team1} win
                    </div>
                  </div>
                  <div className="text-sm mt-1">
                    High impact match for playoff qualification
                  </div>
                </div>
              ))}
            </div>
          </AnalyticsCard>

          <AnalyticsCard 
            title="Win Predictor: Next 10 Matches" 
            color="green"
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamData.slice(0, 5).flatMap(team => 
                    team.remainingMatches.map((match, idx) => ({
                      matchName: `${team.id} vs ${match.opponent}`,
                      [team.id]: match.winProbability,
                      [match.opponent]: 100 - match.winProbability
                    }))
                  ).slice(0, 10)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="matchName" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar stackId="a" dataKey={Object.keys(teamData[0].remainingMatches[0])[0]} fill="#8884d8" />
                  {teamData.map((team, index) => (
                    <Bar
                      key={team.id}
                      dataKey={team.id}
                      stackId="a"
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsCard>
        </div>
      </div>
    </MainLayout>
  );
};

export default PredictionsPage;
