import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Coffee, MapPin, Users, Gift, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/coffee-hero.jpg";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    { 
      url: heroImage, 
      shop: "Artisan Coffee",
      title: "One Loyalty Program,",
      subtitle: "Every Coffee Shop",
      description: "Discover cafes, order ahead, and earn universal rewards across our entire network"
    },
    { 
      url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=800&fit=crop", 
      shop: "Philz Coffee",
      title: "Personalized Coffee,",
      subtitle: "Your Favorite Barista",
      description: "Choose your barista and get personalized service at every visit"
    },
    { 
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop", 
      shop: "Starbucks Reserve",
      title: "Order Ahead,",
      subtitle: "Skip the Line",
      description: "Pre-order your drinks and pick them up at your convenience"
    },
    { 
      url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop", 
      shop: "Blue Bottle Coffee",
      title: "Earn Rewards,",
      subtitle: "Every Purchase",
      description: "Get points at every cafe and unlock exclusive perks as you level up"
    }
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${heroImages[currentImageIndex].url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        {/* Carousel Controls */}
        <button 
          onClick={prevImage}
          className="absolute left-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
        
        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <Badge className="mb-4 bg-accent/90 text-accent-foreground text-base px-4 py-2">
            <Gift className="mr-2 h-4 w-4" />
            Earn Rewards at Every Cafe
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
            {heroImages[currentImageIndex].title}
            <br />
            {heroImages[currentImageIndex].subtitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            {heroImages[currentImageIndex].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shops">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-warm">
                <Coffee className="mr-2 h-5 w-5" />
                Start Earning Points
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-primary-foreground hover:bg-white/20">
                <Star className="mr-2 h-5 w-5" />
                View My Rewards
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">How It Works</h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Discover, order, and earn rewards - all in one seamless experience
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Link to="/shops" className="text-center animate-slide-up hover-scale cursor-pointer">
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <MapPin className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Discover Cafes</h3>
              <p className="text-muted-foreground">
                Browse local coffee shops with personalized recommendations
              </p>
            </Link>

            <Link to="/shops" className="text-center animate-slide-up hover-scale cursor-pointer" style={{ animationDelay: "0.1s" }}>
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <Users className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Choose Barista</h3>
              <p className="text-muted-foreground">
                Select your favorite barista for a personal touch
              </p>
            </Link>

            <Link to="/shops" className="text-center animate-slide-up hover-scale cursor-pointer" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <Coffee className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Order Ahead</h3>
              <p className="text-muted-foreground">
                Skip the line with pre-order and pickup
              </p>
            </Link>

            <Link to="/profile" className="text-center animate-slide-up hover-scale cursor-pointer" style={{ animationDelay: "0.3s" }}>
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <Gift className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Earn Rewards</h3>
              <p className="text-muted-foreground">
                Get points at every cafe in our network
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Loyalty Program Highlight */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <Sparkles className="mr-2 h-3 w-3" />
                Universal Loyalty Program
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                One Card. Every Cafe.
                <br />
                Endless Rewards.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Unlike traditional loyalty programs locked to a single brand, Brew Buddy lets you earn and redeem points at <strong>any participating cafe</strong> in our network.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="h-3 w-3 text-accent" />
                  </div>
                  <div>
                    <strong className="text-foreground">Earn Everywhere:</strong>
                    <span className="text-muted-foreground"> Get points at every cafe, every time</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Gift className="h-3 w-3 text-accent" />
                  </div>
                  <div>
                    <strong className="text-foreground">Redeem Anywhere:</strong>
                    <span className="text-muted-foreground"> Use your rewards at any network location</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-3 w-3 text-accent" />
                  </div>
                  <div>
                    <strong className="text-foreground">Tier Benefits:</strong>
                    <span className="text-muted-foreground"> Unlock exclusive perks as you level up</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="animate-slide-up">
              <Card className="bg-gradient-coffee p-8 text-center shadow-warm">
                <div className="text-primary-foreground">
                  <div className="text-6xl font-bold mb-2">350</div>
                  <div className="text-xl mb-6 opacity-90">Points Available</div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                          <div className="text-2xl font-bold">Bronze</div>
                          <div className="text-sm opacity-75">0-500 pts</div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 bg-white/20 rounded-lg p-3 text-sm backdrop-blur-sm">
                        <ul className="space-y-1 text-left">
                          <li>• 5% off all drinks</li>
                          <li>• Birthday reward</li>
                          <li>• Free size upgrade</li>
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 transition-colors cursor-pointer">
                          <div className="text-2xl font-bold">Silver</div>
                          <div className="text-sm opacity-75">500-1000</div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 bg-white/20 rounded-lg p-3 text-sm backdrop-blur-sm">
                        <ul className="space-y-1 text-left">
                          <li>• 10% off all drinks</li>
                          <li>• Free drink monthly</li>
                          <li>• Priority ordering</li>
                          <li>• Early access to new items</li>
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                          <div className="text-2xl font-bold">Gold</div>
                          <div className="text-sm opacity-75">1000+</div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 bg-white/20 rounded-lg p-3 text-sm backdrop-blur-sm">
                        <ul className="space-y-1 text-left">
                          <li>• 15% off all drinks</li>
                          <li>• 2 free drinks monthly</li>
                          <li>• VIP events access</li>
                          <li>• Personal barista requests</li>
                          <li>• Free pastry weekly</li>
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                  <Button size="lg" variant="secondary" className="w-full">
                    Join Rewards Program
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-coffee">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">
            Ready for Your Perfect Cup?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of coffee lovers enjoying personalized service
          </p>
          <Link to="/shops">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Browse Coffee Shops
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
