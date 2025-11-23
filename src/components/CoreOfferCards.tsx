import { Card } from "./Card";
import { TrendingUp, FileText, Target } from "lucide-react";

export const offerCards = [
  {
    title: "Signals & Positioning",
    description: "We map behavioral, cultural, and market signals orbiting your space so the narrative already speaks your buyers' language.",
    icon: TrendingUp,
  },
  {
    title: "Concept & Deck Spine",
    description: "We spin the signal into a crisp concept, campaign spine, and deck that decision makers can forward without translation.",
    icon: FileText,
  },
  {
    title: "Outreach Logic & Target Map",
    description: "We build the target list, intro logic, and follow up cadence so the concept actually lands and closes repeatedly.",
    icon: Target,
  },
];

export function CoreOfferCards() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {offerCards.map((card) => (
        <Card
          key={card.title}
          title={card.title}
          description={card.description}
          icon={card.icon}
          className="h-full"
        />
      ))}
    </div>
  );
}
