import React from "react";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import {
  X,
  TrendingUp,
  Award,
  Circle,
  Clock,
  Flag,
  MapPin,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface MatchScorecardProps {
  matchData: {
    matchDesc: string;
    team1Name: string;
    team2Name: string;
    team1Score: string;
    team2Score: string;
    ground: string;
    matchId: number;
  };
  scorecard: InningsData[];
  onClose: () => void;
}

// export const MatchScorecard: React.FC<MatchScorecardProps> = ({
//   matchData,
//   scorecard,
//   onClose,
// }) => {
//   if (!scorecard || scorecard.length === 0) {
//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//         <div className="neo-card bg-white p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-animation">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="neo-header">Match Scorecard</h2>
//             <button
//               onClick={onClose}
//               className="neo-btn p-2 rounded-full hover:bg-gray-100"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//           <p className="text-center py-10">Scorecard data not available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="neo-card bg-white p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-animation">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="neo-header">{matchData.matchDesc}</h2>
//           <button
//             onClick={onClose}
//             className="neo-btn p-2 rounded-full"
//             aria-label="Close scorecard"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="mb-4 p-3 bg-neo-cream rounded-md flex justify-between items-center">
//           <div>
//             <span className="font-bold">{matchData.team1Name}</span>
//             <span className="mx-2 text-xl font-bold bg-neo-blue text-white px-3 py-1 rounded-md">
//               {matchData.team1Score}
//             </span>
//           </div>
//           <span className="text-lg font-bold bg-neo-black text-white px-3 py-1 rounded-full">
//             vs
//           </span>
//           <div>
//             <span className="mx-2 text-xl font-bold bg-neo-yellow text-neo-black px-3 py-1 rounded-md">
//               {matchData.team2Score}
//             </span>
//             <span className="font-bold">{matchData.team2Name}</span>
//           </div>
//         </div>

//         <div className="flex items-center text-sm text-gray-600 mb-6 p-3 border-2 border-dashed border-neo-gray rounded-md">
//           <MapPin className="h-4 w-4 mr-2" />
//           <span>Venue: {matchData.ground}</span>
//         </div>

//         {scorecard.map((innings, index) => (
//           <AnalyticsCard
//             key={innings.inningsId}
//             title={`${innings.inningsName} - ${innings.batTeamName} ${innings.runs}/${innings.wickets} (${innings.overs} overs)`}
//             color={index === 0 ? "blue" : "yellow"}
//             className="mb-6"
//           >
//             <div className="space-y-6">
//               <div>
//                 <div className="flex items-center mb-4">
//                   <TrendingUp className="h-5 w-5 mr-2 text-neo-blue" />
//                   <h3 className="font-bold text-lg text-neo-black">Batting</h3>
//                 </div>

//                 <div className="neo-table">
//                   <Table>
//                     <TableHeader className="neo-table-header">
//                       <TableRow>
//                         <TableHead className="text-white">Batter</TableHead>
//                         <TableHead className="text-white text-right">
//                           Runs
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           Balls
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           4s
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           6s
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           SR
//                         </TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {innings.batTeamDetails.batsmenData &&
//                         Object.values(innings.batTeamDetails.batsmenData)
//                           .sort((a, b) => {
//                             if (!a.outDesc && b.outDesc) return 1;
//                             if (a.outDesc && !b.outDesc) return -1;
//                             return 0;
//                           })
//                           .map((batsman, idx) => (
//                             <TableRow
//                               key={idx}
//                               className={
//                                 idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }
//                             >
//                               <TableCell className="border-r border-gray-200">
//                                 <div className="font-medium text-neo-black">
//                                   {batsman.batName}
//                                 </div>
//                                 <div className="text-xs text-gray-500 mt-1">
//                                   {batsman.outDesc ? (
//                                     <span className="text-neo-red">
//                                       {batsman.outDesc}
//                                     </span>
//                                   ) : (
//                                     <span className="text-neo-green flex items-center">
//                                       <Circle className="h-2 w-2 mr-1 fill-neo-green" />{" "}
//                                       not out
//                                     </span>
//                                   )}
//                                 </div>
//                               </TableCell>
//                               <TableCell className="text-right font-bold text-lg text-neo-black">
//                                 {batsman.runs}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {batsman.balls}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {batsman.fours}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {batsman.sixes}
//                               </TableCell>
//                               <TableCell className="text-right font-medium text-neo-black">
//                                 {batsman.strikeRate.toFixed(2)}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>

//               <div className="extras-card">
//                 <div className="font-bold flex items-center text-neo-black">
//                   <Flag className="h-4 w-4 mr-2" />
//                   Extras: {innings.extrasData.total}
//                 </div>
//                 <div className="text-sm mt-1 grid grid-cols-4 gap-2">
//                   <div className="bg-white p-2 rounded border border-gray-200">
//                     <span className="tag-blue">WD</span>{" "}
//                     <span className="text-neo-black">
//                       {innings.extrasData.wides || 0}
//                     </span>
//                   </div>
//                   <div className="bg-white p-2 rounded border border-gray-200">
//                     <span className="tag-yellow">NB</span>{" "}
//                     <span className="text-neo-black">
//                       {innings.extrasData.noBalls || 0}
//                     </span>
//                   </div>
//                   <div className="bg-white p-2 rounded border border-gray-200">
//                     <span className="tag-blue">B</span>{" "}
//                     <span className="text-neo-black">
//                       {innings.extrasData.byes || 0}
//                     </span>
//                   </div>
//                   <div className="bg-white p-2 rounded border border-gray-200">
//                     <span className="tag-yellow">LB</span>{" "}
//                     <span className="text-neo-black">
//                       {innings.extrasData.legByes || 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex items-center mb-4">
//                   <Award className="h-5 w-5 mr-2 text-neo-yellow" />
//                   <h3 className="font-bold text-lg text-neo-black">Bowling</h3>
//                 </div>

//                 <div className="neo-table">
//                   <Table>
//                     <TableHeader className="neo-table-header">
//                       <TableRow>
//                         <TableHead className="text-white">Bowler</TableHead>
//                         <TableHead className="text-white text-right">
//                           O
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           M
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           R
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           W
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           Econ
//                         </TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {innings.bowlTeamDetails.bowlersData &&
//                         Object.values(innings.bowlTeamDetails.bowlersData)
//                           .sort(
//                             (a, b) =>
//                               b.wickets - a.wickets || a.economy - b.economy
//                           )
//                           .map((bowler, idx) => (
//                             <TableRow
//                               key={idx}
//                               className={
//                                 idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }
//                             >
//                               <TableCell className="font-medium border-r border-gray-200 text-neo-black">
//                                 {bowler.bowlName}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 <div className="flex items-center justify-end">
//                                   <Clock className="h-3 w-3 mr-1 opacity-50" />
//                                   {bowler.overs}
//                                 </div>
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {bowler.maidens}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {bowler.runs}
//                               </TableCell>
//                               <TableCell className="text-right font-bold text-lg">
//                                 <span
//                                   className={`${
//                                     bowler.wickets >= 3
//                                       ? "text-neo-red"
//                                       : "text-neo-black"
//                                   }`}
//                                 >
//                                   {bowler.wickets}
//                                 </span>
//                               </TableCell>
//                               <TableCell className="text-right font-medium">
//                                 <span
//                                   className={
//                                     bowler.economy <= 6
//                                       ? "text-neo-green"
//                                       : bowler.economy >= 10
//                                       ? "text-neo-red"
//                                       : "text-neo-black"
//                                   }
//                                 >
//                                   {bowler.economy.toFixed(2)}
//                                 </span>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>
//             </div>
//           </AnalyticsCard>
//         ))}
//       </div>
//     </div>
//   );
// };
// export const MatchScorecard: React.FC<MatchScorecardProps> = ({
//   matchData,
//   scorecard,
//   onClose,
// }) => {
//   if (!scorecard || scorecard.length === 0) {
//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//         <div className="neo-card bg-white p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-animation">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="neo-header">Match Scorecard</h2>
//             <button
//               onClick={onClose}
//               className="neo-btn p-2 rounded-full hover:bg-gray-100"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//           <p className="text-center py-10">Scorecard data not available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="neo-card bg-white p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-animation">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="neo-header">{matchData.matchDesc}</h2>
//           <button
//             onClick={onClose}
//             className="neo-btn p-2 rounded-full"
//             aria-label="Close scorecard"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="mb-4 p-3 bg-neo-cream rounded-md flex justify-between items-center">
//           <div>
//             <span className="font-bold">{matchData.team1Name}</span>
//             <span className="mx-2 text-xl font-bold bg-neo-blue text-white px-3 py-1 rounded-md">
//               {matchData.team1Score}
//             </span>
//           </div>
//           <span className="text-lg font-bold bg-neo-black text-white px-3 py-1 rounded-full">
//             vs
//           </span>
//           <div>
//             <span className="mx-2 text-xl font-bold bg-neo-yellow text-neo-black px-3 py-1 rounded-md">
//               {matchData.team2Score}
//             </span>
//             <span className="font-bold">{matchData.team2Name}</span>
//           </div>
//         </div>

//         <div className="flex items-center text-sm text-gray-600 mb-6 p-3 border-2 border-dashed border-neo-gray rounded-md">
//           <MapPin className="h-4 w-4 mr-2" />
//           <span>Venue: {matchData.ground}</span>
//         </div>

//         {scorecard.map((innings, index) => (
//           <AnalyticsCard
//             key={innings.inningsId}
//             title={`${innings.inningsName} - ${innings.batTeamName} ${innings.runs}/${innings.wickets} (${innings.overs} overs)`}
//             color={index === 0 ? "blue" : "yellow"}
//             className="mb-6"
//           >
//             <div className="space-y-6">
//               <div>
//                 <div className="flex items-center mb-4">
//                   <TrendingUp className="h-5 w-5 mr-2 text-neo-blue" />
//                   <h3 className="font-bold text-lg text-neo-black">Batting</h3>
//                 </div>

//                 <div className="neo-table">
//                   <Table>
//                     <TableHeader className="neo-table-header">
//                       <TableRow>
//                         <TableHead className="text-white">Batter</TableHead>
//                         <TableHead className="text-white text-right">
//                           Runs
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           Balls
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           4s
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           6s
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           SR
//                         </TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {innings.batTeamDetails.batsmenData &&
//                         Object.values(innings.batTeamDetails.batsmenData)
//                           .sort((a, b) => {
//                             if (!a.outDesc && b.outDesc) return 1;
//                             if (a.outDesc && !b.outDesc) return -1;
//                             return 0;
//                           })
//                           .map((batsman, idx) => (
//                             <TableRow
//                               key={idx}
//                               className={
//                                 idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }
//                             >
//                               <TableCell className="border-r border-gray-200">
//                                 <div className="font-medium text-neo-black">
//                                   {batsman.batName}
//                                 </div>
//                                 <div className="text-xs text-gray-500 mt-1">
//                                   {batsman.outDesc ? (
//                                     <span className="text-neo-red">
//                                       {batsman.outDesc}
//                                     </span>
//                                   ) : (
//                                     <span className="text-neo-green flex items-center">
//                                       <Circle className="h-2 w-2 mr-1 fill-neo-green" />{" "}
//                                       not out
//                                     </span>
//                                   )}
//                                 </div>
//                               </TableCell>
//                               <TableCell className="text-right font-bold text-lg text-neo-black">
//                                 {batsman.runs}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {batsman.balls}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {batsman.fours}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {batsman.sixes}
//                               </TableCell>
//                               <TableCell className="text-right font-medium text-neo-black">
//                                 {batsman.strikeRate.toFixed(2)}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>

//               {/* Updated Extras section with better contrast */}
//               <div className="bg-white border-2 border-neo-black p-3 rounded-md my-4">
//                 <div className="font-bold flex items-center text-neo-black">
//                   <Flag className="h-4 w-4 mr-2" />
//                   Extras: {innings.extrasData.total}
//                 </div>
//                 <div className="text-sm mt-1 grid grid-cols-4 gap-2">
//                   <div className="bg-white p-2 rounded border border-gray-200">
//                     <span className="tag-blue">WD</span>{" "}
//                     <span className="text-neo-black">
//                       {innings.extrasData.wides || 0}
//                     </span>
//                   </div>
//                   <div className="bg-white p-2 rounded border border-gray-200">
//                     <span className="tag-yellow">NB</span>{" "}
//                     <span className="text-neo-black">
//                       {innings.extrasData.noBalls || 0}
//                     </span>
//                   </div>
//                   <div className="bg-white p-2 rounded border border-gray-200">
//                     <span className="tag-blue">B</span>{" "}
//                     <span className="text-neo-black">
//                       {innings.extrasData.byes || 0}
//                     </span>
//                   </div>
//                   <div className="bg-white p-2 rounded border border-gray-200">
//                     <span className="tag-yellow">LB</span>{" "}
//                     <span className="text-neo-black">
//                       {innings.extrasData.legByes || 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex items-center mb-4">
//                   <Award className="h-5 w-5 mr-2 text-neo-yellow" />
//                   <h3 className="font-bold text-lg text-neo-black">Bowling</h3>
//                 </div>

//                 <div className="neo-table">
//                   <Table>
//                     <TableHeader className="neo-table-header">
//                       <TableRow>
//                         <TableHead className="text-white">Bowler</TableHead>
//                         <TableHead className="text-white text-right">
//                           O
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           M
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           R
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           W
//                         </TableHead>
//                         <TableHead className="text-white text-right">
//                           Econ
//                         </TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {innings.bowlTeamDetails.bowlersData &&
//                         Object.values(innings.bowlTeamDetails.bowlersData)
//                           .sort(
//                             (a, b) =>
//                               b.wickets - a.wickets || a.economy - b.economy
//                           )
//                           .map((bowler, idx) => (
//                             <TableRow
//                               key={idx}
//                               className={
//                                 idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }
//                             >
//                               <TableCell className="font-medium border-r border-gray-200 text-neo-black">
//                                 {bowler.bowlName}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 <div className="flex items-center justify-end">
//                                   <Clock className="h-3 w-3 mr-1 opacity-50" />
//                                   {bowler.overs}
//                                 </div>
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {bowler.maidens}
//                               </TableCell>
//                               <TableCell className="text-right text-neo-black">
//                                 {bowler.runs}
//                               </TableCell>
//                               <TableCell className="text-right font-bold text-lg">
//                                 <span
//                                   className={`${
//                                     bowler.wickets >= 3
//                                       ? "text-neo-red"
//                                       : "text-neo-black"
//                                   }`}
//                                 >
//                                   {bowler.wickets}
//                                 </span>
//                               </TableCell>
//                               <TableCell className="text-right font-medium">
//                                 <span
//                                   className={
//                                     bowler.economy <= 6
//                                       ? "text-neo-green"
//                                       : bowler.economy >= 10
//                                       ? "text-neo-red"
//                                       : "text-neo-black"
//                                   }
//                                 >
//                                   {bowler.economy.toFixed(2)}
//                                 </span>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>
//             </div>
//           </AnalyticsCard>
//         ))}
//       </div>
//     </div>
//   );
// };

export const MatchScorecard: React.FC<MatchScorecardProps> = ({
  matchData,
  scorecard,
  onClose,
}) => {
  if (!scorecard || scorecard.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="neo-card bg-white p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-animation">
          <div className="flex justify-between items-center mb-4">
            <h2 className="neo-header">Match Scorecard</h2>
            <button
              onClick={onClose}
              className="neo-btn p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-center py-10">Scorecard data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="neo-card bg-white p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-animation">
        <div className="flex justify-between items-center mb-6">
          <h2 className="neo-header">{matchData.matchDesc}</h2>
          <button
            onClick={onClose}
            className="neo-btn p-2 rounded-full"
            aria-label="Close scorecard"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-neo-cream rounded-md flex justify-between items-center">
          <div>
            <span className="font-bold">{matchData.team1Name}</span>
            <span className="mx-2 text-xl font-bold bg-neo-blue text-white px-3 py-1 rounded-md">
              {matchData.team1Score}
            </span>
          </div>
          <span className="text-lg font-bold bg-neo-black text-white px-3 py-1 rounded-full">
            vs
          </span>
          <div>
            <span className="mx-2 text-xl font-bold bg-neo-yellow text-neo-black px-3 py-1 rounded-md">
              {matchData.team2Score}
            </span>
            <span className="font-bold">{matchData.team2Name}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-6 p-3 border-2 border-dashed border-neo-gray rounded-md">
          <MapPin className="h-4 w-4 mr-2" />
          <span>Venue: {matchData.ground}</span>
        </div>

        {scorecard.map((innings, index) => (
          <AnalyticsCard
            key={innings.inningsId}
            title={`${innings.inningsName} - ${innings.batTeamName} ${innings.runs}/${innings.wickets} (${innings.overs} overs)`}
            color={index === 0 ? "blue" : "yellow"}
            className="mb-6"
          >
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 mr-2 text-neo-blue" />
                  <h3 className="font-bold text-lg text-neo-black">Batting</h3>
                </div>

                <div className="neo-table">
                  <Table>
                    <TableHeader className="neo-table-header">
                      <TableRow>
                        <TableHead className="text-white">Batter</TableHead>
                        <TableHead className="text-white text-right">
                          Runs
                        </TableHead>
                        <TableHead className="text-white text-right">
                          Balls
                        </TableHead>
                        <TableHead className="text-white text-right">
                          4s
                        </TableHead>
                        <TableHead className="text-white text-right">
                          6s
                        </TableHead>
                        <TableHead className="text-white text-right">
                          SR
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {innings.batTeamDetails.batsmenData &&
                        Object.values(innings.batTeamDetails.batsmenData)
                          .sort((a, b) => {
                            if (!a.outDesc && b.outDesc) return 1;
                            if (a.outDesc && !b.outDesc) return -1;
                            return 0;
                          })
                          .map((batsman, idx) => (
                            <TableRow
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <TableCell className="border-r border-gray-200">
                                <div className="font-medium text-neo-black">
                                  {batsman.batName}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {batsman.outDesc ? (
                                    <span className="text-neo-red">
                                      {batsman.outDesc}
                                    </span>
                                  ) : (
                                    <span className="text-neo-green flex items-center">
                                      <Circle className="h-2 w-2 mr-1 fill-neo-green" />{" "}
                                      not out
                                    </span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-bold text-lg text-neo-black">
                                {batsman.runs}
                              </TableCell>
                              <TableCell className="text-right text-neo-black">
                                {batsman.balls}
                              </TableCell>
                              <TableCell className="text-right text-neo-black">
                                {batsman.fours}
                              </TableCell>
                              <TableCell className="text-right text-neo-black">
                                {batsman.sixes}
                              </TableCell>
                              <TableCell className="text-right font-medium text-neo-black">
                                {batsman.strikeRate.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="bg-white border-2 border-neo-black p-3 rounded-md my-4">
                <div className="font-bold flex items-center text-neo-black mb-2">
                  <Flag className="h-4 w-4 mr-2" />
                  Extras: {innings.extrasData.total}
                </div>
                <div className="text-sm grid grid-cols-4 gap-2">
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <span className="bg-neo-blue text-white px-2 py-1 rounded-md text-xs font-medium">
                      WD
                    </span>
                    <span className="ml-2 text-neo-black">
                      {innings.extrasData.wides || 0}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <span className="bg-neo-yellow text-neo-black px-2 py-1 rounded-md text-xs font-medium">
                      NB
                    </span>
                    <span className="ml-2 text-neo-black">
                      {innings.extrasData.noBalls || 0}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <span className="bg-neo-blue text-white px-2 py-1 rounded-md text-xs font-medium">
                      B
                    </span>
                    <span className="ml-2 text-neo-black">
                      {innings.extrasData.byes || 0}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <span className="bg-neo-yellow text-neo-black px-2 py-1 rounded-md text-xs font-medium">
                      LB
                    </span>
                    <span className="ml-2 text-neo-black">
                      {innings.extrasData.legByes || 0}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 mr-2 text-neo-yellow" />
                  <h3 className="font-bold text-lg text-neo-black">Bowling</h3>
                </div>

                <div className="neo-table">
                  <Table>
                    <TableHeader className="neo-table-header">
                      <TableRow>
                        <TableHead className="text-white">Bowler</TableHead>
                        <TableHead className="text-white text-right">
                          O
                        </TableHead>
                        <TableHead className="text-white text-right">
                          M
                        </TableHead>
                        <TableHead className="text-white text-right">
                          R
                        </TableHead>
                        <TableHead className="text-white text-right">
                          W
                        </TableHead>
                        <TableHead className="text-white text-right">
                          Econ
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {innings.bowlTeamDetails.bowlersData &&
                        Object.values(innings.bowlTeamDetails.bowlersData)
                          .sort(
                            (a, b) =>
                              b.wickets - a.wickets || a.economy - b.economy
                          )
                          .map((bowler, idx) => (
                            <TableRow
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <TableCell className="font-medium border-r border-gray-200 text-neo-black">
                                {bowler.bowlName}
                              </TableCell>
                              <TableCell className="text-right text-neo-black">
                                <div className="flex items-center justify-end">
                                  <Clock className="h-3 w-3 mr-1 opacity-50" />
                                  {bowler.overs}
                                </div>
                              </TableCell>
                              <TableCell className="text-right text-neo-black">
                                {bowler.maidens}
                              </TableCell>
                              <TableCell className="text-right text-neo-black">
                                {bowler.runs}
                              </TableCell>
                              <TableCell className="text-right font-bold text-lg">
                                <span
                                  className={`${
                                    bowler.wickets >= 3
                                      ? "text-neo-red"
                                      : "text-neo-black"
                                  }`}
                                >
                                  {bowler.wickets}
                                </span>
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                <span
                                  className={
                                    bowler.economy <= 6
                                      ? "text-neo-green"
                                      : bowler.economy >= 10
                                      ? "text-neo-red"
                                      : "text-neo-black"
                                  }
                                >
                                  {bowler.economy.toFixed(2)}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </AnalyticsCard>
        ))}
      </div>
    </div>
  );
};
export default MatchScorecard;
