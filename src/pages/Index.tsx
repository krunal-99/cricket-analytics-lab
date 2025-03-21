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
  batTeamDetails: {
    batsmenData: Record<string, BatsmanData>;
  };
  bowlTeamDetails: {
    bowlersData: Record<string, BowlerData>;
  };
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

const playerStats = [
  {
    name: "Virat Kohli",
    team: "RCB",
    runs: 500,
    avg: 62.5,
    sr: 150.2,
    hs: 113,
  },
  {
    name: "Jasprit Bumrah",
    team: "MI",
    wickets: 20,
    economy: 6.4,
    avg: 15.2,
    best: "4/20",
  },
  {
    name: "Jos Buttler",
    team: "RR",
    runs: 470,
    avg: 58.75,
    sr: 155.3,
    hs: 107,
  },
  {
    name: "Ravindra Jadeja",
    team: "CSK",
    wickets: 15,
    economy: 7.2,
    avg: 18.4,
    best: "3/18",
  },
  { name: "KL Rahul", team: "LSG", runs: 445, avg: 55.63, sr: 145.1, hs: 95 },
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

  const transformedMatches = transformMatchData(matches, scoreCard);
  const uniqueGroundsFromData = Array.from(
    new Set(transformedMatches.map((match) => match.ground))
  );
  const filteredMatches = selectedGround
    ? transformedMatches.filter((match) => match.ground === selectedGround)
    : transformedMatches;

  const handleRowClick = (match: MatchData) => {
    const matchScorecard = transformScorecardData(scoreCard, match.matchId);
    setSelectedMatch({ ...match, scorecard: matchScorecard });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate total pages
  const totalPages = Math.ceil(matches.length / itemsPerPage);

  // Get current page matches
  const indexOfLastMatch = currentPage * itemsPerPage;
  const indexOfFirstMatch = indexOfLastMatch - itemsPerPage;
  const currentMatches = transformedMatches.slice(
    indexOfFirstMatch,
    indexOfLastMatch
  );

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  const getPaginationItems = () => {
    // For small number of pages, show all
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

    // For large number of pages, use ellipsis
    const items = [];

    // Always show first page
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

    // Add ellipsis if not showing second page
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis className="neo-button cursor-default" />
        </PaginationItem>
      );
    }

    // Add pages around current page
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

    // Add ellipsis if not showing second-to-last page
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis className="neo-button cursor-default" />
        </PaginationItem>
      );
    }

    // Always show last page
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
            <div className="text-5xl font-black text-center py-6">70</div>
            <div className="text-center">Scheduled Matches</div>
          </AnalyticsCard>
          <AnalyticsCard title="Matches Completed" color="blue">
            <div className="text-5xl font-black text-center py-6">32</div>
            <div className="text-center">45.7% Complete</div>
          </AnalyticsCard>
          <AnalyticsCard title="Run Rate" color="red">
            <div className="text-5xl font-black text-center py-6">9.2</div>
            <div className="text-center">Runs per Over</div>
          </AnalyticsCard>
          <AnalyticsCard title="Boundaries" color="green">
            <div className="text-5xl font-black text-center py-6">1245</div>
            <div className="text-center">Fours + Sixes</div>
          </AnalyticsCard>
        </div>
      </section>

      {/* <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-6">
          Recent Matches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentMatches.map((match, index) => (
            <MatchCard
              key={index}
              {...match}
              featured={index === 0 && currentPage === 1}
            />
          ))}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="neo-button cursor-pointer"
                      />
                    </PaginationItem>
                  )}

                  {pageNumbers.map((number) => (
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
                  ))}

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
        </div>
      </section> */}

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-6 text-center">
          Recent Matches
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentMatches.map((match, index) => (
            <MatchCard
              key={index}
              {...match}
              featured={index === 0 && currentPage === 1}
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
        <AnalyticsCard title="Top Performers" color="white">
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
                {playerStats.map((player, index) => (
                  <tr key={index}>
                    <td className="font-bold">{player.name}</td>
                    <td>{player.team}</td>
                    <td>{player.runs || player.wickets}</td>
                    <td>{player.avg || player.economy}</td>
                    <td>{player.sr || player.avg}</td>
                    <td>{player.hs || player.best}</td>
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
              onChange={(e) => setSelectedGround(e.target.value || null)}
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
