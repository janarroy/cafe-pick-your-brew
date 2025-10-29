import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Coffee, MapPin, Users, Gift, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/coffee-hero.jpg";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <Badge className="mb-4 bg-accent/90 text-accent-foreground text-base px-4 py-2">
            <Gift className="mr-2 h-4 w-4" />
            Earn Rewards at Every Cafe
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
            One Loyalty Program,
            <br />
            Every Coffee Shop
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Discover cafes, order ahead, and earn universal rewards across our entire network
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

      {/* Ad Banner - Top */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <AdBanner size="large" />
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
            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <MapPin className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Discover Cafes</h3>
              <p className="text-muted-foreground">
                Browse local coffee shops with personalized recommendations
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <Users className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Choose Barista</h3>
              <p className="text-muted-foreground">
                Select your favorite barista for a personal touch
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <Coffee className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Order Ahead</h3>
              <p className="text-muted-foreground">
                Skip the line with pre-order and pickup
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-20 h-20 bg-gradient-coffee rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm">
                <Gift className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Earn Rewards</h3>
              <p className="text-muted-foreground">
                Get points at every cafe in our network
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner - Mid */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <AdBanner size="medium" />
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
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold">Bronze</div>
                      <div className="text-sm opacity-75">0-500 pts</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border-2 border-white/40">
                      <div className="text-2xl font-bold">Silver</div>
                      <div className="text-sm opacity-75">500-1000</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold">Gold</div>
                      <div className="text-sm opacity-75">1000+</div>
                    </div>
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

      {/* Ad Banner - Bottom */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <AdBanner size="medium" />
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
