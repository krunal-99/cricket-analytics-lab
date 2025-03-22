import React, { useState } from "react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

const teamData = [
  {
    id: "KKR",
    name: "Kolkata Knight Riders",
    played: 14,
    won: 9,
    lost: 3,
    nrr: 1.428,
    points: 20,
    strengths: {
      batting: 90,
      bowling: 85,
      fielding: 80,
      powerplay: 88,
      death: 82,
      consistency: 87,
    },
  },
  {
    id: "SRH",
    name: "Sunrisers Hyderabad",
    played: 14,
    won: 8,
    lost: 5,
    nrr: 0.414,
    points: 17,
    strengths: {
      batting: 92,
      bowling: 78,
      fielding: 75,
      powerplay: 90,
      death: 76,
      consistency: 72,
    },
  },
  {
    id: "RR",
    name: "Rajasthan Royals",
    played: 14,
    won: 8,
    lost: 6,
    nrr: 0.273,
    points: 16,
    strengths: {
      batting: 85,
      bowling: 87,
      fielding: 78,
      powerplay: 80,
      death: 82,
      consistency: 75,
    },
  },
  {
    id: "RCB",
    name: "Royal Challengers Bengaluru",
    played: 14,
    won: 7,
    lost: 7,
    nrr: 0.459,
    points: 14,
    strengths: {
      batting: 89,
      bowling: 73,
      fielding: 76,
      powerplay: 85,
      death: 70,
      consistency: 68,
    },
  },
  {
    id: "CSK",
    name: "Chennai Super Kings",
    played: 14,
    won: 7,
    lost: 7,
    nrr: 0.392,
    points: 14,
    strengths: {
      batting: 82,
      bowling: 80,
      fielding: 85,
      powerplay: 78,
      death: 80,
      consistency: 83,
    },
  },
  {
    id: "DC",
    name: "Delhi Capitals",
    played: 14,
    won: 7,
    lost: 7,
    nrr: -0.377,
    points: 14,
    strengths: {
      batting: 77,
      bowling: 79,
      fielding: 75,
      powerplay: 74,
      death: 76,
      consistency: 70,
    },
  },
  {
    id: "LSG",
    name: "Lucknow Super Giants",
    played: 14,
    won: 7,
    lost: 7,
    nrr: -0.667,
    points: 14,
    strengths: {
      batting: 78,
      bowling: 80,
      fielding: 78,
      powerplay: 75,
      death: 79,
      consistency: 74,
    },
  },
  {
    id: "GT",
    name: "Gujarat Titans",
    played: 14,
    won: 5,
    lost: 8,
    nrr: -1.063,
    points: 11,
    strengths: {
      batting: 75,
      bowling: 82,
      fielding: 77,
      powerplay: 72,
      death: 80,
      consistency: 65,
    },
  },
  {
    id: "PBKS",
    name: "Punjab Kings",
    played: 14,
    won: 5,
    lost: 9,
    nrr: -0.353,
    points: 10,
    strengths: {
      batting: 80,
      bowling: 74,
      fielding: 75,
      powerplay: 82,
      death: 70,
      consistency: 62,
    },
  },
  {
    id: "MI",
    name: "Mumbai Indians",
    played: 14,
    won: 4,
    lost: 10,
    nrr: -0.318,
    points: 8,
    strengths: {
      batting: 83,
      bowling: 76,
      fielding: 78,
      powerplay: 80,
      death: 74,
      consistency: 60,
    },
  },
].sort((a, b) => b.points - a.points || b.nrr - a.nrr);
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#FF6B6B",
  "#6B66FF",
];

const ComparisonPage: React.FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const toggleTeamSelection = (teamId: string) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId].slice(0, 3)
    );
  };

  const radarData = [
    { subject: "Batting", fullMark: 100 },
    { subject: "Bowling", fullMark: 100 },
    { subject: "Fielding", fullMark: 100 },
    { subject: "Powerplay", fullMark: 100 },
    { subject: "Death Overs", fullMark: 100 },
    { subject: "Consistency", fullMark: 100 },
  ].map((item) => {
    const result = { subject: item.subject, fullMark: item.fullMark };
    selectedTeams.forEach((teamId) => {
      const team = teamData.find((t) => t.id === teamId);
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
        <h1 className="text-3xl font-black tracking-tight">
          IPL 2024 Comparisons
        </h1>

        <AnalyticsCard title="Team Strength Comparison" color="white">
          <div className="mb-4">
            <p className="font-medium mb-2">Select up to 3 teams to compare:</p>
            <div className="flex flex-wrap gap-2">
              {teamData.map((team) => (
                <Button
                  key={team.id}
                  variant={
                    selectedTeams.includes(team.id) ? "default" : "outline"
                  }
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
                <RadarChart
                  outerRadius={120}
                  width={730}
                  height={400}
                  data={radarData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />

                  {selectedTeams.map((teamId, index) => (
                    <Radar
                      key={teamId}
                      name={
                        teamData.find((t) => t.id === teamId)?.name || teamId
                      }
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
      </div>
    </MainLayout>
  );
};

export default ComparisonPage;
