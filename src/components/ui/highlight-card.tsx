"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface HighlightCardProps {
  title: string;
  description: string[];
  icon?: ReactNode;
}

const HighlightCard: FC<HighlightCardProps> = ({ title, description, icon }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
      <Card className="text-white rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-[#0b1020] via-[#0d0b2e] to-[#0b1020] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-indigo-300/25 hover:shadow-indigo-500/10 hover:shadow-3xl w-[350px]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-300/10 to-violet-300/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-400/15 to-transparent blur-3xl opacity-25 group-hover:opacity-40 transform group-hover:scale-110 transition-all duration-700"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-indigo-300/10 blur-xl"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-violet-300/10 blur-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>

        <div className="p-8 relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-300/20 opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="absolute inset-0 rounded-full border border-indigo-200/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

            <div className="p-6 rounded-full backdrop-blur-lg border border-indigo-300/25 bg-gradient-to-br from-[#0f1535]/80 to-[#1a1245]/70 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-indigo-400/20">
              <div className="transform group-hover:rotate-180 transition-transform duration-700">
                {icon}
              </div>
            </div>
          </div>

          <h3 className="mb-4 text-3xl font-bold bg-gradient-to-r from-indigo-200 via-violet-200 to-indigo-200 bg-clip-text text-transparent transform group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>

          <div className="space-y-1 max-w-sm">
            {description.map((line, idx) => (
              <p
                key={idx}
                className="text-gray-300 text-sm leading-relaxed transform group-hover:text-gray-200 transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-6 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-indigo-200 to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500"></div>

          <div className="flex space-x-2 mt-4 opacity-50 group-hover:opacity-90 transition-opacity duration-300">
            <div className="w-2 h-2 bg-indigo-200 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-200 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-200 rounded-full"></div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-300/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-300/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>
    </div>
  );
};

export default HighlightCard;


