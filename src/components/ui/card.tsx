"use client";

import { ReactNode } from "react";

interface Card {
  icon: ReactNode; // For icons like ∞, numbers, or Lucide icons
  title: string;
  description: string;
}

interface CardGridProps {
  cards: Card[];
}

export default function CardGrid({ cards }: CardGridProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-8 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="text-center border border-amber-400 rounded-sm py-[40px]"
        >
          <div className="text-3xl font-bold text-accent mb-2">
            {card.icon}
          </div>
          <div className="text-muted-foreground">{card.description}</div>
        </div>
      ))}
    </div>
  );
}