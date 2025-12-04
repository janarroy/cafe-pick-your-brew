import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoyaltyCard } from "@/components/LoyaltyCard";
import { User, MapPin, Clock, Coffee, RotateCcw, Gift, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const recentOrders = [
  {
    id: 1,
    shop: "Artisan Coffee House",
    barista: "Emma Rodriguez",
    items: "Cappuccino, Croissant",
    date: "Today, 9:30 AM",
    points: 15,
    total: 8.50
  },
  {
    id: 2,
    shop: "Morning Brew Café",
    barista: "James Chen",
    items: "Iced Latte",
    date: "Yesterday, 2:15 PM",
    points: 10,
    total: 5.00
  },
  {
    id: 3,
    shop: "The Coffee Bean",
    barista: "Sarah Johnson",
    items: "Cold Brew, Muffin",
    date: "2 days ago",
    points: 12,
    total: 7.25
  }
];

const weeklyData = [
  { day: "Mon", orders: 2 },
  { day: "Tue", orders: 1 },
  { day: "Wed", orders: 3 },
  { day: "Thu", orders: 1 },
  { day: "Fri", orders: 2 },
  { day: "Sat", orders: 4 },
  { day: "Sun", orders: 2 }
];

const monthlyData = [
  { week: "Week 1", orders: 8 },
  { week: "Week 2", orders: 12 },
  { week: "Week 3", orders: 10 },
  { week: "Week 4", orders: 15 }
];

const Profile = () => {
  const [orderView, setOrderView] = useState<"week" | "month">("week");
  const currentPoints = 350;
  const nextRewardAt = 400;
  const progressToNextReward = ((currentPoints % 100) / 100) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-1">Coffee Lover</h1>
              <p className="text-muted-foreground mb-2">coffee.enthusiast@email.com</p>
              <Badge variant="secondary">Member since Jan 2025</Badge>
            </div>
            <div className="md:ml-auto">
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-foreground mb-1">47</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{currentPoints}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-foreground mb-1">8</div>
              <div className="text-sm text-muted-foreground">Cafes Visited</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-accent mb-1">7</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Loyalty Card */}
            <LoyaltyCard points={currentPoints} tier="silver" />

            {/* Next Reward */}
            <Card className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Next Reward</h3>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {nextRewardAt - currentPoints} pts away
                  </Badge>
                </div>
                <Progress value={progressToNextReward} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Earn {nextRewardAt - currentPoints} more points for a free drink!
                </p>
              </CardContent>
            </Card>

            {/* Activity Chart */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    Activity
                  </CardTitle>
                  <Tabs value={orderView} onValueChange={(v) => setOrderView(v as "week" | "month")} className="w-auto">
                    <TabsList className="h-7">
                      <TabsTrigger value="week" className="text-xs px-2">Week</TabsTrigger>
                      <TabsTrigger value="month" className="text-xs px-2">Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={orderView === "week" ? weeklyData : monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey={orderView === "week" ? "day" : "week"} 
                      tick={{ fontSize: 10 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Favorite Baristas */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Favorite Baristas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {[
                    { name: "Emma Rodriguez", orders: 15, avatar: "👩‍🦱" },
                    { name: "James Chen", orders: 12, avatar: "👨" },
                    { name: "Sarah Johnson", orders: 8, avatar: "👩" }
                  ].map((barista, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-2xl">{barista.avatar}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-foreground">{barista.name}</div>
                        <div className="text-xs text-muted-foreground">{barista.orders} orders</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold text-foreground">{order.shop}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Barista: {order.barista}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                          +{order.points} pts
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Coffee className="h-3 w-3" />
                          {order.items}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {order.date}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-border/50">
                        <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                        <Button size="sm" variant="outline" className="gap-1">
                          <RotateCcw className="h-3 w-3" />
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;