import React, { useState } from "react";
import { Shield } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { AnalyticsCard } from "@/components/AnalyticsCard";

const teamData = [
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    color: "#3A225D",
    matches: 14,
    won: 9,
    lost: 3,
    nrr: 1.428,
    points: 20,
    lastFive: ["N", "N", "W", "W", "W"],
    topScorer: "S Narayan",
    topWicketTaker: "V Chakravarthy",
    for: { runs: 2389, overs: 225 },
    against: { runs: 2135, overs: 232.2 },
    rr: 11.12,
  },
  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    color: "#F7A721",
    matches: 14,
    won: 8,
    lost: 5,
    nrr: 0.414,
    points: 17,
    lastFive: ["W", "N", "W", "L", "W"],
    topScorer: "T Head",
    topWicketTaker: "T Natrajan",
    for: { runs: 2605, overs: 247 },
    against: { runs: 2599, overs: 256.3 },
    rr: 11.17,
  },
  {
    id: "rr",
    name: "Rajasthan Royals",
    shortName: "RR",
    color: "#FF1B98",
    matches: 14,
    won: 8,
    lost: 5,
    nrr: 0.273,
    points: 17,
    lastFive: ["N", "L", "L", "L", "L"],
    topScorer: "S Samson",
    topWicketTaker: "A Khan",
    for: { runs: 2334, overs: 252.1 },
    against: { runs: 2310, overs: 257.1 },
    rr: 8.58,
  },
  {
    id: "rcb",
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    color: "#EC1C24",
    matches: 14,
    won: 7,
    lost: 7,
    nrr: 0.459,
    points: 14,
    lastFive: ["W", "W", "W", "W", "W"],
    topScorer: "V Kohli",
    topWicketTaker: "Y Dayal",
    for: { runs: 2758, overs: 269 },
    against: { runs: 2646, overs: 270.1 },
    rr: 9.73,
  },
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    color: "#FFFF00",
    matches: 14,
    won: 7,
    lost: 7,
    nrr: 0.392,
    points: 14,
    lastFive: ["L", "W", "L", "W", "L"],
    topScorer: "R Gaikwad",
    topWicketTaker: "T Deshpande",
    for: { runs: 2524, overs: 274.4 },
    against: { runs: 2415, overs: 274.3 },
    rr: 8.72,
  },
  {
    id: "dc",
    name: "Delhi Capitals",
    shortName: "DC",
    color: "#0078BC",
    matches: 14,
    won: 7,
    lost: 7,
    nrr: -0.377,
    points: 14,
    lastFive: ["W", "L", "W", "L", "W"],
    topScorer: "R Pant",
    topWicketTaker: "K Ahmed",
    for: { runs: 2573, overs: 267 },
    against: { runs: 2762, overs: 275.5 },
    rr: 10.67,
  },
  {
    id: "lsg",
    name: "Lucknow Super Giants",
    shortName: "LSG",
    color: "#A0E100",
    matches: 14,
    won: 7,
    lost: 7,
    nrr: -0.667,
    points: 14,
    lastFive: ["W", "L", "L", "L", "W"],
    topScorer: "KL Rahul",
    topWicketTaker: "N Haq",
    for: { runs: 2483, overs: 277.5 },
    against: { runs: 2521, overs: 262.3 },
    rr: 8.27,
  },
  {
    id: "gt",
    name: "Gujarat Titans",
    shortName: "GT",
    color: "#1C1C1C",
    matches: 14,
    won: 5,
    lost: 7,
    nrr: -1.063,
    points: 10,
    lastFive: ["N", "N", "W", "L", "L"],
    topScorer: "S Sudarshan",
    topWicketTaker: "M Sharma",
    for: { runs: 2040, overs: 238.2 },
    against: { runs: 2101, overs: 218.2 },
    rr: 7.72,
  },
  {
    id: "pbks",
    name: "Punjab Kings",
    shortName: "PBKS",
    color: "#ED1B24",
    matches: 14,
    won: 5,
    lost: 9,
    nrr: -0.353,
    points: 10,
    lastFive: ["L", "W", "L", "L", "W"],
    topScorer: "S Singh",
    topWicketTaker: "A Singh",
    for: { runs: 2487, overs: 247.3 },
    against: { runs: 2612, overs: 277.3 },
    rr: 8.84,
  },
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    color: "#004BA0",
    matches: 14,
    won: 4,
    lost: 10,
    nrr: -0.318,
    points: 8,
    lastFive: ["L", "L", "W", "L", "L"],
    topScorer: "R Sharma",
    topWicketTaker: "J Bumrah",
    for: { runs: 2568, overs: 277.3 },
    against: { runs: 2660, overs: 269.3 },
    rr: 9.46,
  },
];

const TeamAnalysis = () => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const toggleTeamSelection = (teamId: string) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    } else {
      if (selectedTeams.length < 3) {
        setSelectedTeams([...selectedTeams, teamId]);
      }
    }
  };

  const sortedTeams = [...teamData].sort((a, b) => b.points - a.points);
  const rrSortedTeams = [...teamData].sort((a, b) => b.rr - a.rr);
  const selectedTeamsData = teamData.filter((team) =>
    selectedTeams.includes(team.id)
  );

  return (
    <MainLayout>
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
        </div>
      </div>
      \{" "}
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
                    <span
                      className={
                        team.nrr > 0 ? "text-neo-green" : "text-neo-red"
                      }
                    >
                      {team.nrr > 0 ? "+" : ""}
                      {team.nrr.toFixed(3)}
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
              Select up to 3 teams from the table above to compare their
              performance
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedTeamsData.map((team) => (
                <AnalyticsCard key={team.id} title={team.name} rotate={true}>
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
                      <span className="text-gray-600">Overs Played:</span>
                      <span className="font-bold">{team.for.overs}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Runs Scored``:</span>
                      <span className="font-bold">{team.for.runs}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overs Bowled:</span>
                      <span className="font-bold">{team.against.overs}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Runs Conceeded``:</span>
                      <span className="font-bold">{team.against.runs}</span>
                    </div>
                  </div>
                </AnalyticsCard>
              ))}
            </div>

            {selectedTeams.length === 2 && (
              <AnalyticsCard title="Head-to-Head Record" color="yellow">
                <div className="flex items-center justify-center py-6">
                  <div className="text-center px-8">
                    <div className="text-xl font-bold mb-2">
                      {
                        teamData.find((t) => t.id === selectedTeams[0])
                          ?.shortName
                      }
                    </div>
                  </div>

                  <div className="text-4xl font-black px-6">VS</div>

                  <div className="text-center px-8">
                    <div className="text-xl font-bold mb-2">
                      {
                        teamData.find((t) => t.id === selectedTeams[1])
                          ?.shortName
                      }
                    </div>
                  </div>
                </div>
              </AnalyticsCard>
            )}
          </div>
        )}
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Team Strengths Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnalyticsCard title="Highest Powerplay Run Rates " color="blue">
            <div className="space-y-4 pt-2">
              {rrSortedTeams.slice(0, 5).map((team, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className="w-2 h-10 mr-3"
                      style={{ backgroundColor: team.color }}
                    ></div>
                    <span className="font-bold">{team.shortName}</span>
                  </div>
                  <span>{team.rr.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Most Consistent Teams" color="green">
            <div className="space-y-4 pt-2">
              {[...sortedTeams]
                .sort((a, b) => {
                  const aWins = a.lastFive.filter((r) => r === "W").length;
                  const bWins = b.lastFive.filter((r) => r === "W").length;
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
    </MainLayout>
  );
};

export default TeamAnalysis;
