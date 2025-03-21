
import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";

// Mock data - in a real app, this would come from an API or data source
const playerData = [
  { id: 1, name: "Virat Kohli", team: "RCB", matches: 14, runs: 639, avg: 45.64, sr: 153.9, fifties: 5, hundreds: 1, motm: 3 },
  { id: 2, name: "Jos Buttler", team: "RR", matches: 14, runs: 582, avg: 41.57, sr: 149.2, fifties: 4, hundreds: 1, motm: 2 },
  { id: 3, name: "KL Rahul", team: "LSG", matches: 14, runs: 522, avg: 37.29, sr: 135.5, fifties: 4, hundreds: 0, motm: 1 },
  { id: 4, name: "Jasprit Bumrah", team: "MI", matches: 14, wickets: 20, economy: 6.71, avg: 22.35, sr: 19.95, fourWickets: 1, fiveWickets: 0, motm: 2 },
  { id: 5, name: "Trent Boult", team: "RR", matches: 14, wickets: 18, economy: 7.85, avg: 25.33, sr: 19.33, fourWickets: 0, fiveWickets: 0, motm: 1 },
  { id: 6, name: "Suryakumar Yadav", team: "MI", matches: 12, runs: 480, avg: 40.00, sr: 170.56, fifties: 4, hundreds: 0, motm: 2 },
  { id: 7, name: "Rashid Khan", team: "GT", matches: 14, wickets: 15, economy: 6.98, avg: 27.73, sr: 23.80, fourWickets: 0, fiveWickets: 0, motm: 1 },
  { id: 8, name: "Shubman Gill", team: "GT", matches: 14, runs: 510, avg: 39.23, sr: 142.86, fifties: 3, hundreds: 1, motm: 2 },
  { id: 9, name: "Yuzvendra Chahal", team: "RR", matches: 14, wickets: 17, economy: 8.24, avg: 28.47, sr: 20.71, fourWickets: 1, fiveWickets: 0, motm: 1 },
  { id: 10, name: "Faf du Plessis", team: "RCB", matches: 14, runs: 498, avg: 35.57, sr: 156.60, fifties: 4, hundreds: 0, motm: 1 },
  { id: 11, name: "Rishabh Pant", team: "DC", matches: 14, runs: 472, avg: 33.71, sr: 151.50, fifties: 4, hundreds: 0, motm: 1 },
  { id: 12, name: "Mohammed Shami", team: "GT", matches: 14, wickets: 19, economy: 7.92, avg: 24.21, sr: 18.30, fourWickets: 1, fiveWickets: 0, motm: 2 },
];

// Team color mapping for visualization
const teamColors = {
  RCB: "#EC1C24",
  RR: "#FF1493",
  LSG: "#6082B6",
  MI: "#004BA0",
  GT: "#1F3A8A",
  DC: "#0078BC",
  CSK: "#FDB913",
  KKR: "#3A225D",
  PBKS: "#ED1B24",
  SRH: "#F7A721"
};

// Define chart configs for reusability
const chartConfig = {
  runs: { label: "Runs", key: "runs", color: "#ff9900" },
  avg: { label: "Average", key: "avg", color: "#0088fe" },
  sr: { label: "Strike Rate", key: "sr", color: "#00c49f" },
  matches: { label: "Matches", key: "matches", color: "#ff8042" },
  wickets: { label: "Wickets", key: "wickets", color: "#8884d8" },
  economy: { label: "Economy", key: "economy", color: "#82ca9d" },
};

const PlayerPage: React.FC = () => {
  const [view, setView] = useState<"batting" | "bowling">("batting");
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const battingPlayers = playerData.filter(p => p.runs);
  const bowlingPlayers = playerData.filter(p => p.wickets);

  const handlePlayerSelect = (playerId: number) => {
    setSelectedPlayer(playerId === selectedPlayer ? null : playerId);
  };

  // Data for batting pie chart
  const runsByTeamData = battingPlayers.reduce((acc, player) => {
    const existingTeam = acc.find(item => item.team === player.team);
    if (existingTeam) {
      existingTeam.value += player.runs;
    } else {
      acc.push({ team: player.team, value: player.runs });
    }
    return acc;
  }, [] as { team: string; value: number }[]);

  // Data for bowling bar chart
  const topBowlers = [...bowlingPlayers].sort((a, b) => b.wickets - a.wickets).slice(0, 5);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight">IPL 2024 Player Analysis</h1>
          <div className="neo-card inline-flex p-1 bg-white">
            <Button 
              variant={view === "batting" ? "default" : "outline"}
              onClick={() => setView("batting")}
              className="neo-button"
            >
              Batting Stats
            </Button>
            <Button 
              variant={view === "bowling" ? "default" : "outline"}
              onClick={() => setView("bowling")}
              className="neo-button"
            >
              Bowling Stats
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalyticsCard 
            title={view === "batting" ? "Runs Distribution by Team" : "Wickets Distribution by Team"}
            color="blue"
            className="lg:col-span-1"
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={view === "batting" ? runsByTeamData : bowlingPlayers.reduce((acc, player) => {
                      const existingTeam = acc.find(item => item.team === player.team);
                      if (existingTeam) {
                        existingTeam.value += player.wickets;
                      } else {
                        acc.push({ team: player.team, value: player.wickets });
                      }
                      return acc;
                    }, [] as { team: string; value: number }[])}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(view === "batting" ? runsByTeamData : bowlingPlayers.reduce((acc, player) => {
                      const existingTeam = acc.find(item => item.team === player.team);
                      if (existingTeam) {
                        existingTeam.value += player.wickets;
                      } else {
                        acc.push({ team: player.team, value: player.wickets });
                      }
                      return acc;
                    }, [] as { team: string; value: number }[])).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={teamColors[entry.team as keyof typeof teamColors] || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsCard>

          <AnalyticsCard 
            title={view === "batting" ? "Top Run Scorers" : "Top Wicket Takers"}
            color="yellow"
            className="lg:col-span-2"
            rotate
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={view === "batting" 
                    ? [...battingPlayers].sort((a, b) => b.runs - a.runs).slice(0, 5) 
                    : topBowlers
                  }
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey={view === "batting" ? "runs" : "wickets"} 
                    fill={view === "batting" ? "#FF9933" : "#8884d8"} 
                    name={view === "batting" ? "Runs" : "Wickets"}
                  />
                  <Bar 
                    dataKey={view === "batting" ? "sr" : "economy"} 
                    fill={view === "batting" ? "#00C49F" : "#82ca9d"} 
                    name={view === "batting" ? "Strike Rate" : "Economy"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsCard>
        </div>

        <AnalyticsCard title={view === "batting" ? "Batting Performance" : "Bowling Performance"} color="white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Matches</TableHead>
                {view === "batting" ? (
                  <>
                    <TableHead>Runs</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Strike Rate</TableHead>
                    <TableHead>50s</TableHead>
                    <TableHead>100s</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Wickets</TableHead>
                    <TableHead>Economy</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Strike Rate</TableHead>
                    <TableHead>4W+</TableHead>
                  </>
                )}
                <TableHead>MOTM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(view === "batting" ? battingPlayers : bowlingPlayers)
                .sort((a, b) => view === "batting" ? b.runs - a.runs : b.wickets - a.wickets)
                .map(player => (
                  <TableRow 
                    key={player.id}
                    className={`cursor-pointer ${selectedPlayer === player.id ? 'bg-neo-cream' : ''}`}
                    onClick={() => handlePlayerSelect(player.id)}
                  >
                    <TableCell className="font-bold">{player.name}</TableCell>
                    <TableCell>
                      <span 
                        className="px-2 py-1 text-white rounded" 
                        style={{ backgroundColor: teamColors[player.team as keyof typeof teamColors] }}
                      >
                        {player.team}
                      </span>
                    </TableCell>
                    <TableCell>{player.matches}</TableCell>
                    {view === "batting" ? (
                      <>
                        <TableCell>{player.runs}</TableCell>
                        <TableCell>{player.avg}</TableCell>
                        <TableCell>{player.sr}</TableCell>
                        <TableCell>{player.fifties}</TableCell>
                        <TableCell>{player.hundreds}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{player.wickets}</TableCell>
                        <TableCell>{player.economy}</TableCell>
                        <TableCell>{player.avg}</TableCell>
                        <TableCell>{player.sr}</TableCell>
                        <TableCell>{player.fourWickets}</TableCell>
                      </>
                    )}
                    <TableCell>{player.motm}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </AnalyticsCard>

        {selectedPlayer && (
          <AnalyticsCard 
            title={`${playerData.find(p => p.id === selectedPlayer)?.name} - Detailed Analysis`} 
            color="purple"
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[playerData.find(p => p.id === selectedPlayer)].filter(Boolean) as typeof playerData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  {view === "batting" ? (
                    <>
                      <Bar yAxisId="left" dataKey="runs" fill="#8884d8" name="Runs" />
                      <Bar yAxisId="right" dataKey="sr" fill="#82ca9d" name="Strike Rate" />
                    </>
                  ) : (
                    <>
                      <Bar yAxisId="left" dataKey="wickets" fill="#8884d8" name="Wickets" />
                      <Bar yAxisId="right" dataKey="economy" fill="#82ca9d" name="Economy" />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsCard>
        )}
      </div>
    </MainLayout>
  );
};

export default PlayerPage;
