import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { getRecommendedShops, getPreferredTags } from "@/lib/orderHistory";

export type ShopTag = "grab-and-go" | "cozy-vibes" | "work-friendly" | "artsy" | "brunch-spot" | "late-night" | "pet-friendly" | "outdoor-seating";

export const shopTagLabels: Record<ShopTag, string> = {
  "grab-and-go": "Grab & Go",
  "cozy-vibes": "Cozy Vibes",
  "work-friendly": "Work Friendly",
  "artsy": "Artsy",
  "brunch-spot": "Brunch Spot",
  "late-night": "Late Night",
  "pet-friendly": "Pet Friendly",
  "outdoor-seating": "Outdoor Seating"
};

export const shopsData = [
  {
    id: 1,
    name: "Artisan Coffee House",
    address: "123 Main St, Downtown",
    rating: 4.8,
    distance: "0.5 mi",
    openUntil: "8:00 PM",
    specialty: "Specialty Lattes & Pour-overs",
    reviews: 342,
    tags: ["artsy", "cozy-vibes", "work-friendly"] as ShopTag[]
  },
  {
    id: 2,
    name: "Morning Brew Café",
    address: "456 Oak Avenue",
    rating: 4.6,
    distance: "1.2 mi",
    openUntil: "7:00 PM",
    specialty: "Fresh Pastries & Espresso",
    reviews: 215,
    tags: ["brunch-spot", "grab-and-go", "pet-friendly"] as ShopTag[]
  },
  {
    id: 3,
    name: "The Coffee Bean",
    address: "789 Elm Street",
    rating: 4.9,
    distance: "0.8 mi",
    openUntil: "9:00 PM",
    specialty: "Cold Brew & Iced Drinks",
    reviews: 487,
    tags: ["late-night", "outdoor-seating", "work-friendly"] as ShopTag[]
  },
  {
    id: 4,
    name: "Roasted Dreams",
    address: "321 Pine Road",
    rating: 4.7,
    distance: "1.5 mi",
    openUntil: "6:00 PM",
    specialty: "Single Origin & Fair Trade",
    reviews: 156,
    tags: ["cozy-vibes", "artsy"] as ShopTag[]
  }
];

const Shops = () => {
  const preferredTags = useMemo(() => getPreferredTags(), []);
  const frequentShopIds = useMemo(() => getRecommendedShops(4), []);
  
  const shops = useMemo(() => {
    const scored = shopsData.map(shop => {
      let score = 0;
      
      shop.tags.forEach(tag => {
        const tagIndex = preferredTags.indexOf(tag);
        if (tagIndex !== -1) {
          score += (preferredTags.length - tagIndex) * 2;
        }
      });
      
      const shopIndex = frequentShopIds.indexOf(shop.id);
      if (shopIndex !== -1) {
        score += (frequentShopIds.length - shopIndex) * 3;
      }
      
      const recommended = score > 0;
      
      return { ...shop, score, recommended };
    });
    
    return scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.rating - a.rating;
    });
  }, [preferredTags, frequentShopIds]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Discover Cafes</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Find your perfect spot. We recommend cafes based on your taste and order history.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {shops.map((shop, index) => (
            <Card 
              key={shop.id} 
              className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-foreground">{shop.name}</h3>
                      {shop.recommended && (
                        <Badge className="bg-primary/10 text-primary border-0 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          For You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {shop.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="font-medium text-sm text-foreground">{shop.rating}</span>
                  </div>
                </div>

                {/* Specialty */}
                <p className="text-sm text-muted-foreground mb-3">{shop.specialty}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {shop.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className={`text-xs font-normal ${
                        preferredTags.includes(tag) 
                          ? 'bg-primary/5 border-primary/30 text-primary' 
                          : 'border-border/50'
                      }`}
                    >
                      {shopTagLabels[tag]}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {shop.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Until {shop.openUntil}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{shop.reviews} reviews</span>
                </div>

                {/* Action */}
                <Link to={`/menu/${shop.id}`} className="block mt-4">
                  <Button className="w-full">
                    View Menu
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