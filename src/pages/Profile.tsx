import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoyaltyCard } from "@/components/LoyaltyCard";
import { User, MapPin, Clock, Coffee, ArrowLeft, RotateCcw, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-warm">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-coffee mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-1 text-foreground">Coffee Lover</h2>
                <p className="text-muted-foreground mb-4">coffee.enthusiast@email.com</p>
                <Badge className="bg-accent text-accent-foreground mb-6">
                  Member since Jan 2025
                </Badge>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                      <Tabs value={orderView} onValueChange={(v) => setOrderView(v as "week" | "month")} className="w-auto">
                        <TabsList className="h-7">
                          <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                          <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-3">47</div>
                    <ResponsiveContainer width="100%" height={100}>
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
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <div className="text-sm text-muted-foreground">Cafes Visited</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Favorite Baristas */}
            <Card className="shadow-warm mt-6">
              <CardHeader>
                <CardTitle className="text-foreground">Favorite Baristas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">👩‍🦱</div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Emma Rodriguez</div>
                      <div className="text-sm text-muted-foreground">15 orders</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">👨</div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">James Chen</div>
                      <div className="text-sm text-muted-foreground">12 orders</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">👩</div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Sarah Johnson</div>
                      <div className="text-sm text-muted-foreground">8 orders</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Loyalty Card */}
            <div className="mb-8">
              <LoyaltyCard points={currentPoints} tier="silver" />
            </div>
            
            {/* Next Reward Progress */}
            <Card className="shadow-warm mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Next Reward</h3>
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    {nextRewardAt - currentPoints} pts away
                  </Badge>
                </div>
                <Progress value={progressToNextReward} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Earn {nextRewardAt - currentPoints} more points to unlock a free drink!
                </p>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="shadow-warm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground">Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
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
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                            +{order.points} pts
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Coffee className="h-3 w-3" />
                            {order.items}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {order.date}
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                          <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                          <Button size="sm" variant="outline" className="gap-1">
                            <RotateCcw className="h-3 w-3" />
                            Reorder
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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
