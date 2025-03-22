import React from "react";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  matchDesc: string;
  team1Name: string;
  team2Name: string;
  team1Score: string;
  team2Score: string;
  ground: string;
  totalFours: number;
  totalSixes: number;
  className?: string;
  featured?: boolean;
  onClick: (match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = (match) => {
  return (
    <div
      onClick={() => {
        match.onClick(match);
      }}
      className={cn(
        "neo-card p-5 relative overflow-hidden cursor-pointer",
        match.featured ? "bg-neo-yellow rotate-[-1deg]" : "bg-white",
        match.className
      )}
    >
      {match.featured && (
        <div className="absolute top-2 right-2 bg-neo-black text-neo-yellow font-bold text-xs px-2 py-1 rotate-[-2deg]">
          FEATURED
        </div>
      )}

      <div className="text-sm text-gray-600 mb-2">{match.matchDesc}</div>

      <div className="flex justify-between mb-4">
        <div className="flex-1">
          <div className="font-bold text-xl">{match.team1Name}</div>
          <div className="text-2xl font-black">{match.team1Score}</div>
        </div>

        <div className="mx-4 self-center font-bold text-2xl">VS</div>

        <div className="flex-1 text-right">
          <div className="font-bold text-xl">{match.team2Name}</div>
          <div className="text-2xl font-black">{match.team2Score}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-dashed border-gray-300">
        <div className="text-sm">{match.ground}</div>

        <div className="flex space-x-3">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-neo-blue mr-1"></span>
            <span className="font-bold">{match.totalFours}</span>
            <span className="text-xs ml-1">FOURS</span>
          </div>

          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-neo-red mr-1"></span>
            <span className="font-bold">{match.totalSixes}</span>
            <span className="text-xs ml-1">SIXES</span>
          </div>
        </div>
      </div>
    </div>
  );
};
