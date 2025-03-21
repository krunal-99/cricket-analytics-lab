import React from "react";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  color?: "yellow" | "blue" | "red" | "white" | "green" | "purple";
  rotate?: boolean;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  children,
  className,
  color = "white",
  rotate = false,
}) => {
  const colorClasses = {
    yellow: "bg-neo-yellow",
    blue: "bg-neo-blue text-white",
    red: "bg-neo-red text-white",
    white: "bg-white",
    green: "bg-neo-green text-white",
    purple: "bg-neo-purple text-white",
  };

  return (
    <div
      className={cn(
        "neo-card p-6 overflow-hidden",
        rotate && "rotate-[-1deg] hover:rotate-0 transition-transform",
        colorClasses[color],
        className
      )}
    >
      <h3 className="text-xl font-black mb-4 tracking-tight flex items-center">
        <span className="mr-2">{title}</span>
        {color === "yellow" && (
          <span className="bg-neo-black text-neo-yellow text-xs px-2 py-1 rotate-[-2deg]">
            HIGHLIGHT
          </span>
        )}
      </h3>
      <div>{children}</div>
    </div>
  );
};
