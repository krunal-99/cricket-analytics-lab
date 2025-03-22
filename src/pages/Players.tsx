import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";

const batsmenStats = [
  {
    id: 1,
    name: "Virat Kohli",
    team: "RCB",
    runs: 741,
    avg: 61.5,
    sr: 154.69,
    hs: 113,
    matches: 15,
  },
  {
    id: 2,
    name: "Ruturaj Gaikwad",
    team: "CSK",
    runs: 583,
    avg: 53.0,
    sr: 141.16,
    hs: 108,
    matches: 14,
  },
  {
    id: 3,
    name: "Riyan Parag",
    team: "RR",
    runs: 573,
    avg: 52.09,
    sr: 149.21,
    hs: 84,
    matches: 14,
  },
  {
    id: 4,
    name: "Travis Head",
    team: "SRH",
    runs: 567,
    avg: 40.5,
    sr: 191.55,
    hs: 102,
    matches: 15,
  },
  {
    id: 5,
    name: "Sanju Samson",
    team: "RR",
    runs: 531,
    avg: 48.27,
    sr: 153.46,
    hs: 86,
    matches: 15,
  },
  {
    id: 6,
    name: "Sai Sudarshan",
    team: "GT",
    runs: 527,
    avg: 47.91,
    sr: 141.28,
    hs: 103,
    matches: 12,
  },
  {
    id: 7,
    name: "K L Rahul",
    team: "LSG",
    runs: 520,
    avg: 37.14,
    sr: 136.12,
    hs: 82,
    matches: 14,
  },
];

const bowlerStats = [
  {
    id: 8,
    name: "Harshal Patel",
    team: "PBKS",
    wickets: 24,
    matches: 14,
    economy: 9.73,
    best: "15/3",
  },
  {
    id: 9,
    name: "Varun Chakravarthy",
    team: "KKR",
    wickets: 21,
    matches: 15,
    economy: 8.04,
    best: "16/3",
  },
  {
    id: 10,
    name: "Jasprit Bumrah",
    team: "MI",
    wickets: 20,
    matches: 13,
    economy: 6.48,
    best: "21/5",
  },
  {
    id: 11,
    name: "T Natarajan",
    team: "SRH",
    wickets: 19,
    matches: 14,
    economy: 9.05,
    best: "19/4",
  },
  {
    id: 12,
    name: "Harshit Rana",
    team: "KKR",
    wickets: 19,
    matches: 13,
    economy: 9.08,
    best: "24/3",
  },
  {
    id: 13,
    name: "Avesh Khan",
    team: "RR",
    wickets: 19,
    matches: 16,
    economy: 9.59,
    best: "27/3",
  },
  {
    id: 14,
    name: "Arshdeep Singh",
    team: "PBKS",
    wickets: 19,
    matches: 14,
    economy: 10.03,
    best: "29/4",
  },
];

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
  SRH: "#F7A721",
};

const PlayerPage: React.FC = () => {
  const [view, setView] = useState<"batting" | "bowling">("batting");
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const battingPlayers = batsmenStats;
  const bowlingPlayers = bowlerStats;

  const handlePlayerSelect = (playerId: number) => {
    setSelectedPlayer(playerId === selectedPlayer ? null : playerId);
  };

  const runsByTeamData = battingPlayers.reduce((acc, player) => {
    const existingTeam = acc.find((item) => item.team === player.team);
    if (existingTeam) {
      existingTeam.value += player.runs;
    } else {
      acc.push({ team: player.team, value: player.runs });
    }
    return acc;
  }, [] as { team: string; value: number }[]);

  const wicketsByTeamData = bowlingPlayers.reduce((acc, player) => {
    const existingTeam = acc.find((item) => item.team === player.team);
    if (existingTeam) {
      existingTeam.value += player.wickets;
    } else {
      acc.push({ team: player.team, value: player.wickets });
    }
    return acc;
  }, [] as { team: string; value: number }[]);

  const topBowlers = [...bowlingPlayers]
    .sort((a, b) => b.wickets - a.wickets)
    .slice(0, 5);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight">
            IPL 2024 Player Analysis
          </h1>
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
            title={
              view === "batting"
                ? "Runs Distribution by Team (Top Players)"
                : "Wickets Distribution by Team (Top Players)"
            }
            color="blue"
            className="lg:col-span-1"
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={
                      view === "batting" ? runsByTeamData : wicketsByTeamData
                    }
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ team, percent }) =>
                      `${team} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(view === "batting"
                      ? runsByTeamData
                      : wicketsByTeamData
                    ).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          teamColors[entry.team as keyof typeof teamColors] ||
                          `#${Math.floor(Math.random() * 16777215).toString(
                            16
                          )}`
                        }
                      />
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
                  data={
                    view === "batting"
                      ? [...battingPlayers]
                          .sort((a, b) => b.runs - a.runs)
                          .slice(0, 5)
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

        <AnalyticsCard
          title={
            view === "batting" ? "Batting Performance" : "Bowling Performance"
          }
          color="white"
        >
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
                    <TableHead>High Score</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Wickets</TableHead>
                    <TableHead>Economy</TableHead>
                    <TableHead>Best Figures</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(view === "batting" ? battingPlayers : bowlingPlayers)
                .sort((a, b) =>
                  view === "batting" ? b.runs - a.runs : b.wickets - a.wickets
                )
                .map((player) => (
                  <TableRow
                    key={player.id}
                    className={`cursor-pointer ${
                      selectedPlayer === player.id ? "bg-neo-cream" : ""
                    }`}
                    onClick={() => handlePlayerSelect(player.id)}
                  >
                    <TableCell className="font-bold">{player.name}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-1 text-white rounded"
                        style={{
                          backgroundColor:
                            teamColors[player.team as keyof typeof teamColors],
                        }}
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
                        <TableCell>{player.hs}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{player.wickets}</TableCell>
                        <TableCell>{player.economy}</TableCell>
                        <TableCell>{player.best}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </AnalyticsCard>

        {selectedPlayer && (
          <AnalyticsCard
            title={`${
              (view === "batting"
                ? battingPlayers.find((p) => p.id === selectedPlayer)
                : bowlingPlayers.find((p) => p.id === selectedPlayer)
              )?.name
            } - Detailed Analysis`}
            color="purple"
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    view === "batting"
                      ? [
                          battingPlayers.find((p) => p.id === selectedPlayer),
                        ].filter(Boolean)
                      : [
                          bowlingPlayers.find((p) => p.id === selectedPlayer),
                        ].filter(Boolean)
                  }
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
                      <Bar
                        yAxisId="left"
                        dataKey="runs"
                        fill="#8884d8"
                        name="Runs"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="sr"
                        fill="#82ca9d"
                        name="Strike Rate"
                      />
                    </>
                  ) : (
                    <>
                      <Bar
                        yAxisId="left"
                        dataKey="wickets"
                        fill="#8884d8"
                        name="Wickets"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="economy"
                        fill="#82ca9d"
                        name="Economy"
                      />
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
