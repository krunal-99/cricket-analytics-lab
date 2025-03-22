import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import { MatchCard } from "@/components/MatchCard";
import { DataTable } from "@/components/DataTable";
import MatchScorecard from "@/components/MatchScorecard";
import matches from "@/utils/matches.ts";
import scoreCard from "@/utils/scorecard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface BatsmanData {
  batName: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  outDesc?: string;
}

interface BowlerData {
  bowlName: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

interface ExtrasData {
  wides: number;
  noBalls: number;
  byes: number;
  legByes: number;
  penalty: number;
  total: number;
}

interface InningsData {
  inningsId: number;
  inningsName: string;
  runs: number;
  wickets: number;
  overs: number;
  batTeamName: string;
  bowlTeamName: string;
  batTeamDetails: { batsmenData: Record<string, BatsmanData> };
  bowlTeamDetails: { bowlersData: Record<string, BowlerData> };
  extrasData: ExtrasData;
}

interface MatchData {
  matchDesc: string;
  team1Name: string;
  team2Name: string;
  team1Score: string;
  team2Score: string;
  ground: string;
  totalFours: number;
  totalSixes: number;
  status: string;
  matchId: number;
  startDate: string;
  scorecard?: InningsData[];
}

const batsmenStats = [
  {
    name: "Virat Kohli",
    team: "RCB",
    runs: 741,
    avg: 61.5,
    sr: 154.69,
    hs: 113,
  },
  {
    name: "Ruturaj Gaikwad",
    team: "CSK",
    runs: 583,
    avg: 53.0,
    sr: 141.16,
    hs: 108,
  },
  {
    name: "Riyan Parag",
    team: "RR",
    runs: 573,
    avg: 52.09,
    sr: 149.21,
    hs: 84,
  },
  {
    name: "Travis Head",
    team: "SRH",
    runs: 567,
    avg: 40.5,
    sr: 191.55,
    hs: 102,
  },
  {
    name: "Sanju Samson",
    team: "RR",
    runs: 531,
    avg: 48.27,
    sr: 153.46,
    hs: 86,
  },
  {
    name: "Sai Sudarshan",
    team: "GT",
    runs: 527,
    avg: 47.91,
    sr: 141.28,
    hs: 103,
  },
  {
    name: "K L Rahul",
    team: "LSG",
    runs: 520,
    avg: 37.14,
    sr: 136.12,
    hs: 82,
  },
];

const bowlerStats = [
  {
    name: "Harshal Patel",
    team: "PBKS",
    wickets: 24,
    mat: 14,
    eco: 9.73,
    best: "15/3",
  },
  {
    name: "Varun Chakravarthy",
    team: "KKR",
    wickets: 21,
    mat: 15,
    eco: 8.04,
    best: "16/3",
  },
  {
    name: "Jasprit Bumrah",
    team: "MI",
    wickets: 20,
    mat: 13,
    eco: 6.48,
    best: "21/5",
  },
  {
    name: "T Natrajan",
    team: "SRH",
    wickets: 19,
    mat: 14,
    eco: 9.05,
    best: "19/4",
  },
  {
    name: "Harshit Rana",
    team: "KKR",
    wickets: 19,
    mat: 13,
    eco: 9.08,
    best: "24/3",
  },
  {
    name: "Avesh Khan",
    team: "RR",
    wickets: 19,
    mat: 16,
    eco: 9.59,
    best: "27/3",
  },
  {
    name: "Arshdeep Singh",
    team: "PBKS",
    wickets: 19,
    mat: 14,
    eco: 10.03,
    best: "29/4",
  },
];

function transformMatchData(
  matchesData: any[],
  scoreCardData: any[]
): MatchData[] {
  const matchesMap = new Map<number, any>();
  matchesData.forEach((item) => {
    if (item?.matchDetailsMap?.match) {
      item.matchDetailsMap.match.forEach((match: any) => {
        const matchInfo = match?.matchInfo || {};
        const matchScore = match?.matchScore || {};
        const matchId = matchInfo.matchId || Date.now();

        const team1ScoreData = matchScore.team1Score?.inngs1 || {};
        const team2ScoreData = matchScore.team2Score?.inngs1 || {};

        matchesMap.set(matchId, {
          matchDesc: matchInfo.matchDesc || "N/A",
          team1Name: matchInfo.team1?.teamSName || "Unknown Team 1",
          team2Name: matchInfo.team2?.teamSName || "Unknown Team 2",
          team1Score:
            team1ScoreData.runs !== undefined &&
            team1ScoreData.wickets !== undefined
              ? `${team1ScoreData.runs}/${team1ScoreData.wickets}`
              : "N/A",
          team2Score:
            team2ScoreData.runs !== undefined &&
            team2ScoreData.wickets !== undefined
              ? `${team2ScoreData.runs}/${team2ScoreData.wickets}`
              : "N/A",
          ground: matchInfo.venueInfo?.ground || "Unknown Venue",
          totalFours: 0,
          totalSixes: 0,
          status: matchInfo.status || "Status Unknown",
          matchId: matchId,
          startDate: matchInfo.startDate || "0",
        });
      });
    }
  });

  scoreCardData.forEach((item) => {
    if (item?.scoreCard) {
      item.scoreCard.forEach((inning: any) => {
        const matchId = inning?.matchId;
        const match = matchesMap.get(matchId);
        if (match) {
          let inningsFours = 0;
          let inningsSixes = 0;
          const batsmenData = inning?.batTeamDetails?.batsmenData || {};

          Object.values(batsmenData).forEach((batsman: any) => {
            inningsFours += Number(batsman?.fours || 0);
            inningsSixes += Number(batsman?.sixes || 0);
          });

          match.totalFours += inningsFours;
          match.totalSixes += inningsSixes;
        }
      });
    }
  });

  return Array.from(matchesMap.values());
}

function transformScorecardData(
  rawScorecard: any[],
  matchId: number
): InningsData[] {
  return rawScorecard.flatMap((item) =>
    item.scoreCard
      .filter((inning: any) => inning.matchId === matchId)
      .map((inning: any, index: number) => ({
        inningsId: inning.inningsId,
        inningsName: `${index + 1}${index === 0 ? "st" : "nd"} Innings`,
        runs: inning.scoreDetails.runs,
        wickets: inning.scoreDetails.wickets,
        overs: inning.scoreDetails.overs,
        batTeamName:
          inning.batTeamDetails.batTeamShortName ||
          inning.batTeamDetails.batTeamName,
        bowlTeamName:
          inning.bowlTeamDetails.bowlTeamShortName ||
          inning.bowlTeamDetails.bowlTeamName,
        batTeamDetails: {
          batsmenData: Object.fromEntries(
            Object.entries(inning.batTeamDetails.batsmenData).map(
              ([key, batsman]: [string, any]) => [
                key,
                {
                  batName: batsman.batName,
                  runs: batsman.runs,
                  balls: batsman.balls,
                  fours: batsman.fours,
                  sixes: batsman.sixes,
                  strikeRate: batsman.strikeRate,
                  outDesc:
                    batsman.outDesc ||
                    (batsman.wicketCode
                      ? batsman.wicketCode.toLowerCase()
                      : "not out"),
                },
              ]
            )
          ),
        },
        bowlTeamDetails: {
          bowlersData: Object.fromEntries(
            Object.entries(inning.bowlTeamDetails.bowlersData).map(
              ([key, bowler]: [string, any]) => [
                key,
                {
                  bowlName: bowler.bowlName,
                  overs: bowler.overs,
                  maidens: bowler.maidens,
                  runs: bowler.runs,
                  wickets: bowler.wickets,
                  economy: bowler.economy,
                },
              ]
            )
          ),
        },
        extrasData: {
          wides: inning.extrasData.wides,
          noBalls: inning.extrasData.noBalls,
          byes: inning.extrasData.byes,
          legByes: inning.extrasData.legByes,
          penalty: inning.extrasData.penalty,
          total: inning.extrasData.total,
        },
      }))
  );
}

const Index = () => {
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [selectedGround, setSelectedGround] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const transformedMatches = transformMatchData(matches, scoreCard);
  const uniqueGroundsFromData = Array.from(
    new Set(transformedMatches.map((match) => match.ground))
  );
  const filteredMatches = selectedGround
    ? transformedMatches.filter((match) => match.ground === selectedGround)
    : transformedMatches;

  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const indexOfLastMatch = currentPage * itemsPerPage;
  const indexOfFirstMatch = indexOfLastMatch - itemsPerPage;
  const currentMatches = filteredMatches.slice(
    indexOfFirstMatch,
    indexOfLastMatch
  );

  const handleRowClick = (match: MatchData) => {
    const matchScorecard = transformScorecardData(scoreCard, match.matchId);
    setSelectedMatch({ ...match, scorecard: matchScorecard });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(
        (number) => (
          <PaginationItem key={number}>
            <PaginationLink
              onClick={() => handlePageChange(number)}
              isActive={currentPage === number}
              className={
                currentPage === number
                  ? "neo-button-yellow cursor-pointer font-bold"
                  : "neo-button cursor-pointer"
              }
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        )
      );
    }

    const items = [];
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
          className={
            currentPage === 1
              ? "neo-button-yellow cursor-pointer font-bold"
              : "neo-button cursor-pointer"
          }
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis className="neo-button cursor-default" />
        </PaginationItem>
      );
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            className={
              currentPage === i
                ? "neo-button-yellow cursor-pointer font-bold"
                : "neo-button cursor-pointer"
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis className="neo-button cursor-default" />
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink
          onClick={() => handlePageChange(totalPages)}
          isActive={currentPage === totalPages}
          className={
            currentPage === totalPages
              ? "neo-button-yellow cursor-pointer font-bold"
              : "neo-button cursor-pointer"
          }
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );

    return items;
  };

  return (
    <MainLayout>
      <section className="mb-10">
        <h2 className="text-3xl font-black tracking-tight mb-6">
          IPL 2024 Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard title="Total Matches" color="yellow">
            <div className="text-5xl font-black text-center py-6">
              {transformedMatches.length}
            </div>
          </AnalyticsCard>
          <AnalyticsCard title="Total Boundaries" color="blue">
            <div className="text-5xl font-black text-center py-6">3413</div>
          </AnalyticsCard>
          <AnalyticsCard title="Avg. Fours/Match" color="red">
            <div className="text-5xl font-black text-center py-6">30.5</div>
          </AnalyticsCard>
          <AnalyticsCard title="Avg. Sixes/Match" color="green">
            <div className="text-5xl font-black text-center py-6">17.5</div>
          </AnalyticsCard>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-6 text-center">
          All Matches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentMatches.map((match, index) => (
            <MatchCard
              key={match.matchId}
              {...match}
              featured={index === 0 && currentPage === 1}
              onClick={() => handleRowClick(match)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent className="flex flex-wrap justify-center gap-2">
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="neo-button cursor-pointer"
                    />
                  </PaginationItem>
                )}
                {getPaginationItems()}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="neo-button cursor-pointer"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>

      <section className="mb-10">
        <AnalyticsCard title="Top Batters" color="white">
          <div className="overflow-x-auto">
            <table className="neo-table w-full">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Runs</th>
                  <th>Avg</th>
                  <th>SR</th>
                  <th>Best</th>
                </tr>
              </thead>
              <tbody>
                {batsmenStats.map((player, index) => (
                  <tr key={index}>
                    <td className="font-bold">{player.name}</td>
                    <td>{player.team}</td>
                    <td>{player.runs}</td>
                    <td>{player.avg}</td>
                    <td>{player.sr}</td>
                    <td>{player.hs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnalyticsCard>
      </section>
      <section className="mb-10">
        <AnalyticsCard title="Top Bowlers" color="white">
          <div className="overflow-x-auto">
            <table className="neo-table w-full">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Runs/Wickets</th>
                  <th>Avg/Econ</th>
                  <th>SR/Avg</th>
                  <th>Best</th>
                </tr>
              </thead>
              <tbody>
                {bowlerStats.map((player, index) => (
                  <tr key={index}>
                    <td className="font-bold">{player.name}</td>
                    <td>{player.team}</td>
                    <td>{player.wickets}</td>
                    <td>{player.mat}</td>
                    <td>{player.eco}</td>
                    <td>{player.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnalyticsCard>
      </section>

      <section>
        <AnalyticsCard title="All Matches" color="white">
          <div style={{ marginBottom: "20px" }}>
            <select
              value={selectedGround || ""}
              onChange={(e) => {
                setSelectedGround(e.target.value || null);
                setCurrentPage(1);
              }}
              style={{
                padding: "10px 15px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#fff",
                color: "#000",
                border: "4px solid #000",
                borderRadius: "0",
                boxShadow: "6px 6px 0px #000",
                outline: "none",
                cursor: "pointer",
                transition: "box-shadow 0.2s ease",
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.boxShadow = "3px 3px 0px #000")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.boxShadow = "6px 6px 0px #000")
              }
            >
              <option value="">All Grounds</option>
              {uniqueGroundsFromData.map((ground) => (
                <option key={ground} value={ground}>
                  {ground}
                </option>
              ))}
            </select>
          </div>
          <DataTable
            data={filteredMatches}
            columns={[
              {
                key: "matchDesc",
                header: "Match",
                sortable: true,
                render: (item) => `${item.matchDesc}`,
              },
              {
                key: "team1Name",
                header: "Team 1",
                sortable: true,
                render: (item) => item.team1Name.toUpperCase(),
              },
              {
                key: "team2Name",
                header: "Team 2",
                sortable: true,
                render: (item) => item.team2Name.toUpperCase(),
              },
              {
                key: "team1Score",
                header: "Score 1",
                sortable: true,
                render: (item) => item.team1Score || "N/A",
              },
              {
                key: "team2Score",
                header: "Score 2",
                sortable: true,
                render: (item) => item.team2Score || "N/A",
              },
              {
                key: "totalFours",
                header: "4s",
                sortable: true,
                render: (item) => item.totalFours || "N/A",
              },
              {
                key: "totalSixes",
                header: "6s",
                sortable: true,
                render: (item) => item.totalSixes || "N/A",
              },
              {
                key: "ground",
                header: "Ground",
                sortable: true,
                render: (item) => item.ground || "N/A",
              },
              {
                key: "startDate",
                header: "Date",
                sortable: true,
                render: (item) =>
                  item.startDate !== "0"
                    ? new Date(parseInt(item.startDate)).toLocaleDateString()
                    : "N/A",
              },
            ]}
            onRowClick={handleRowClick}
          />
        </AnalyticsCard>
      </section>

      {selectedMatch && (
        <MatchScorecard
          matchData={selectedMatch}
          scorecard={selectedMatch.scorecard || []}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </MainLayout>
  );
};

export default Index;
