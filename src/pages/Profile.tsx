import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoyaltyCard } from "@/components/LoyaltyCard";
import { User, MapPin, Clock, Coffee, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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

const Profile = () => {
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
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground">47</div>
                    <div className="text-sm text-muted-foreground">Total Orders</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
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
              <LoyaltyCard points={350} tier="silver" />
            </div>

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
                          <span className="text-sm text-muted-foreground">Total</span>
                          <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
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
