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
  LineChart,
  Line,
} from "recharts";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import MainLayout from "@/layouts/MainLayout";
import { DataTable } from "@/components/DataTable";

const venueData = [
  {
    id: 1,
    name: "MA Chidambaram Stadium",
    city: "Chennai",
    matchesPlayed: 9,
    avgFirstInnings: 182,
    avgSecondInnings: 159,
    highestScore: 235,
    lowestScore: 113,
    chaseSuccessRate: 44.4,
    avgFours: 24.3,
    avgSixes: 12.1,
    winBattingFirst: 5,
    winBattingSecond: 4,
  },
  {
    id: 2,
    name: "Wankhede Stadium",
    city: "Mumbai",
    matchesPlayed: 7,
    avgFirstInnings: 183,
    avgSecondInnings: 175,
    highestScore: 234,
    lowestScore: 125,
    chaseSuccessRate: 57.1,
    avgFours: 26.7,
    avgSixes: 14.2,
    winBattingFirst: 3,
    winBattingSecond: 4,
  },
  {
    id: 3,
    name: "Eden Gardens",
    city: "Kolkata",
    matchesPlayed: 7,
    avgFirstInnings: 202,
    avgSecondInnings: 157,
    highestScore: 272,
    lowestScore: 137,
    chaseSuccessRate: 42.9,
    avgFours: 23.1,
    avgSixes: 13.4,
    winBattingFirst: 4,
    winBattingSecond: 3,
  },
  {
    id: 4,
    name: "Arun Jaitley Stadium",
    city: "Delhi",
    matchesPlayed: 4,
    avgFirstInnings: 223,
    avgSecondInnings: 196,
    highestScore: 257,
    lowestScore: 153,
    chaseSuccessRate: 50.0,
    avgFours: 25.8,
    avgSixes: 15.6,
    winBattingFirst: 2,
    winBattingSecond: 2,
  },
  {
    id: 5,
    name: "M.Chinnaswamy Stadium",
    city: "Bengaluru",
    matchesPlayed: 7,
    avgFirstInnings: 193,
    avgSecondInnings: 183,
    highestScore: 287,
    lowestScore: 147,
    chaseSuccessRate: 57.1,
    avgFours: 27.2,
    avgSixes: 18.4,
    winBattingFirst: 3,
    winBattingSecond: 4,
  },
  {
    id: 6,
    name: "Narendra Modi Stadium",
    city: "Ahmedabad",
    matchesPlayed: 8,
    avgFirstInnings: 171,
    avgSecondInnings: 148,
    highestScore: 231,
    lowestScore: 89,
    chaseSuccessRate: 50.0,
    avgFours: 22.5,
    avgSixes: 10.8,
    winBattingFirst: 4,
    winBattingSecond: 4,
  },
  {
    id: 7,
    name: "Maharaja Yadavindra Singh International Cricket Stadium, Mullanpur",
    city: "Chandigarh",
    matchesPlayed: 5,
    avgFirstInnings: 171,
    avgSecondInnings: 171,
    highestScore: 214,
    lowestScore: 147,
    chaseSuccessRate: 80.0,
    avgFours: 25.0,
    avgSixes: 14.5,
    winBattingFirst: 1,
    winBattingSecond: 4,
  },
  {
    id: 8,
    name: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    matchesPlayed: 7,
    avgFirstInnings: 202,
    avgSecondInnings: 173,
    highestScore: 287,
    lowestScore: 113,
    chaseSuccessRate: 57.1,
    avgFours: 24.2,
    avgSixes: 13.7,
    winBattingFirst: 3,
    winBattingSecond: 4,
  },
  {
    id: 9,
    name: "Sawai Mansingh Stadium",
    city: "Jaipur",
    matchesPlayed: 6,
    avgFirstInnings: 183,
    avgSecondInnings: 179,
    highestScore: 224,
    lowestScore: 141,
    chaseSuccessRate: 33.3,
    avgFours: 22.0,
    avgSixes: 11.0,
    winBattingFirst: 4,
    winBattingSecond: 2,
  },
  {
    id: 10,
    name: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium",
    city: "Lucknow",
    matchesPlayed: 7,
    avgFirstInnings: 179,
    avgSecondInnings: 155,
    highestScore: 235,
    lowestScore: 137,
    chaseSuccessRate: 42.9,
    avgFours: 21.0,
    avgSixes: 10.5,
    winBattingFirst: 4,
    winBattingSecond: 3,
  },
  {
    id: 11,
    name: "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium",
    city: "Visakhapatnam",
    matchesPlayed: 2,
    avgFirstInnings: 206,
    avgSecondInnings: 169,
    highestScore: 272,
    lowestScore: 171,
    chaseSuccessRate: 50.0,
    avgFours: 23.5,
    avgSixes: 12.0,
    winBattingFirst: 1,
    winBattingSecond: 1,
  },
  {
    id: 12,
    name: "Himachal Pradesh Cricket Association Stadium",
    city: "Dharamsala",
    matchesPlayed: 2,
    avgFirstInnings: 204,
    avgSecondInnings: 160,
    highestScore: 241,
    lowestScore: 167,
    chaseSuccessRate: 50.0,
    avgFours: 24.0,
    avgSixes: 13.0,
    winBattingFirst: 1,
    winBattingSecond: 1,
  },
  {
    id: 13,
    name: "Barsapara Cricket Stadium",
    city: "Guwahati",
    matchesPlayed: 1,
    avgFirstInnings: 144,
    avgSecondInnings: 145,
    highestScore: 144,
    lowestScore: 144,
    chaseSuccessRate: 100.0,
    avgFours: 20.0,
    avgSixes: 10.0,
    winBattingFirst: 0,
    winBattingSecond: 1,
  },
];

const scoresPerMatchDay = [
  { matchDay: 1, avgScore: 174 },
  { matchDay: 5, avgScore: 182 },
  { matchDay: 10, avgScore: 189 },
  { matchDay: 15, avgScore: 178 },
  { matchDay: 20, avgScore: 186 },
  { matchDay: 25, avgScore: 193 },
  { matchDay: 30, avgScore: 188 },
  { matchDay: 35, avgScore: 183 },
  { matchDay: 40, avgScore: 175 },
  { matchDay: 45, avgScore: 179 },
  { matchDay: 50, avgScore: 191 },
  { matchDay: 55, avgScore: 187 },
  { matchDay: 60, avgScore: 196 },
  { matchDay: 65, avgScore: 181 },
  { matchDay: 70, avgScore: 184 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#FF6B6B",
  "#6B66FF",
  "#FFD700",
];

const VenuesPage: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null);

  const handleVenueSelect = (venueId: number) => {
    setSelectedVenue(venueId === selectedVenue ? null : venueId);
  };

  const selectedVenueData = venueData.find(
    (venue) => venue.id === selectedVenue
  );

  const tossFactorData = [
    {
      name: "Bat First Wins",
      value: venueData.reduce((sum, venue) => sum + venue.winBattingFirst, 0),
    },
    {
      name: "Bat Second Wins",
      value: venueData.reduce((sum, venue) => sum + venue.winBattingSecond, 0),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-black tracking-tight">
          IPL 2024 Venue Analysis
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard title="Total Matches" color="yellow">
            <div className="text-5xl font-black text-center py-4">
              {venueData.reduce((sum, venue) => sum + venue.matchesPlayed, 0)}
            </div>
            <div className="text-center text-gray-600">
              Matches played across all venues
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Highest Score" color="red">
            <div className="text-5xl font-black text-center py-4">
              {Math.max(...venueData.map((venue) => venue.highestScore))}
            </div>
            <div className="text-center text-gray-600">
              {
                venueData.find(
                  (venue) =>
                    venue.highestScore ===
                    Math.max(...venueData.map((v) => v.highestScore))
                )?.name
              }
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Chase Success Rate" color="green">
            <div className="text-5xl font-black text-center py-4">
              {(
                venueData.reduce(
                  (sum, venue) => sum + venue.chaseSuccessRate,
                  0
                ) / venueData.length
              ).toFixed(1)}
              %
            </div>
            <div className="text-center text-gray-600">
              Average across all venues
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Avg. Sixes per Match" color="blue">
            <div className="text-5xl font-black text-center py-4">
              {(
                venueData.reduce((sum, venue) => sum + venue.avgSixes, 0) /
                venueData.length
              ).toFixed(1)}
            </div>
            <div className="text-center text-gray-600">
              Tournament-wide average
            </div>
          </AnalyticsCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalyticsCard
            title="Toss Impact on Wins"
            color="purple"
            className="lg:col-span-1"
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tossFactorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tossFactorData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
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
            title="Average Score Trends Throughout the Tournament"
            color="blue"
            className="lg:col-span-2"
            rotate
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={scoresPerMatchDay}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="matchDay" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Average Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsCard>
        </div>

        <AnalyticsCard title="Venue Statistics" color="white">
          <DataTable
            data={venueData}
            columns={[
              { key: "name", header: "Venue", sortable: true },
              { key: "city", header: "City", sortable: true },
              { key: "matchesPlayed", header: "Matches", sortable: true },
              {
                key: "avgFirstInnings",
                header: "Avg. 1st Inns",
                sortable: true,
              },
              {
                key: "avgSecondInnings",
                header: "Avg. 2nd Inns",
                sortable: true,
              },
              { key: "highestScore", header: "Highest", sortable: true },
              {
                key: "chaseSuccessRate",
                header: "Chase %",
                sortable: true,
                render: (item) => `${item.chaseSuccessRate}%`,
              },
              { key: "avgSixes", header: "Avg. Sixes", sortable: true },
            ]}
            onRowClick={(venue) => handleVenueSelect(venue.id)}
            className="w-full overflow-x-auto"
          />
        </AnalyticsCard>

        {selectedVenueData && (
          <AnalyticsCard
            title={`${selectedVenueData.name} - Detailed Analysis`}
            color="yellow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "1st Innings",
                        value: selectedVenueData.avgFirstInnings,
                      },
                      {
                        name: "2nd Innings",
                        value: selectedVenueData.avgSecondInnings,
                      },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, "auto"]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Average Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Bat First Wins",
                          value: selectedVenueData.winBattingFirst,
                        },
                        {
                          name: "Bat Second Wins",
                          value: selectedVenueData.winBattingSecond,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#0088FE" />
                      <Cell fill="#00C49F" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat-box bg-neo-cream p-4 rounded-md">
                <div className="text-sm text-gray-600">Matches Played</div>
                <div className="text-2xl font-bold">
                  {selectedVenueData.matchesPlayed}
                </div>
              </div>
              <div className="stat-box bg-neo-cream p-4 rounded-md">
                <div className="text-sm text-gray-600">Highest Score</div>
                <div className="text-2xl font-bold">
                  {selectedVenueData.highestScore}
                </div>
              </div>
              <div className="stat-box bg-neo-cream p-4 rounded-md">
                <div className="text-sm text-gray-600">Lowest Score</div>
                <div className="text-2xl font-bold">
                  {selectedVenueData.lowestScore}
                </div>
              </div>
              <div className="stat-box bg-neo-cream p-4 rounded-md">
                <div className="text-sm text-gray-600">Avg. Fours</div>
                <div className="text-2xl font-bold">
                  {selectedVenueData.avgFours}
                </div>
              </div>
            </div>
          </AnalyticsCard>
        )}
      </div>
    </MainLayout>
  );
};

export default VenuesPage;
