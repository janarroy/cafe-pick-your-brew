import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { getRecommendedShops } from "@/lib/orderHistory";

const shopsData = [
  {
    id: 1,
    name: "Artisan Coffee House",
    address: "123 Main St, Downtown",
    rating: 4.8,
    distance: "0.5 mi",
    openUntil: "8:00 PM",
    specialty: "Specialty Lattes & Pour-overs",
    reviews: 342
  },
  {
    id: 2,
    name: "Morning Brew Café",
    address: "456 Oak Avenue",
    rating: 4.6,
    distance: "1.2 mi",
    openUntil: "7:00 PM",
    specialty: "Fresh Pastries & Espresso",
    reviews: 215
  },
  {
    id: 3,
    name: "The Coffee Bean",
    address: "789 Elm Street",
    rating: 4.9,
    distance: "0.8 mi",
    openUntil: "9:00 PM",
    specialty: "Cold Brew & Iced Drinks",
    reviews: 487
  },
  {
    id: 4,
    name: "Roasted Dreams",
    address: "321 Pine Road",
    rating: 4.7,
    distance: "1.5 mi",
    openUntil: "6:00 PM",
    specialty: "Single Origin & Fair Trade",
    reviews: 156
  }
];

const Shops = () => {
  // Get recommended shop IDs based on order history
  const recommendedShopIds = useMemo(() => getRecommendedShops(2), []);
  
  // Add recommended flag to shops based on order history
  const shops = useMemo(() => {
    return shopsData.map(shop => ({
      ...shop,
      recommended: recommendedShopIds.includes(shop.id)
    }));
  }, [recommendedShopIds]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Coffee Shops Near You</h1>
          <p className="text-xl text-muted-foreground">
            Discover local favorites and choose where to order
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {shops.map((shop, index) => (
            <Card 
              key={shop.id} 
              className="overflow-hidden hover:shadow-warm transition-all duration-300 animate-slide-up bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-foreground">{shop.name}</h3>
                      {shop.recommended && (
                        <Badge className="bg-accent/20 text-accent border-accent/40">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {shop.address}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{shop.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{shop.reviews} reviews</span>
                  </div>
                </div>

                <div className="mb-4 text-sm text-muted-foreground">
                  <p className="mb-1">{shop.specialty}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {shop.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Open until {shop.openUntil}
                    </span>
                  </div>
                </div>

                <Link to={`/menu/${shop.id}`}>
                  <Button className="w-full bg-gradient-coffee hover:opacity-90 transition-opacity">
                    View Menu & Baristas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shops;
