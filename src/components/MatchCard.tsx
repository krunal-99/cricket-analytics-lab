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
}

export const MatchCard: React.FC<MatchCardProps> = ({
  matchDesc,
  team1Name,
  team2Name,
  team1Score,
  team2Score,
  ground,
  totalFours,
  totalSixes,
  className,
  featured = false,
}) => {
  return (
    <div
      className={cn(
        "neo-card p-5 relative overflow-hidden",
        featured ? "bg-neo-yellow rotate-[-1deg]" : "bg-white",
        className
      )}
    >
      {featured && (
        <div className="absolute top-2 right-2 bg-neo-black text-neo-yellow font-bold text-xs px-2 py-1 rotate-[-2deg]">
          FEATURED
        </div>
      )}

      <div className="text-sm text-gray-600 mb-2">{matchDesc}</div>

      <div className="flex justify-between mb-4">
        <div className="flex-1">
          <div className="font-bold text-xl">{team1Name}</div>
          <div className="text-2xl font-black">{team1Score}</div>
        </div>

        <div className="mx-4 self-center font-bold text-2xl">VS</div>

        <div className="flex-1 text-right">
          <div className="font-bold text-xl">{team2Name}</div>
          <div className="text-2xl font-black">{team2Score}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-dashed border-gray-300">
        <div className="text-sm">{ground}</div>

        <div className="flex space-x-3">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-neo-blue mr-1"></span>
            <span className="font-bold">{totalFours}</span>
            <span className="text-xs ml-1">FOURS</span>
          </div>

          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-neo-red mr-1"></span>
            <span className="font-bold">{totalSixes}</span>
            <span className="text-xs ml-1">SIXES</span>
          </div>
        </div>
      </div>
    </div>
  );
};
