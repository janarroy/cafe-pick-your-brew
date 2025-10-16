import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, TrendingUp } from "lucide-react";

interface LoyaltyCardProps {
  points: number;
  tier: "bronze" | "silver" | "gold";
}

const tierInfo = {
  bronze: { name: "Bronze", color: "bg-amber-600", nextTier: 500 },
  silver: { name: "Silver", color: "bg-slate-400", nextTier: 1000 },
  gold: { name: "Gold", color: "bg-yellow-500", nextTier: null },
};

export const LoyaltyCard = ({ points, tier }: LoyaltyCardProps) => {
  const info = tierInfo[tier];
  const progress = info.nextTier ? (points / info.nextTier) * 100 : 100;

  return (
    <Card className="overflow-hidden shadow-warm border-2 border-primary/20">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              Brew Buddy Rewards
            </h3>
            <Badge className={`${info.color} text-white`}>
              {info.name} Member
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{points}</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </div>
        </div>

        {info.nextTier && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress to {tierInfo[tier === "bronze" ? "silver" : "gold"].name}</span>
              <span>{info.nextTier - points} points away</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-coffee h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <Gift className="h-5 w-5 mx-auto mb-1 text-accent" />
            <div className="text-xs text-muted-foreground">Rewards</div>
            <div className="text-sm font-semibold text-foreground">3 Available</div>
          </div>
          <div className="text-center">
            <Star className="h-5 w-5 mx-auto mb-1 text-accent" />
            <div className="text-xs text-muted-foreground">This Month</div>
            <div className="text-sm font-semibold text-foreground">+127 pts</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-accent" />
            <div className="text-xs text-muted-foreground">Streak</div>
            <div className="text-sm font-semibold text-foreground">5 days</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
