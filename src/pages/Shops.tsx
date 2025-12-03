import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Sparkles, Tag } from "lucide-react";
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
  // Get user's preferred tags and previously ordered shop IDs
  const preferredTags = useMemo(() => getPreferredTags(), []);
  const frequentShopIds = useMemo(() => getRecommendedShops(4), []);
  
  // Score and sort shops based on tag preferences and order history
  const shops = useMemo(() => {
    const scored = shopsData.map(shop => {
      let score = 0;
      
      // Add points for matching tags (weighted by preference order)
      shop.tags.forEach(tag => {
        const tagIndex = preferredTags.indexOf(tag);
        if (tagIndex !== -1) {
          score += (preferredTags.length - tagIndex) * 2; // Higher weight for more preferred tags
        }
      });
      
      // Add points for frequently ordered shops
      const shopIndex = frequentShopIds.indexOf(shop.id);
      if (shopIndex !== -1) {
        score += (frequentShopIds.length - shopIndex) * 3;
      }
      
      // Determine if recommended (has score from tags or orders)
      const recommended = score > 0;
      
      return { ...shop, score, recommended };
    });
    
    // Sort by score (highest first), then by rating for ties
    return scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.rating - a.rating;
    });
  }, [preferredTags, frequentShopIds]);

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
                  <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
                    {shop.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className={`text-xs ${preferredTags.includes(tag) ? 'bg-primary/10 border-primary/40 text-primary' : ''}`}
                      >
                        {shopTagLabels[tag]}
                      </Badge>
                    ))}
                  </div>
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
