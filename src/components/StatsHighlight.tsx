
import React from "react";
import { cn } from "@/lib/utils";

interface StatsHighlightProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  color?: "yellow" | "blue" | "red" | "green" | "purple";
  className?: string;
}

export const StatsHighlight: React.FC<StatsHighlightProps> = ({
  value,
  label,
  icon,
  trend,
  color = "yellow",
  className,
}) => {
  const colorClasses = {
    yellow: "bg-neo-yellow text-neo-black border-neo-black",
    blue: "bg-neo-blue text-white border-white",
    red: "bg-neo-red text-white border-white",
    green: "bg-neo-green text-white border-white",
    purple: "bg-neo-purple text-white border-white",
  };
  
  const trendIcons = {
    up: "↑",
    down: "↓",
    neutral: "→",
  };

  return (
    <div 
      className={cn(
        "p-4 border-4 relative", 
        colorClasses[color],
        className
      )}
    >
      <div className="flex justify-between items-start">
        {icon && <div className="mb-2">{icon}</div>}
        {trend && (
          <div 
            className={cn(
              "text-xl font-bold", 
              trend === "up" && "text-neo-green",
              trend === "down" && "text-neo-red"
            )}
          >
            {trendIcons[trend]}
          </div>
        )}
      </div>
      <div className="text-3xl lg:text-4xl font-black">{value}</div>
      <div className="text-sm mt-1 opacity-80">{label}</div>
    </div>
  );
};
